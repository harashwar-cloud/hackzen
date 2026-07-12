import React from 'react';
import { HelpCircle, BookOpen, Brain, Activity, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How does VisionAid locate the expiry date?', a: 'VisionAid employs a two-tier YOLOv8 object detection scheme. The first tier locates the pharmaceutical container (bottle, blister strip, box). The second tier is trained specifically to segment printed date blocks (Mfg, Exp, Batch).' },
    { q: 'Can it read handwritten expiration dates?', a: 'Currently, the EasyOCR pipeline is optimized for printed, stamped, or dotted-matrix typeface standard on commercial medicine containers. Hand-written dates have limited support.' },
    { q: 'What happens if a date format is ambiguous (e.g. 05/06/27)?', a: 'The validation engine analyzes international date standards, defaulting to the safety-first heuristic. When ambiguous, it checks context or alerts the pharmacist for manual validation review.' }
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-8 text-left">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Help & Documentation</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Technical documentation, FAQ queries, and architecture diagrams.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border rounded-3xl p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b pb-3 flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-blue-500" /> Frequently Asked Questions
            </h3>

            <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
              {faqs.map((faq, index) => (
                <div key={index} className={`pt-4 ${index === 0 ? 'pt-0' : ''}`}>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{faq.q}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Model Architecture overview */}
          <div className="glass-panel border rounded-3xl p-6 space-y-4">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Brain className="w-4.5 h-4.5 text-blue-500" /> Neural Network Design
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              VisionAid integrates a high-speed YOLOv8 architecture running in real-time. Frames captured by camera targets are resized to 640x640px, normalized, and evaluated in under 40ms. Text coordinates are sent to an EasyOCR pipeline using PyTorch backend for high accuracy.
            </p>
            <div className="p-3.5 bg-blue-500/5 dark:bg-blue-500/10 rounded-2xl flex items-center justify-between text-xs text-blue-600 dark:text-teal-400 font-bold cursor-pointer group">
              <span>View technical whitepaper</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Contact info support */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Mail className="w-4.5 h-4.5 text-blue-500" /> System Support
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Need assistance setting up real-time hardware cameras or synchronizing API routes? Reach out to our system engineering team.
            </p>

            <div className="space-y-2 border-t pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">support@visionaid.ai</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Server Latency</span>
                <span className="font-semibold text-green-500">22ms (Online)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Core Hash</span>
                <span className="font-mono text-slate-400">v8.4.1-node-f1</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
