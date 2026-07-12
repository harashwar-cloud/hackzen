import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  History, 
  BarChart3, 
  FileSpreadsheet, 
  Settings, 
  HelpCircle, 
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const primaryMenu = [
    { id: 'scan', label: 'Scan Medicine', icon: Scan },
    { id: 'history', label: 'History Registry', icon: History },
    { id: 'analytics', label: 'AI Analytics', icon: BarChart3 }
  ];

  const secondaryMenu = [
    { id: 'reports', label: 'Reports & Logs', icon: FileSpreadsheet },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'help', label: 'Help & Docs', icon: HelpCircle }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 left-0 border-r bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-md transition-all duration-300">
      {/* User Status Summary Card */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/5 border border-blue-500/10 dark:border-teal-500/10">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Terminal #02</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">Vite/AI Engine Online</p>
          </div>
        </div>
      </div>

      {/* Main Operations */}
      <div className="flex-1 px-3 py-4 space-y-7 overflow-y-auto">
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
            Verification Portal
          </span>
          <ul className="space-y-1">
            {primaryMenu.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* System Settings & Help */}
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
            Preferences & Support
          </span>
          <ul className="space-y-1">
            {secondaryMenu.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-teal-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:scale-110" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Logout Footer Section */}
      <div className="p-4 border-t">
        <button
          onClick={() => setCurrentTab('landing')}
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
        >
          <LogOut className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-0.5" />
          <span>Exit Portal</span>
        </button>
      </div>
    </aside>
  );
}
