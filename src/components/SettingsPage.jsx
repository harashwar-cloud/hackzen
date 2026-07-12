import React, { useState } from 'react';
import { Settings, Cpu, Volume2, Shield, Sliders, Database, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [yoloThresh, setYoloThresh] = useState(0.85);
  const [ocrThresh, setOcrThresh] = useState(0.9);
  const [voiceVol, setVoiceVol] = useState(0.8);
  const [autoVoice, setAutoVoice] = useState(true);
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-6 text-left">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">System Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Configure YOLOv8 threshold coefficients, audio announcers, and OCR parser limits.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core AI Parameters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border rounded-3xl p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" /> Model Confidence Thresholds
            </h3>

            {/* YOLO Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-350">YOLOv8 Package Detection Cutoff</span>
                <span className="text-blue-600 dark:text-teal-400">{(yoloThresh * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.5" max="0.99" step="0.01" 
                value={yoloThresh} onChange={(e) => setYoloThresh(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Minimum object validation probability for neural networks to draw boxes.
              </p>
            </div>

            {/* OCR Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-350">EasyOCR Character Recognition Confidence</span>
                <span className="text-blue-600 dark:text-teal-400">{(ocrThresh * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.5" max="0.99" step="0.01" 
                value={ocrThresh} onChange={(e) => setOcrThresh(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                OCR verification weight required to parse character strings as valid calendar timestamps.
              </p>
            </div>
          </div>

          {/* Voice System Settings */}
          <div className="glass-panel border rounded-3xl p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b pb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-500" /> Accessibility & Voice Broadcast
            </h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 text-left">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-250">Auto-announce Scan Results</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Trigger browser Speech synthesis immediately upon scan completion.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" checked={autoVoice} onChange={(e) => setAutoVoice(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:height-4 after:width-4 after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-350">Voice Assistant Volume</span>
                <span className="text-blue-600 dark:text-teal-400">{(voiceVol * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={voiceVol} onChange={(e) => setVoiceVol(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" /> Compliance Notes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              This client terminal runs in local sandboxed evaluation mode. Settings apply to the active session and do not overwrite server cloud master configurations.
            </p>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl font-semibold text-sm transition-all"
            >
              {saveStatus ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
              <span>{saveStatus ? 'Settings Applied' : 'Save Configurations'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
