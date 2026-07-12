import React from 'react';
import { FileSpreadsheet, Download, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export default function ReportsPage() {
  const reportsList = [
    { name: 'Monthly Expiry Summary - July 2026', type: 'PDF Report', size: '2.4 MB', date: '2026-07-12' },
    { name: 'Pharmacy Inventory Compliance Log', type: 'Excel Spreadsheet', size: '1.8 MB', date: '2026-07-10' },
    { name: 'YOLOv8 & OCR Model Performance Analytics', type: 'CSV Sheet', size: '420 KB', date: '2026-07-08' },
    { name: 'Critical Expired Medicine Intercept History', type: 'PDF Report', size: '940 KB', date: '2026-07-05' }
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-6 text-left animate-fade-in">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Reports & Logs</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Download and compile audit trails of medicine scan actions.</p>
      </div>

      <div className="glass-panel border rounded-3xl p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4 border-b pb-4">
          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Generated Reports Archive</h3>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-xs font-semibold shadow-sm transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Compile Live Report
          </button>
        </div>

        <div className="space-y-3">
          {reportsList.map((rep) => (
            <div key={rep.name} className="p-4 rounded-2xl border bg-white/60 dark:bg-slate-950/20 hover:bg-white dark:hover:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/40 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-teal-400 rounded-xl">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{rep.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{rep.type} • {rep.size} • Compiled {rep.date}</p>
                </div>
              </div>
              <button className="p-2 border rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-350 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
