import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, FileCheck, Printer, CheckCircle, AlertTriangle, ShieldCheck, Download, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SERVICE_REPORTS } from '../data/websiteData';

export default function ServiceReportPage() {
  const { serviceReports } = useAuth();
  const allReports = serviceReports && serviceReports.length > 0 ? serviceReports : INITIAL_SERVICE_REPORTS;

  const [searchQuery, setSearchQuery] = useState('RE-20826-2');
  const [currentReport, setCurrentReport] = useState(() => {
    return allReports.find(r => r.reportNo === 'RE-20826-2') || allReports[0];
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = allReports.find(r => 
      r.reportNo.toLowerCase().includes(query) || 
      r.customerNo?.toLowerCase().includes(query) || 
      r.customerName?.toLowerCase().includes(query)
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
    <div className="bg-white pt-28 pb-20">
      
      {/* Header (No Print) */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <FileCheck className="w-4 h-4 text-gold-600" />
            <span>Digital Client Verification Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            CCTV <span className="text-gradient-gold">Service Report Verification</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Verify on-site CCTV maintenance and inspection reports issued by Raksham Enterprises technicians.
          </p>
        </div>
      </section>

      {/* Search Bar (No Print) */}
      <section className="py-8 bg-white border-b border-slate-100 no-print">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Service Report No. (e.g. RE-20826-2) or Customer ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Search Report</span>
            </button>
          </form>

          <div className="flex items-center space-x-2 mt-3 text-xs text-slate-500">
            <span>Sample reference:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('RE-20826-2');
                setCurrentReport(allReports[0]);
              }}
              className="text-gold-700 hover:underline font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
            >
              RE-20826-2 (Silver Springs Residency)
            </button>
          </div>
        </div>
      </section>

      {/* Main Report View */}
      <section className="py-12 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {currentReport ? (
            <div className="space-y-6">
              
              {/* Action Toolbar (No Print) */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-800">Status: {currentReport.status || 'Completed & Verified'}</span>
                </div>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-gold-400" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>

              {/* Printable Official Service Report Document (Matching PDF 1) */}
              <div id="printable-service-report" className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-300 shadow-soft-lg space-y-6 text-slate-900 font-sans text-xs">
                
                {/* Header */}
                <div className="text-center pb-5 border-b-2 border-slate-900 space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">RAKSHAM ENTERPRISES</h2>
                  <h3 className="text-sm font-extrabold tracking-widest text-slate-700 uppercase">CCTV SERVICE REPORT</h3>
                  <p className="text-xs font-medium text-slate-600">Security System Solution Provider – Mumbai</p>
                  <p className="text-xs font-semibold text-slate-800">+91 9867890606 | Support@raksham.com</p>
                </div>

                {/* Customer Details Table */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Customer Details</h4>
                  <div className="border border-slate-400 rounded overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-400 text-xs">
                      <div className="p-3 space-y-1 bg-slate-50">
                        <p><span className="text-slate-500">Customer Name:</span> <strong className="text-slate-900">{currentReport.customerName}</strong></p>
                        <p><span className="text-slate-500">Customer Number:</span> <strong className="font-mono text-slate-900">{currentReport.customerNo}</strong></p>
                        <p><span className="text-slate-500">Site Address:</span> <span className="text-slate-800">{currentReport.siteAddress}</span></p>
                      </div>
                      <div className="p-3 space-y-1 bg-slate-50">
                        <p><span className="text-slate-500">Contact Person:</span> <strong className="text-slate-900">{currentReport.contactPerson}</strong></p>
                        <p><span className="text-slate-500">Contact Number:</span> <strong className="text-slate-900">{currentReport.contactNumber}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Service & Equipment Details</h4>
                  <div className="border border-slate-400 rounded overflow-hidden text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 p-3 bg-slate-50 gap-2">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Service Report No:</span>
                        <strong className="font-mono text-slate-900">{currentReport.reportNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Date of Service:</span>
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
                    <div className="p-3 border-t border-slate-300 bg-white">
                      <span className="text-slate-600">Number of Cameras Inspected: </span>
                      <strong className="text-slate-900 font-mono text-sm">{currentReport.noOfCameras} Cameras</strong>
                    </div>
                  </div>
                </div>

                {/* System Inspection Badges */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">System Inspection Status</h4>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 rounded border border-emerald-300 bg-emerald-50">
                      <span className="text-slate-600 text-[10px] block">CCTV HDD Status</span>
                      <strong className="text-emerald-800 font-bold">✓ {currentReport.hddStatus}</strong>
                    </div>
                    <div className="p-3 rounded border border-emerald-300 bg-emerald-50">
                      <span className="text-slate-600 text-[10px] block">DVR/NVR Firmware</span>
                      <strong className="text-emerald-800 font-bold">✓ {currentReport.firmwareStatus}</strong>
                    </div>
                    <div className="p-3 rounded border border-emerald-300 bg-emerald-50">
                      <span className="text-slate-600 text-[10px] block">Network Connectivity</span>
                      <strong className="text-emerald-800 font-bold">✓ {currentReport.networkStatus}</strong>
                    </div>
                  </div>
                </div>

                {/* Technician Remarks */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Technician Remarks</h4>
                  <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 italic">
                    "{currentReport.technicianRemarks}"
                  </div>
                </div>

                {/* Service Declaration */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Service Declaration</h4>
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900">
                    {currentReport.serviceDeclaration}
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-6 border-t-2 border-slate-300 space-y-4">
                  <p className="text-xs text-slate-600 italic">
                    "I confirm that the above service has been completed and the system status has been explained to me."
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
                    <div className="border-t border-slate-500 pt-1.5">
                      <p className="font-bold text-slate-900">Customer Representative: {currentReport.contactPerson}</p>
                      <p className="text-[11px] text-slate-500">Date: {currentReport.date}</p>
                    </div>
                    <div className="border-t border-slate-500 pt-1.5 text-right">
                      <p className="font-bold text-slate-900">Technician: {currentReport.technicianName}</p>
                      <p className="text-[11px] text-slate-500">Raksham Enterprises Mumbai</p>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-3 text-[11px] font-bold text-slate-600 uppercase">
                  Thank you for choosing Raksham Enterprises.
                </div>

              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Service Report Found</h3>
              <p className="text-xs text-slate-500">
                Please check the Service Report Number or Customer ID and try again, or contact our support desk.
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
