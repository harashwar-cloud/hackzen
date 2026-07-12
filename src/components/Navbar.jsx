import React, { useState } from 'react';
import { Sun, Moon, Bell, Shield, Menu, X, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, darkMode, toggleDarkMode }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'warning',
      text: 'Scan Warning: CoughRelief Syrup is EXPIRED (558 Days Ago)',
      time: '2 mins ago',
      icon: AlertTriangle,
      color: 'text-red-500 bg-red-100 dark:bg-red-950/30'
    },
    {
      id: 2,
      type: 'info',
      text: 'Expiry Warning: Lipitor 20mg expiring in 50 days (Batch LP201)',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-950/30'
    },
    {
      id: 3,
      type: 'success',
      text: 'Scan verified: Crocin 650 is SAFE to use',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-500 bg-green-100 dark:bg-green-950/30'
    }
  ];

  const menuItems = [
    { id: 'landing', label: 'Home' },
    { id: 'scan', label: 'Scan Medicine' },
    { id: 'history', label: 'History' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handleNavClick('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 p-0.5 shadow-md shadow-blue-500/10">
              <div className="flex items-center justify-center w-full h-full bg-white dark:bg-slate-900 rounded-[10px] transition-colors">
                <Shield className="w-5 h-5 text-blue-600 dark:text-teal-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 dark:from-blue-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent tracking-tight">
                VisionAid
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[9px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md uppercase tracking-wider vertical-align-middle">
                v1.2
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 font-medium">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 dark:text-teal-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 dark:bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUnreadCount(0);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl shadow-xl py-3 border z-20 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="px-4 pb-2 border-b flex justify-between items-center">
                      <span className="font-semibold text-sm">AI Health Alerts</span>
                      <button 
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-blue-600 dark:text-teal-400 hover:underline"
                      >
                        Dismiss All
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto mt-1 divide-y divide-slate-100 dark:divide-slate-800">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${notif.color}`}>
                            <notif.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              {notif.text}
                            </p>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 cursor-pointer pl-1 group">
              <div className="w-9.5 h-9.5 rounded-full border-2 border-blue-500/20 group-hover:border-blue-500/40 overflow-hidden shadow-inner transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200" 
                  alt="Doctor avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Dr. Sarah K.</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Chief Pharmacist</p>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t animate-in slide-in-from-top-2 duration-150">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-teal-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
