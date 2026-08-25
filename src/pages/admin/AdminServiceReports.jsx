import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileCheck, PlusCircle, Printer, Download, Search, CheckCircle2 } from 'lucide-react';

export default function AdminServiceReports() {
  const { serviceReports } = useAuth();
  const [selectedReport, setSelectedReport] = useState(serviceReports[0] || null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header (No Print) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4 no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Generated CCTV Service Reports</h2>
          <p className="text-xs text-slate-500">
            Official digitally stamped service inspection sheets matching physical report format.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {selectedReport && (
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4 text-gold-400" />
              <span>Print Official PDF</span>
            </button>
          )}

          <Link
            to="/admin/create-report"
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create Report</span>
          </Link>
        </div>
      </div>

      {/* Reports Tabs (No Print) */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-print">
        {serviceReports.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReport(rep)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedReport?.id === rep.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Report #{rep.reportNo} ({rep.customerName})
          </button>
        ))}
      </div>

      {/* Printable Report View (Exact matching PDF 1) */}
      {selectedReport && (
        <div id="printable-service-report" className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-300 shadow-soft-lg space-y-6 text-slate-900 font-sans text-xs">
          
          <div className="text-center pb-5 border-b-2 border-slate-900 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">RAKSHAM ENTERPRISES</h1>
            <h2 className="text-sm font-extrabold tracking-widest text-slate-700 uppercase">CCTV SERVICE REPORT</h2>
            <p className="text-xs font-medium text-slate-600">Security System Solution Provider – Mumbai</p>
            <p className="text-xs font-semibold text-slate-800">+91 9867890606 | Support@raksham.com</p>
          </div>

          {/* Customer Details */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Customer Details</h3>
            <div className="border border-slate-400 rounded overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-400 p-3 bg-slate-50">
                <div className="space-y-1">
                  <p><span className="text-slate-500">Customer Name:</span> <strong className="text-slate-900">{selectedReport.customerName}</strong></p>
                  <p><span className="text-slate-500">Customer Number:</span> <strong className="font-mono text-slate-900">{selectedReport.customerNo}</strong></p>
                  <p><span className="text-slate-500">Site Address:</span> <span className="text-slate-800">{selectedReport.siteAddress}</span></p>
                </div>
                <div className="space-y-1">
                  <p><span className="text-slate-500">Contact Person:</span> <strong className="text-slate-900">{selectedReport.contactPerson}</strong></p>
                  <p><span className="text-slate-500">Contact Number:</span> <strong className="text-slate-900">{selectedReport.contactNumber}</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Service Details</h3>
            <div className="border border-slate-400 rounded overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 p-3 bg-slate-50 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] block">Service Report No:</span>
                  <strong className="font-mono text-slate-900">{selectedReport.reportNo}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Date:</span>
                  <strong className="text-slate-900">{selectedReport.date}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Technician Name:</span>
                  <strong className="text-slate-900">{selectedReport.technicianName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Complaint / Service:</span>
                  <span className="text-slate-800">{selectedReport.serviceRequestType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Details */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Equipment Details</h3>
            <div className="border border-slate-400 rounded overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 p-3 bg-slate-50 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] block">System:</span>
                  <strong className="text-slate-900">{selectedReport.system}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Brand:</span>
                  <strong className="text-slate-900">{selectedReport.brand}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Model:</span>
                  <span className="text-slate-800">{selectedReport.model}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">No. of Cameras:</span>
                  <strong className="font-mono text-slate-900 text-sm">{selectedReport.noOfCameras} Cameras</strong>
                </div>
              </div>
              <div className="p-3 border-t border-slate-300 bg-white">
                <span className="text-slate-500">Other Equipment: </span>
                <span className="text-slate-800">{selectedReport.otherEquipment}</span>
              </div>
            </div>
          </div>

          {/* Problem & Work Carried Out */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Problem Observed</h3>
            <div className="p-2.5 bg-slate-50 border border-slate-400 rounded">
              {selectedReport.problemObserved}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Work Carried Out</h3>
            <div className="p-2.5 bg-slate-50 border border-slate-400 rounded">
              {selectedReport.workCarriedOut}
            </div>
          </div>

          {/* Parts Used Table */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Parts / Materials Used</h3>
            <div className="border border-slate-400 rounded overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700">
                  <tr>
                    <th className="p-2 border-r border-slate-300 w-16">Sr. No.</th>
                    <th className="p-2 border-r border-slate-300">Description</th>
                    <th className="p-2 border-r border-slate-300 w-24">Qty.</th>
                    <th className="p-2">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {selectedReport.partsUsed?.map((p, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="p-2 border-r border-slate-300 text-center font-mono">{p.srNo || idx + 1}</td>
                      <td className="p-2 border-r border-slate-300 font-medium">{p.description}</td>
                      <td className="p-2 border-r border-slate-300">{p.qty}</td>
                      <td className="p-2 text-slate-600">{p.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Inspection Status */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">System Inspection Status</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50">
                <span className="text-slate-600 text-[10px] block">CCTV HDD:</span>
                <strong className="text-emerald-800 font-bold">✓ {selectedReport.hddStatus}</strong>
              </div>
              <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50">
                <span className="text-slate-600 text-[10px] block">DVR/NVR Firmware:</span>
                <strong className="text-emerald-800 font-bold">✓ {selectedReport.firmwareStatus}</strong>
              </div>
              <div className="p-2.5 rounded border border-emerald-300 bg-emerald-50">
                <span className="text-slate-600 text-[10px] block">Network Connectivity:</span>
                <strong className="text-emerald-800 font-bold">✓ {selectedReport.networkStatus}</strong>
              </div>
            </div>
          </div>

          {/* Remarks & Declaration */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Technician Remarks</h3>
            <div className="p-2.5 bg-slate-50 border border-slate-400 rounded italic">
              "{selectedReport.technicianRemarks}"
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Service Declaration</h3>
            <div className="p-2.5 bg-amber-50 border border-amber-300 rounded text-amber-900">
              {selectedReport.serviceDeclaration}
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-4 border-t-2 border-slate-300 space-y-4">
            <p className="text-slate-600 italic">
              "I confirm that the above service has been completed and the system status has been explained to me."
            </p>
            <div className="grid grid-cols-2 gap-8 pt-3">
              <div className="border-t border-slate-500 pt-1">
                <p className="font-bold text-slate-900">Customer Representative: {selectedReport.contactPerson}</p>
                <p className="text-[10px] text-slate-500">Date: {selectedReport.date}</p>
              </div>
              <div className="border-t border-slate-500 pt-1 text-right">
                <p className="font-bold text-slate-900">Technician: {selectedReport.technicianName}</p>
                <p className="text-[10px] text-slate-500">Raksham Enterprises Mumbai</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 text-[10px] font-bold text-slate-600 uppercase">
            Thank you for choosing Raksham Enterprises.
          </div>

        </div>
      )}

    </div>
  );
}
