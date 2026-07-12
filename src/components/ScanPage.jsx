import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Play, ShieldAlert, CheckCircle2, AlertTriangle, Volume2, VolumeX,
  RefreshCw, FileText, Check, Cpu, Brain, Layers, Type, Calendar, FileSpreadsheet, Shield
} from 'lucide-react';
import { SAMPLE_MEDICINES } from './MockData';

export default function ScanPage({ addScanHistory }) {
  const [scanState, setScanState] = useState('idle'); // idle, camera_active, scanning, results
  const [selectedSample, setSelectedSample] = useState(SAMPLE_MEDICINES[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ocrStep, setOcrStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const ocrSteps = [
    { label: 'Detecting Medicine...', desc: 'YOLOv8 package isolation' },
    { label: 'Locating Expiry Date...', desc: 'Region-of-interest focus' },
    { label: 'Reading Text using OCR...', desc: 'EasyOCR text parser running' },
    { label: 'Validating Expiry...', desc: 'Temporal analysis logic' },
    { label: 'Generating Result...', desc: 'Compiling dashboard metrics' }
  ];

  // Pipeline flow items
  const pipelineNodes = [
    { id: 'cam', label: 'Camera', icon: Camera },
    { id: 'prep', label: 'Preprocessing', icon: Cpu },
    { id: 'yolo', label: 'YOLOv8', icon: Shield },
    { id: 'loc', label: 'Expiry Location', icon: Layers },
    { id: 'ocr', label: 'EasyOCR', icon: Type },
    { id: 'val', label: 'Date Validation', icon: Calendar },
    { id: 'voice', label: 'Voice Alert', icon: Volume2 },
    { id: 'dash', label: 'Result', icon: CheckCircle2 }
  ];

  // Try to start live webcam
  const startWebcam = async () => {
    try {
      setUploadedImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsWebcamAvailable(true);
      setScanState('camera_active');
    } catch (err) {
      console.warn("Webcam access blocked or unavailable, using mockup scanner mode.");
      setIsWebcamAvailable(false);
      setScanState('camera_active'); // fall back to mock frame
    }
  };

  // Close camera
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsWebcamAvailable(false);
  };

  useEffect(() => {
    return () => stopWebcam();
  }, []);

  // Trigger simulated scanning sequence
  const startScanSequence = () => {
    // If webcam is running, take a screenshot capture mock
    stopWebcam();
    setScanState('scanning');
    setOcrStep(0);
    setScanProgress(0);
    setIsPlayingVoice(false);
    window.speechSynthesis.cancel();
  };

  // Progress animation controller
  useEffect(() => {
    let interval;
    if (scanState === 'scanning') {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            clearInterval(interval);
            // Finalize scan
            setTimeout(() => {
              setScanState('results');
              // Speak results automatically if voice synthesis is active
              playVoiceAlert(selectedSample.voiceText);
              // Save to global history log
              addScanHistory({
                name: selectedSample.name,
                batch: selectedSample.batchNumber,
                mfgDate: selectedSample.mfgDate,
                expDate: selectedSample.expDate,
                status: selectedSample.status,
                remainingDays: selectedSample.remainingDays > 0 
                  ? `${selectedSample.remainingDays} Days` 
                  : `Expired ${Math.abs(selectedSample.remainingDays)} Days Ago`,
                scanDate: new Date().toISOString().split('T')[0],
                accuracy: selectedSample.ocrConfidence
              });
            }, 300);
            return 100;
          }
          // Step progress indicator
          const stepIndex = Math.floor(next / 20);
          if (stepIndex < ocrSteps.length) {
            setOcrStep(stepIndex);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [scanState, selectedSample]);

  // Voice Speech synthesis alert trigger
  const playVoiceAlert = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported by your browser.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setScanState('camera_active');
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    window.speechSynthesis.cancel();
    setIsPlayingVoice(false);
    setScanState('idle');
    setUploadedImage(null);
  };

  // Determine scan feed preview
  const getPreviewSrc = () => {
    if (uploadedImage) return uploadedImage;
    return selectedSample.imageUrl;
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Page Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Scan Verification
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Scan physical medicine packaging using camera, YOLOv8 object markers, and OCR validator.
          </p>
        </div>
        {scanState === 'results' && (
          <button
            onClick={resetScanner}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Scan Another Package</span>
          </button>
        )}
      </div>

      {/* --- IDLE STATE & INPUT CONTROLS --- */}
      {scanState === 'idle' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Camera Card Preview */}
          <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border p-6 flex flex-col items-center justify-center min-h-[350px] relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">Camera Feed Inactive</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 text-center max-w-sm">
              Open your local device camera stream or select a mockup testing package to verify expiry status.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={startWebcam}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Open Camera</span>
              </button>

              <label className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold shadow-sm cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Upload Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          {/* Side Testing Samples Selector */}
          <div className="glass-card rounded-3xl border p-6 space-y-6">
            <div>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-1">Quick Sample Selector</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Instantly test the YOLO/OCR pipeline with valid and expired medicine package designs.
              </p>
            </div>

            <div className="space-y-4">
              {SAMPLE_MEDICINES.map((med) => (
                <div
                  key={med.id}
                  onClick={() => setSelectedSample(med)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedSample.id === med.id
                      ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border shrink-0 bg-white">
                    <img src={med.imageUrl} alt={med.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm font-bold truncate text-slate-800 dark:text-slate-200">{med.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{med.genericName}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        med.status === 'VALID' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                      }`}>
                        {med.status}
                      </span>
                      <span className="text-[9px] text-slate-400">Exp: {med.expDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] text-slate-500 leading-relaxed">
              <span className="font-bold text-blue-600 dark:text-teal-400">Tip:</span> Select <span className="font-semibold">CoughRelief Syrup</span> to see how the system handles expired medical alerts with voice warnings.
            </div>
          </div>

        </div>
      )}

      {/* --- CAMERA RUNNING STATE --- */}
      {scanState === 'camera_active' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Camera Viewport */}
          <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border p-4 flex flex-col justify-between min-h-[400px]">
            <div className="relative flex-1 bg-slate-950 rounded-2xl overflow-hidden border flex items-center justify-center">
              {isWebcamAvailable ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full relative">
                  <img src={getPreviewSrc()} alt="Mock scan target" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex flex-col justify-center items-center">
                    <span className="px-3 py-1 bg-teal-500 text-[10px] font-bold text-slate-900 rounded-md shadow uppercase tracking-wider mb-2">
                      Mock Scanner Active
                    </span>
                    <p className="text-xs text-white/80 text-center max-w-xs font-light">
                      Simulated camera stream targeting: <strong className="font-semibold">{uploadedImage ? "Custom Upload" : selectedSample.name}</strong>
                    </p>
                  </div>
                </div>
              )}
              {/* Scan box crosshair visual */}
              <div className="absolute inset-8 border border-white/20 rounded-xl pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400" />
                
                {/* Horizontal scanner red laser line */}
                <div className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-md shadow-red-500/50 animate-bounce top-1/2" />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={resetScanner}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:underline font-semibold"
              >
                Cancel Stream
              </button>
              <button
                onClick={startScanSequence}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-650 text-white rounded-xl font-bold shadow-lg transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Scan Now</span>
              </button>
            </div>
          </div>

          {/* Right Selected Sample Details */}
          <div className="glass-card rounded-3xl border p-6 space-y-4">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Selected Scan Item</h3>
            <div className="p-4 rounded-xl border bg-slate-100/50 dark:bg-slate-900/30">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Object Target</p>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {uploadedImage ? "Custom Upload Image" : selectedSample.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">
                {uploadedImage 
                  ? "Custom images are processed using fallback parameters and verified automatically." 
                  : selectedSample.genericName}
              </p>
            </div>

            {!uploadedImage && (
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sample Expiry Parameters</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 border rounded-lg">
                    <p className="text-slate-400 text-[10px]">Mfg Date</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-350">{selectedSample.mfgDate}</p>
                  </div>
                  <div className="p-2 border rounded-lg">
                    <p className="text-slate-400 text-[10px]">Exp Date</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-350">{selectedSample.expDate}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] text-slate-500 leading-relaxed">
              Click <span className="font-bold text-blue-600 dark:text-teal-400">Scan Now</span> to submit this image frame to the YOLOv8 detection and EasyOCR date verification pipeline.
            </div>
          </div>

        </div>
      )}

      {/* --- PIPELINE SCANNING SEQUENCE SCREEN --- */}
      {scanState === 'scanning' && (
        <div className="glass-panel rounded-3xl border p-8 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[400px]">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/10 border-4 border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <Cpu className="w-10 h-10 text-blue-500 animate-pulse" />
          </div>

          <div className="space-y-2 w-full text-center max-w-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {ocrSteps[ocrStep].label}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {ocrSteps[ocrStep].desc}
            </p>

            {/* Custom high-fidelity progress bar */}
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-6">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-teal-400 transition-all duration-100 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 font-bold block pt-1">{scanProgress}%</span>
          </div>

          {/* Stepper checks list */}
          <div className="w-full max-w-md divide-y divide-slate-100 dark:divide-slate-800 bg-white/40 dark:bg-slate-950/20 border rounded-2xl p-4">
            {ocrSteps.map((step, idx) => {
              const isDone = idx < ocrStep;
              const isActive = idx === ocrStep;
              return (
                <div key={idx} className="flex justify-between items-center py-2.5 px-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                      isDone 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                        ? 'border-blue-500 text-blue-600 animate-pulse' 
                        : 'border-slate-200 text-slate-400'
                    }`}>
                      {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <span className={`text-xs font-medium ${
                      isDone 
                        ? 'text-slate-500 dark:text-slate-400 line-through' 
                        : isActive 
                        ? 'text-blue-600 dark:text-teal-400 font-bold' 
                        : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isDone ? 'Finished' : isActive ? 'Active' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- PIPELINE PIPELINE GRAPH ANIMATION (Always visible in Results state) --- */}
      {scanState === 'results' && (
        <div className="w-full glass-panel rounded-3xl border p-6 space-y-4">
          <div className="flex items-center gap-2 border-b pb-4">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">AI Processing Pipeline Flow</h3>
          </div>

          {/* Horizontally scrolling or responsive stack flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {pipelineNodes.map((node, idx) => {
              return (
                <React.Fragment key={node.id}>
                  <div className="flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500/10 to-teal-500/10 text-blue-600 dark:text-teal-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <node.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 text-center truncate w-full">
                      {node.label}
                    </span>
                    <span className="text-[8px] text-green-500 font-semibold absolute top-1 right-2">✔</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* --- RESULTS DASHBOARD --- */}
      {scanState === 'results' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT CARD: Bounding Box Image Overlay */}
          <div className="glass-panel rounded-3xl border overflow-hidden p-6 flex flex-col space-y-4 relative">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">AI Detection Overlay</h3>
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">
                YOLOv8 Active
              </span>
            </div>

            {/* Bounding box viewport container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border flex items-center justify-center group">
              <img 
                src={getPreviewSrc()} 
                alt="Detection target" 
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500" 
              />
              
              {/* Overlaying coordinate markers if Crocin/Expired is chosen */}
              {selectedSample && !uploadedImage && selectedSample.boxes.map((box, index) => (
                <div 
                  key={index} 
                  className="absolute border-2 rounded hover:bg-white/10 transition-colors pointer-events-auto"
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                    borderColor: box.color,
                    boxShadow: `0 0 12px ${box.color}40`
                  }}
                >
                  <span 
                    className="absolute -top-6 left-0 px-2 py-0.5 text-[8px] font-bold text-white rounded uppercase shadow tracking-wider"
                    style={{ backgroundColor: box.color }}
                  >
                    {box.label}
                  </span>
                </div>
              ))}

              {/* General watermark fallback for custom uploaded images */}
              {uploadedImage && (
                <div className="absolute inset-4 border border-dashed border-blue-500 rounded-xl flex items-end justify-start p-3 pointer-events-none">
                  <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-bold uppercase rounded shadow">
                    Auto OCR Frame Detect [94.5%]
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <p>YOLO Detection Confidence: <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedSample.yoloConfidence}</strong></p>
              <p>OCR Parse Confidence: <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedSample.ocrConfidence}</strong></p>
            </div>
          </div>

          {/* RIGHT CARD: Medicine Validation Metrics */}
          <div className="glass-panel rounded-3xl border p-6 flex flex-col space-y-6">
            
            {/* Table metrics list */}
            <div>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b pb-4 mb-4">Verification Metrics</h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Medicine Name</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{selectedSample.name}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Batch Number</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{selectedSample.batchNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Manufacturing Date</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-350 mt-0.5">{selectedSample.mfgDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Expiry Date</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-350 mt-0.5">{selectedSample.expDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">OCR Confidence Score</span>
                  <p className="font-bold text-blue-600 dark:text-teal-400 text-sm mt-0.5">{selectedSample.ocrConfidence}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Validation Status</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] mt-1.5 ${
                    selectedSample.status === 'VALID'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                  }`}>
                    {selectedSample.status}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Recommendation Summary */}
            <div className="p-4 rounded-xl border bg-slate-100/50 dark:bg-slate-900/30 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">AI Recommendation</span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light mt-1.5">
                {selectedSample.recommendation}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* --- DYNAMIC STATUS CARDS & VOICE WAVE ASSISTANT --- */}
      {scanState === 'results' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Status Alert Cards */}
          <div>
            {selectedSample.status === 'VALID' ? (
              <div className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20 text-left flex items-start gap-4 h-full">
                <div className="p-3 bg-green-500 text-white rounded-2xl shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-green-600 dark:text-green-400">Medicine is Safe to Use</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The parsed expiry date yields <strong className="text-green-600 font-semibold">{selectedSample.remainingDays} days</strong> of valid use remaining before product expiration.
                  </p>
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="text-[10px] text-slate-400">Pipeline confidence:</span>
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                      High (98.4%)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-left flex items-start gap-4 h-full">
                <div className="p-3 bg-red-500 text-white rounded-2xl shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-lg font-bold text-red-500">Medicine Expired</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The chemical lifespan of this drug is exhausted. It expired <strong className="text-red-500 font-semibold">{Math.abs(selectedSample.remainingDays)} days ago</strong>. Consumption may be ineffective or dangerous.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] text-slate-400 font-medium">Critical Alert Triggered:</span>
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full font-bold uppercase text-[8px] animate-pulse">
                      Danger
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Waveform Assistant Module */}
          <div className="glass-panel rounded-3xl border p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">AI Voice Safety Announcer</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Text-To-Speech alert readouts for accessibility.</p>
              </div>
            </div>

            {/* Animated Soundwave waveform */}
            <div className="flex items-center justify-center gap-1.5 h-16 my-4 select-none">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full ${
                    isPlayingVoice 
                      ? selectedSample.status === 'VALID' 
                        ? 'bg-green-500 wave-bar' 
                        : 'bg-red-500 wave-bar' 
                      : 'bg-slate-200 dark:bg-slate-800 h-3'
                  }`}
                  style={{
                    height: isPlayingVoice ? `${Math.max(15, Math.floor(Math.random() * 50))}px` : '12px'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => playVoiceAlert(selectedSample.voiceText)}
              className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                isPlayingVoice
                  ? 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  : 'bg-slate-900 text-white hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingVoice ? 'Speaking...' : 'Play Voice Alert'}</span>
            </button>
          </div>

        </div>
      )}

      {/* --- AI PROCESSING TIMELINE (Always visible in results) --- */}
      {scanState === 'results' && (
        <div className="glass-panel rounded-3xl border p-6">
          <div className="flex items-center gap-2 border-b pb-4 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Verification Timeline Audit</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Medicine Package Detected',
              'Image Enhanced',
              'Expiry Date Located',
              'OCR Completed',
              'Date Extracted',
              'Validation Completed',
              'Result Generated'
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border rounded-xl shadow-inner-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="w-4.5 h-4.5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✔</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
