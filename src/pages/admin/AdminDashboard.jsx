import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Inbox, 
  Wrench, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  PhoneCall 
} from 'lucide-react';

export default function AdminDashboard() {
  const { customers, enquiries, serviceRequests, serviceReports } = useAuth();

  const newEnquiries = enquiries.filter(e => e.status === 'New');
  const pendingRequests = serviceRequests.filter(r => r.status !== 'Completed');

  return (
    <div className="space-y-6">
      
      {/* 4 Operations KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Website Enquiries</span>
            <Inbox className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{enquiries.length} Leads</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">{newEnquiries.length} New Inquiries</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Active AMC Clients</span>
            <ShieldCheck className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{customers.length} Societies</p>
          <p className="text-[11px] text-slate-500 mt-1">100% Contract Uptime</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Service Tickets</span>
            <Wrench className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{serviceRequests.length} Total</p>
          <p className="text-[11px] text-slate-500 mt-1">{pendingRequests.length} In Progress / Open</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500">Service Reports</span>
            <FileCheck className="w-4 h-4 text-gold-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{serviceReports.length} Generated</p>
          <p className="text-[11px] text-slate-500 mt-1">Digital PDF Sheets</p>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-bold">Generate New CCTV Service Report (PDF 1)</h2>
          <p className="text-xs text-slate-300">Issue an official inspection sheet for a customer after on-site technician checks.</p>
        </div>
        <Link
          to="/admin/create-report"
          className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft transition-all"
        >
          + Create Report Now
        </Link>
      </div>

      {/* 2-Column Grid: Recent Inquiries & Pending Service Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Website Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Website Inquiries</h3>
            <Link to="/admin/enquiries" className="text-xs text-gold-700 font-bold hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 3).map((enq) => (
              <div key={enq.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900">{enq.name} ({enq.location})</strong>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    enq.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{enq.serviceRequired} • {enq.mobile}</p>
                <p className="text-slate-500 italic text-[11px]">"{enq.message}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Field Service Tickets */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Field Service Requests</h3>
            <Link to="/admin/service-requests" className="text-xs text-gold-700 font-bold hover:underline">
              Manage Tickets →
            </Link>
          </div>

          <div className="space-y-3">
            {serviceRequests.map((req) => (
              <div key={req.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900">{req.customerName}</strong>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">Issue: {req.issueType}</p>
                <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                  <span>Ticket: {req.ticketNo}</span>
                  <span>Tech: {req.technician || 'Rakesh Toraskar'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
