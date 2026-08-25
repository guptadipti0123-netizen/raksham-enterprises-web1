import React, { useState } from 'react';
import { SAMPLE_SERVICE_REPORTS, COMPANY_INFO } from '../data/websiteData';
import { Search, FileCheck, Printer, CheckCircle, AlertTriangle, ShieldCheck, X, Download, UserCheck, HardDrive, Cpu, Radio } from 'lucide-react';

export default function ServiceReportPortal({ initialReportNo = '', onClose }) {
  const [searchQuery, setSearchQuery] = useState(initialReportNo || 'RE-20826-2');
  const [currentReport, setCurrentReport] = useState(() => {
    if (initialReportNo) {
      return SAMPLE_SERVICE_REPORTS.find(r => r.reportNo.toLowerCase() === initialReportNo.toLowerCase()) || SAMPLE_SERVICE_REPORTS[0];
    }
    return SAMPLE_SERVICE_REPORTS[0];
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = SAMPLE_SERVICE_REPORTS.find(r => 
      r.reportNo.toLowerCase().includes(query) || 
      r.customerNo.toLowerCase().includes(query) || 
      r.customerName.toLowerCase().includes(query)
    );

    if (found) {
      setCurrentReport(found);
      setSearched(true);
    } else {
      setCurrentReport(null);
      setSearched(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-obsidian-950 rounded-2xl border border-gold-500/40 shadow-2xl my-8 overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-obsidian-900 px-6 py-4 border-b border-gold-500/30 flex justify-between items-center no-print">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">CCTV Service Report & Verification Portal</h2>
              <p className="text-xs text-gold-400">Digital verification of on-site service sheets</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
              title="Print Official Service Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-obsidian-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Header (No Print) */}
        <div className="p-6 bg-obsidian-900/60 border-b border-slate-800 no-print">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Service Report No. (e.g. RE-20826-2) or Customer ID (e.g. ULV2601)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center space-x-1.5"
            >
              <span>Verify Report</span>
            </button>
          </form>

          {/* Quick Filter Tag Buttons */}
          <div className="flex items-center space-x-2 mt-3 text-xs text-slate-400">
            <span>Quick sample test:</span>
            <button
              onClick={() => {
                setSearchQuery('RE-20826-2');
                setCurrentReport(SAMPLE_SERVICE_REPORTS[0]);
              }}
              className="text-gold-400 hover:underline font-mono text-[11px] bg-obsidian-950 px-2 py-0.5 rounded border border-gold-500/20"
            >
              Report: RE-20826-2 (Silver Springs)
            </button>
          </div>
        </div>

        {/* Printable Official Service Sheet Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {currentReport ? (
            <div id="printable-service-report" className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-300 font-sans text-xs space-y-6">
              
              {/* Document Header */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900">RAKSHAM ENTERPRISES</h1>
                <h2 className="text-sm font-extrabold tracking-widest text-slate-800 uppercase">CCTV SERVICE REPORT</h2>
                <p className="text-[11px] font-medium text-slate-600">
                  Security System Solution Provider – Mumbai
                </p>
                <p className="text-[11px] font-semibold text-slate-700">
                  +91 9867890606 | Support@raksham.com
                </p>
              </div>

              {/* Status Banner */}
              <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded border border-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span className="font-bold text-slate-900 uppercase">Service Status: {currentReport.status}</span>
                </div>
                <span className="font-mono text-slate-700">Ref: <strong>{currentReport.reportNo}</strong></span>
              </div>

              {/* Customer Details Table */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Customer Details</h3>
                <div className="border border-slate-400 rounded overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-400">
                    <div className="p-2.5 space-y-1 bg-slate-50">
                      <p><span className="text-slate-500 font-medium">Customer Name:</span> <strong className="text-slate-900">{currentReport.customerName}</strong></p>
                      <p><span className="text-slate-500 font-medium">Customer Number:</span> <strong className="text-slate-900 font-mono">{currentReport.customerNo}</strong></p>
                      <p><span className="text-slate-500 font-medium">Site Address:</span> <span className="text-slate-800">{currentReport.siteAddress}</span></p>
                    </div>
                    <div className="p-2.5 space-y-1 bg-slate-50">
                      <p><span className="text-slate-500 font-medium">Contact Person:</span> <strong className="text-slate-900">{currentReport.contactPerson}</strong></p>
                      <p><span className="text-slate-500 font-medium">Contact Number:</span> <strong className="text-slate-900">{currentReport.contactNumber}</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Equipment Details */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Service & Equipment Details</h3>
                <div className="border border-slate-400 rounded overflow-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 p-2.5 bg-slate-50 gap-2">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Service Report No:</span>
                      <strong className="font-mono text-slate-900">{currentReport.reportNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Date:</span>
                      <strong className="text-slate-900">{currentReport.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Technician Name:</span>
                      <strong className="text-slate-900">{currentReport.technicianName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">System / Brand:</span>
                      <strong className="text-slate-900">{currentReport.system} ({currentReport.brand})</strong>
                    </div>
                  </div>
                  <div className="p-2.5 border-t border-slate-300 bg-white">
                    <span className="text-slate-500">Number of Cameras Inspected: </span>
                    <strong className="text-slate-900 font-mono text-sm">{currentReport.noOfCameras} Cameras</strong>
                  </div>
                </div>
              </div>

              {/* System Inspection Checklist from PDF 1 */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">System Inspection Status</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50 text-center">
                    <span className="text-slate-600 block text-[10px]">CCTV HDD Status</span>
                    <strong className="text-emerald-800 font-bold text-sm">✓ {currentReport.hddStatus}</strong>
                  </div>
                  <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50 text-center">
                    <span className="text-slate-600 block text-[10px]">DVR/NVR Firmware</span>
                    <strong className="text-emerald-800 font-bold text-sm">✓ {currentReport.firmwareStatus}</strong>
                  </div>
                  <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50 text-center">
                    <span className="text-slate-600 block text-[10px]">Network Connectivity</span>
                    <strong className="text-emerald-800 font-bold text-sm">✓ {currentReport.networkStatus}</strong>
                  </div>
                </div>
              </div>

              {/* Technician Remarks */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Technician Remarks</h3>
                <div className="p-3 bg-slate-50 border border-slate-400 rounded text-slate-800 italic">
                  "{currentReport.technicianRemarks}"
                </div>
              </div>

              {/* Service Declaration */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Service Declaration</h3>
                <div className="p-3 bg-amber-50 border border-amber-300 rounded text-amber-900">
                  {currentReport.serviceDeclaration}
                </div>
              </div>

              {/* Customer Confirmation & Signatures */}
              <div className="pt-4 border-t-2 border-slate-300 space-y-4">
                <p className="text-[11px] text-slate-700 italic">
                  "I confirm that the above service has been completed and the system status has been explained to me."
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="border-t border-slate-600 pt-1">
                    <p className="font-bold text-slate-900">Customer Representative: {currentReport.contactPerson}</p>
                    <p className="text-[10px] text-slate-500">Date: {currentReport.date}</p>
                  </div>
                  <div className="border-t border-slate-600 pt-1 text-right">
                    <p className="font-bold text-slate-900">Technician: {currentReport.technicianName}</p>
                    <p className="text-[10px] text-slate-500">Raksham Enterprises Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Footer text */}
              <div className="text-center pt-2 text-[10px] font-bold text-slate-600 uppercase">
                Thank you for choosing Raksham Enterprises.
              </div>

            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Service Report Found</h3>
              <p className="text-xs text-slate-400">
                Please check the Service Report Number or Customer ID and try again, or contact our support desk.
              </p>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center space-x-2 text-xs font-bold text-gold-400 hover:underline pt-2"
              >
                <span>Contact Support Desk: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
