import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import ScanPage from './components/ScanPage';
import HistoryPage from './components/HistoryPage';
import AnalyticsPage from './components/AnalyticsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import HelpPage from './components/HelpPage';
import { HISTORY_DATA } from './components/MockData';

function App() {
  const [currentTab, setCurrentTab] = useState('landing'); // landing, dashboard, scan, history, analytics, reports, settings, help
  const [darkMode, setDarkMode] = useState(false);
  const [scanHistory, setScanHistory] = useState(HISTORY_DATA);

  // Sync dark mode setting
  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const addScanHistory = (newScan) => {
    setScanHistory(prev => [
      {
        id: prev.length + 1,
        ...newScan
      },
      ...prev
    ]);
  };

  const clearHistory = () => {
    setScanHistory([]);
  };

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  // View router
  const renderContent = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage setCurrentTab={setCurrentTab} />;
      case 'dashboard':
        return <DashboardPage setCurrentTab={setCurrentTab} scanHistory={scanHistory} />;
      case 'scan':
        return <ScanPage addScanHistory={addScanHistory} />;
      case 'history':
        return <HistoryPage scanHistory={scanHistory} clearHistory={clearHistory} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <LandingPage setCurrentTab={setCurrentTab} />;
    }
  };

  const isPortal = currentTab !== 'landing';

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Sticky Header Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Main SaaS Workspace */}
      {isPortal ? (
        <div className="flex-1 flex flex-col md:flex-row relative">
          {/* Sidebar on left */}
          <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          
          {/* Workspace content on right */}
          <main className="flex-1 bg-slate-50/30 dark:bg-slate-900/10 min-h-[calc(100vh-4rem)] pb-12 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      ) : (
        /* Full width content (Landing Page) */
        <main className="flex-1 bg-slate-50 dark:bg-[#0B0F19]">
          {renderContent()}
        </main>
      )}
    </div>
  );
}

export default App;
