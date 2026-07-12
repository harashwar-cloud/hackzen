import React from 'react';
import { 
  ArrowRight, ShieldAlert, Cpu, Brain, Sparkles, Scan, Type, Calendar, Volume2, Cloud, Camera, Activity, 
  FileText, HelpCircle, Shield, Award, CheckCircle, Database, Network, Smartphone, 
  Heart, Building, ShoppingBag, Barcode, HelpCircle as HelpIcon, Lock, Layers
} from 'lucide-react';
import heroIllustration from '../assets/hero_illustration.png';

export default function LandingPage({ setCurrentTab }) {
  const features = [
    {
      title: 'Medicine Detection (YOLOv8)',
      desc: 'Real-time object detection models locate, classify, and isolate medicine packages and labels within the camera frame.',
      icon: Scan,
      color: 'from-blue-500 to-indigo-500',
      glow: 'shadow-blue-500/10'
    },
    {
      title: 'Expiry Date Localization',
      desc: 'Specialized secondary bounding-box models isolate text regions related to Mfg, Exp, and Batch dates.',
      icon: Layers,
      color: 'from-teal-500 to-emerald-500',
      glow: 'shadow-teal-500/10'
    },
    {
      title: 'OCR via EasyOCR',
      desc: 'Deep learning OCR engines read text from the localized bounding boxes, parsing date patterns in multiple formats.',
      icon: Type,
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/10'
    },
    {
      title: 'Intelligent Expiry Validation',
      desc: 'Algorithmic date parsers cross-reference parsed text with real-time calendars to identify safety status.',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
      glow: 'shadow-emerald-500/10'
    },
    {
      title: 'AI Voice Assistant',
      desc: 'Native audio synthesis readouts alert visually impaired users and provide immediate voice warning alerts.',
      icon: Volume2,
      color: 'from-orange-500 to-amber-500',
      glow: 'shadow-orange-500/10'
    },
    {
      title: 'Cloud Verification History',
      desc: 'Chronological scans are saved to a searchable secure registry with CSV exports and statistical dashboards.',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-500',
      glow: 'shadow-cyan-500/10'
    },
    {
      title: 'Real-Time Camera Detection',
      desc: 'Responsive web camera overlay captures frames directly from dynamic environment feeds.',
      icon: Camera,
      color: 'from-rose-500 to-pink-500',
      glow: 'shadow-rose-500/10'
    },
    {
      title: 'Future AI Healthcare Sync',
      desc: 'Designed for deployment with pharmacy management systems and smart medicine cabinets.',
      icon: Activity,
      color: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/10'
    }
  ];

  const futureScopes = [
    { title: 'Barcode & QR Verification', desc: 'Scan product barcodes and serial 2D datamatrix codes to verify authentic pharmacy logs.', icon: Barcode },
    { title: 'Fake Medicine Detection', desc: 'Neural network label verification checks holograms and layouts to detect counterfeits.', icon: ShieldAlert },
    { title: 'Prescription Matching', desc: 'Matches scanned labels against scanned doctor prescriptions to ensure medication adherence.', icon: CheckCircle },
    { title: 'Medicine Reminder Alerts', desc: 'Configurable automated SMS/push notification reminders for patient consumption cycles.', icon: BellIconPlaceholder },
    { title: 'Multi-language OCR support', desc: 'OCR models reading English, Hindi, Tamil, Spanish, and standard international characters.', icon: Type },
    { title: 'Native Android App', desc: 'High-speed mobile wrapper using React Native and TensorFlow Lite for offline on-device scanning.', icon: Smartphone },
    { title: 'Cloud Database Storage', desc: 'Secure database syncing scans across multiple family devices and nursing systems.', icon: Database },
    { title: 'Hospital CRM Integration', desc: 'Direct API channels linking scans with electronic health records (EHR) and prescriptions.', icon: Building },
    { title: 'Pharmacy Inventory Mgmt', desc: 'Dashboard tracking stock batches, predicting expiries, and initiating automated replenishment.', icon: ShoppingBag }
  ];

  // Helper helper to avoid nested JSX references
  function BellIconPlaceholder(props) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>;
  }

  const scrollTofeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Neon Glow Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full glow-bg-blue pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full glow-bg-teal pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full glow-bg-red pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="text-left space-y-6">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-xs font-semibold select-none animate-bounce">
              <Award className="w-3.5 h-3.5" />
              <span>Project HackZen 2026 Submission</span>
            </div>

            {/* Typography Title & Subtitle */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                VisionAid
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 dark:from-blue-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent leading-snug">
                AI-Powered Medicine Verification & Expiry Intelligence System
              </h2>
              
              {/* Tagline */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Scan', 'Detect', 'Read', 'Verify', 'Alert'].map((step, idx) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold glass-panel border shadow-sm text-slate-700 dark:text-slate-300 bg-white/40 dark:bg-slate-800/20">
                      {step}
                    </span>
                    {idx < 4 && <ArrowRight className="w-3 h-3 text-slate-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Description */}
            <p className="text-slate-600 dark:text-slate-350 max-w-xl text-base sm:text-lg leading-relaxed font-light">
              Protect yourself and your loved ones from the risks of expired and counterfeit medication. VisionAid integrates YOLOv8 computer vision and EasyOCR to analyze, process, and verify pharmaceuticals instantly with real-time audio safety alerts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setCurrentTab('scan')}
                className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Scanning</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollTofeatures}
                className="px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-xl font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 shadow-sm"
              >
                Learn More
              </button>
            </div>

            {/* Core Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-800/40 max-w-md">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">98.2%</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">YOLOv8 Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">95.8%</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">OCR Reading</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">&lt; 1.5s</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">AI Verification</p>
              </div>
            </div>
          </div>

          {/* Hero Right Futuristic Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl p-1.5 bg-gradient-to-tr from-blue-500/20 via-teal-500/10 to-emerald-500/20 border border-white/10 group">
              <div className="absolute inset-0 bg-slate-900/5 dark:bg-slate-950/20 backdrop-blur-[2px] rounded-3xl z-0" />
              
              {/* Floating Glow effects */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-500/30 rounded-full blur-xl pointer-events-none" />

              {/* Main Generated Image */}
              <img 
                src={heroIllustration} 
                alt="VisionAid AI Scanning System illustration" 
                className="w-full h-full object-cover rounded-[22px] relative z-10 transition-transform duration-700 group-hover:scale-103"
              />

              {/* Holographic scanner border overlays */}
              <div className="absolute inset-4 border border-blue-500/30 dark:border-teal-400/20 rounded-2xl pointer-events-none z-20 pointer-events-none" />
              
              {/* Neon Bounding box overlay mock */}
              <div className="absolute top-[40%] left-[30%] w-[40%] h-[30%] border-2 border-dashed border-teal-400 animate-pulse rounded z-20 pointer-events-none">
                <span className="absolute -top-6 left-0 px-2 py-0.5 bg-teal-500 text-[10px] text-slate-950 font-bold uppercase rounded tracking-wider shadow">
                  OCR: EXPY_DATE [98.4%]
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-slate-200/50 dark:border-slate-800/40">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/30 text-teal-600 dark:text-teal-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Core Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How VisionAid Verification Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            Our pipeline is engineered using high-performance computer vision networks and automated validation scripts to deliver fast, reliable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={feature.title}
              className="glass-card hover:glass-panel p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 shadow-lg ${feature.glow} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Scope Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/10 rounded-[2.5rem]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            VisionAid Future Horizon
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            Our vision extends beyond reading expiry dates. We are building a fully integrated AI healthcare SaaS platform for pharmacies and patients alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureScopes.map((scope) => (
            <div 
              key={scope.title}
              className="p-5 rounded-2xl border bg-white/60 dark:bg-slate-950/30 hover:bg-white dark:hover:bg-slate-950/50 border-slate-200/60 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all duration-200 group flex items-start gap-4"
            >
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-950/40 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors shrink-0">
                <scope.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {scope.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {scope.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="w-full border-t border-slate-200/50 dark:border-slate-800/40 pt-16 pb-8 mt-24 relative z-10 bg-slate-50/50 dark:bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Footer Brand Info */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent">
                  VisionAid
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                VisionAid is a medical safety intelligence tool developed for HackZen 2026. Harnessing computer vision to verify pharmaceuticals and prevent medical complications.
              </p>
            </div>

            {/* Links Column 1 */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#doc" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Documentation
                  </a>
                </li>
                <li>
                  <a href="#git" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#privacy" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Terms & Conditions</a>
                </li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-widest">HackZen Sponsor</h4>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-teal-400 font-semibold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-red-500" />
                  <span>HackZen 2026</span>
                </div>
                Innovating digital solutions for future healthcare infrastructures.
              </div>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
            <p>© 2026 VisionAid. Designed for HackZen. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Secure OCR Verification Node:</span>
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full font-bold uppercase tracking-wider text-[9px]">
                Active
              </span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
