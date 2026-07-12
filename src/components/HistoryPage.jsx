import React, { useState } from 'react';
import { 
  Search, Filter, ArrowUpDown, Download, Calendar, ShieldCheck, ShieldAlert, AlertTriangle, 
  Trash2, ChevronLeft, ChevronRight, CheckCircle2, RefreshCw
} from 'lucide-react';

export default function HistoryPage({ scanHistory, clearHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('scanDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sorting controller
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // CSV Exporter
  const handleExportCSV = () => {
    if (scanHistory.length === 0) return;
    const headers = ['Medicine Name', 'Batch', 'Mfg Date', 'Expiry Date', 'Status', 'Remaining Days/Expired Ago', 'Scan Date', 'OCR Accuracy'];
    const rows = scanHistory.map(item => [
      item.name,
      item.batch,
      item.mfgDate,
      item.expDate,
      item.status,
      item.remainingDays,
      item.scanDate,
      item.accuracy
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VisionAid_Scan_History_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search application
  const filteredData = scanHistory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.batch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'ALL' || item.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Sort application
  const sortedData = [...filteredData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Simple numeric comparison for ID or remaining days if needed
    if (sortField === 'remainingDays') {
      const getDays = (str) => {
        const num = parseInt(str);
        if (isNaN(num)) return 0;
        return str.includes('Expired') ? -num : num;
      };
      aVal = getDays(a.remainingDays);
      bVal = getDays(b.remainingDays);
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VALID':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Valid</span>
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Expired</span>
          </span>
        );
      case 'EXPIRING_SOON':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Expiring Soon</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-6 text-left">
      
      {/* Header Info */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            History Registry
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Browse, search, sort, and export records of past pharmaceutical package YOLO/OCR scans.
          </p>
        </div>
        <div className="flex gap-2">
          {scanHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Log</span>
            </button>
          )}
          <button
            onClick={handleExportCSV}
            disabled={scanHistory.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search, Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/40 dark:bg-slate-950/10 border p-4 rounded-2xl glass-panel">
        
        {/* Search input */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by medicine name or batch code..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto shrink-0 select-none">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:inline" />
          {['ALL', 'VALID', 'EXPIRED', 'EXPIRING_SOON'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors shrink-0 ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              {status === 'ALL' ? 'All Scans' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="glass-panel border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold select-none">
                <th onClick={() => handleSort('name')} className="p-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <div className="flex items-center gap-1">
                    <span>Medicine Name</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="p-4">Batch</th>
                <th className="p-4">Mfg Date</th>
                <th onClick={() => handleSort('expDate')} className="p-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <div className="flex items-center gap-1">
                    <span>Expiry Date</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th onClick={() => handleSort('status')} className="p-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th onClick={() => handleSort('remainingDays')} className="p-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <div className="flex items-center gap-1">
                    <span>Days Left</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th onClick={() => handleSort('scanDate')} className="p-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <div className="flex items-center gap-1">
                    <span>Scan Date</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{item.name}</td>
                    <td className="p-4 text-slate-500 font-mono">{item.batch}</td>
                    <td className="p-4 text-slate-500">{item.mfgDate}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">{item.expDate}</td>
                    <td className="p-4">{getStatusBadge(item.status)}</td>
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-350">{item.remainingDays}</td>
                    <td className="p-4 text-slate-400 font-light">{item.scanDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <RefreshCw className="w-8 h-8 text-slate-300 animate-spin" />
                      <span className="font-medium text-sm text-slate-400">No records found matching filters.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t flex justify-between items-center select-none text-xs sm:text-sm">
          <span className="text-slate-400">
            Showing <strong className="font-semibold text-slate-700 dark:text-slate-300">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)}</strong> of <strong className="font-semibold text-slate-700 dark:text-slate-300">{filteredData.length}</strong> items
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border rounded-lg bg-white dark:bg-slate-850 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border rounded-lg bg-white dark:bg-slate-850 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
