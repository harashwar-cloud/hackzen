import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, ShieldCheck, ShieldAlert, Brain, ChevronRight, Play, Clock, ArrowRight } from 'lucide-react';
import { DAILY_SCAN_DATA, PIE_STATUS_DATA } from './MockData';

export default function DashboardPage({ setCurrentTab, scanHistory }) {
  const recentScans = scanHistory.slice(0, 3);
  const totalCount = scanHistory.length;
  const safeCount = scanHistory.filter(i => i.status === 'VALID').length;
  const expiredCount = scanHistory.filter(i => i.status === 'EXPIRED').length;

  const cardStats = [
    { label: 'Total Verified', val: totalCount, icon: Activity, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Safe & Valid', val: safeCount, icon: ShieldCheck, color: 'text-green-500 bg-green-500/10' },
    { label: 'Expired Intercepts', val: expiredCount, icon: ShieldAlert, color: 'text-red-500 bg-red-500/10' },
    { label: 'AI OCR Accuracy', val: '95.8%', icon: Brain, color: 'text-purple-500 bg-purple-500/10' }
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-teal-500 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-blue-500/15">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">VisionAid Portal Dashboard</h1>
          <p className="text-xs sm:text-sm text-blue-50/80 font-light">Welcome back, Dr. Sarah. The computer vision scanner is ready to verify pharmaceuticals.</p>
        </div>
        <button
          onClick={() => setCurrentTab('scan')}
          className="flex items-center gap-2 px-5 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch AI Scanner</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cardStats.map((stat) => (
          <div key={stat.label} className="glass-panel border rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-xl shrink-0 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{stat.label}</span>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-Side Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Safe vs Expired Pie Summary */}
        <div className="lg:col-span-1 glass-panel border rounded-3xl p-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Lifespan Status</h3>
          <div className="h-44 relative flex items-center justify-center">
            {totalCount > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_STATUS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {PIE_STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.95)', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '10px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-xs text-slate-400">No scans executed.</span>
            )}
          </div>
          <div className="flex justify-around text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Safe ({safeCount})</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Expired ({expiredCount})</span>
          </div>
        </div>

        {/* Daily Scan volume line */}
        <div className="lg:col-span-2 glass-panel border rounded-3xl p-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-sans">Verification Traffic</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DAILY_SCAN_DATA} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.95)', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '10px'
                  }} 
                />
                <Line type="monotone" dataKey="scans" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Scans Table Summary */}
      <div className="glass-panel border rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Recent Verification Log</h3>
          <button 
            onClick={() => setCurrentTab('history')}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-teal-400 hover:underline font-semibold"
          >
            <span>View Full Registry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <div key={scan.id} className="py-3 flex justify-between items-center text-xs sm:text-sm gap-4 hover:bg-slate-50/20 dark:hover:bg-slate-800/10 px-2 rounded-xl transition-colors">
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{scan.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Batch {scan.batch} • Verified {scan.scanDate}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">{scan.remainingDays}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                    scan.status === 'VALID'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                  }`}>
                    {scan.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">No recent logs.</p>
          )}
        </div>
      </div>

    </div>
  );
}
