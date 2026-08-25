import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wrench, 
  Camera, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Clock, 
  Zap,
  HelpCircle,
  Phone
} from 'lucide-react';
import { COMPANY_INFO, NON_AMC_PRICING_INFO } from '../data/websiteData';

export default function ServiceIntakePage({ onOpenQuote }) {
  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Wrench className="w-4 h-4 text-gold-600" />
            <span>Raksham Service Command Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Need CCTV <span className="text-gradient-gold">Service or Repair?</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Select your service type below for instant routing, priority scheduling, or live complaint tracking.
          </p>
        </div>
      </section>

      {/* Main 4-Choice Routing Cards */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option 1: AMC Customer (Priority Queue) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-soft-lg flex flex-col justify-between relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/30">
                    Priority Queue • ₹0 Labor
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    1. AMC Customer
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    For housing societies, corporate offices, and clients with an active Annual Maintenance Contract (AMC).
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Free priority breakdown visits & zero labor charges</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Quarterly routine preventive lens & HDD checkups</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Instant log via Customer Portal (e.g. ULV2601)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 relative z-10">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Login to AMC Customer Portal →</span>
                </Link>
              </div>
            </div>

            {/* Option 2: Non-AMC Customer (One-Time Paid Repair) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gold-400 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    One-Time Visit • ₹800 Visit Fee
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-gold-700 transition-colors">
                    2. Non-AMC Paid Service
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    No contract? Book a certified on-site technician for immediate CCTV troubleshooting, video loss, or camera repairs.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Fixed on-site visit & diagnostic charge: <strong>₹800/-</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Automatic Complaint ID (e.g. <strong>NAC-20260825-001</strong>)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Transparent spare part estimate before any replacement</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to="/service-request/non-amc"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Book Non-AMC Service (4-Step Wizard) →</span>
                </Link>
              </div>
            </div>

            {/* Option 3: New CCTV Installation */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">3. New CCTV Installation</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Planning new cameras for your flat, shop, society, or commercial office? Request a free on-site survey and itemized quote.
                </p>
              </div>
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-slate-300 hover:border-gold-400 text-slate-800 font-bold text-xs transition-colors text-center"
              >
                Book Free Site Survey →
              </button>
            </div>

            {/* Option 4: Track Existing Service Request */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">4. Track Service Ticket Status</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Already registered a complaint? Enter your Complaint Number (e.g. <strong>NAC-20260825-001</strong>) to view real-time technician stage.
                </p>
              </div>
              <Link
                to="/track-service"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-slate-300 hover:border-gold-400 text-slate-800 font-bold text-xs transition-colors text-center"
              >
                Track Live Service Status →
              </Link>
            </div>

          </div>

          {/* Transparent Non-AMC Charge Breakdown Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gold-50/70 border border-gold-200 space-y-4">
            <div className="flex items-center space-x-2 text-gold-800 font-bold text-sm">
              <Zap className="w-4 h-4 text-gold-600" />
              <span>Raksham Enterprises — Transparent Service Pricing Policy</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {NON_AMC_PRICING_INFO.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {NON_AMC_PRICING_INFO.highlights.map((h, i) => (
                <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-700 bg-white p-3 rounded-xl border border-gold-200/60 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
