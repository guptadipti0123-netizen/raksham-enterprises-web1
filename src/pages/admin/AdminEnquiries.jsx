import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Inbox, Phone, MessageSquare, Mail, MapPin, CheckCircle2, ChevronDown, Filter } from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, convertToAmc } = useAuth();
  const [filterStatus, setFilterStatus] = useState('All');

  const statusOptions = ['New', 'Contacted', 'Site Visit Scheduled', 'Quotation Sent', 'Converted', 'Closed'];

  const filtered = filterStatus === 'All' 
    ? enquiries 
    : enquiries.filter(e => e.status === filterStatus);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Website Enquiries Pipeline</h2>
          <p className="text-xs text-slate-500">
            Track and convert customer inquiries submitted through website forms and consultation triggers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:border-gold-500"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            {statusOptions.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {enq.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{enq.name}</h3>
                <span className="text-xs text-gold-700 font-semibold bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  {enq.serviceRequired}
                </span>
              </div>

              {/* Status Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 font-semibold">Stage:</span>
                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    enq.status === 'New'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : enq.status === 'Converted'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px]">Mobile:</span>
                <a href={`tel:${enq.mobile}`} className="font-bold text-slate-900 hover:text-gold-700">{enq.mobile}</a>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Location:</span>
                <strong className="text-slate-800">{enq.location}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Property Type / Date:</span>
                <span className="text-slate-800">{enq.propertyType || 'Residential'} • {enq.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
              "{enq.message}"
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${enq.mobile}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${enq.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, Raksham Enterprises is following up on your CCTV inquiry.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reply on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    const newAmc = convertToAmc(enq);
                    updateEnquiryStatus(enq.id, 'Converted');
                    alert(`🎉 Enquiry for ${enq.name} successfully converted to AMC Customer! Assigned Customer ID: ${newAmc.customerNo}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold flex items-center space-x-1 shadow-gold-soft transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Convert to AMC Customer</span>
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-mono">Synced with Website CRM</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
