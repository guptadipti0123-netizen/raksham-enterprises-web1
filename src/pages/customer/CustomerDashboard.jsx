import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, FileText, Wrench, HardDrive, Calendar, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function CustomerDashboard() {
  const { activeCustomer, serviceReports, serviceRequests, equipment } = useAuth();

  const customerReports = serviceReports.filter(r => r.customerNo === activeCustomer?.customerNo);
  const customerRequests = serviceRequests.filter(r => r.customerNo === activeCustomer?.customerNo);
  const customerEquip = equipment.filter(e => e.customerNo === activeCustomer?.customerNo);

  return (
    <div className="space-y-6">
      
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">AMC Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-lg font-extrabold text-emerald-700">Active Contract</p>
          <p className="text-[11px] text-slate-500 mt-1">Valid till: {activeCustomer?.amcExpiry || '2027-08-22'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Connected Cameras</span>
            <ShieldCheck className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{activeCustomer?.cameraCount || 14} Cameras</p>
          <p className="text-[11px] text-slate-500 mt-1">Hikvision NVR System</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Service Reports</span>
            <FileText className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{customerReports.length} Reports</p>
          <p className="text-[11px] text-slate-500 mt-1">Last: {customerReports[0]?.date || '23/08/2026'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Service Requests</span>
            <Wrench className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{customerRequests.length} Total</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">All tickets active</p>
        </div>
      </div>

      {/* Latest Service Report Preview (Direct matching PDF 1) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">Latest Verified Inspection</span>
            <h2 className="text-base font-bold text-slate-900">
              CCTV Service Report #{customerReports[0]?.reportNo || 'RE-20826-2'}
            </h2>
          </div>
          <Link
            to="/customer/service-reports"
            className="px-4 py-2 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-800 border border-gold-300 font-bold text-xs flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View & Download PDF</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-500 block text-[10px]">Date of Service:</span>
            <strong className="text-slate-900">{customerReports[0]?.date || '23 / 08 / 2026'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Assigned Technician:</span>
            <strong className="text-slate-900">{customerReports[0]?.technicianName || 'Rakesh Toraskar'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">System Inspected:</span>
            <strong className="text-slate-900">{customerReports[0]?.system || 'NVR'} ({customerReports[0]?.brand || 'Hikvision'})</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">HDD Health:</span>
            <strong className="text-emerald-700 font-bold">✓ {customerReports[0]?.hddStatus || 'OK'}</strong>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-1">
          <p><strong>Technician Remarks:</strong> "{customerReports[0]?.technicianRemarks}"</p>
          <p className="text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            <strong>Service Declaration:</strong> {customerReports[0]?.serviceDeclaration}
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Need Immediate Technician Visit?</h3>
          <p className="text-xs text-slate-500">
            Raise a new repair ticket for camera blur, video loss, or recording errors.
          </p>
          <Link
            to="/customer/service-requests"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            <span>Raise New Service Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Equipment & Storage Health</h3>
          <p className="text-xs text-slate-500">
            {customerEquip.length} Devices logged under active surveillance coverage.
          </p>
          <Link
            to="/customer/equipment"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <span>View Installed Hardware List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
