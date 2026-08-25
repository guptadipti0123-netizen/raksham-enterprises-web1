import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CheckCircle2, Calendar, Phone, Clock, FileCheck } from 'lucide-react';
import { COMPANY_INFO, AMC_CHECKLIST } from '../../data/websiteData';

export default function CustomerAmc() {
  const { activeCustomer } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Active Contract Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold uppercase">
              ● Active Surveillance Contract
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {activeCustomer?.amcPlan || 'Society & Enterprise Comprehensive Shield'}
            </h2>
            <p className="text-xs text-slate-500">Contract Ref: AMC-{activeCustomer?.customerNo}-2026</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Valid Until</span>
            <strong className="text-sm font-bold text-slate-900 font-mono">{activeCustomer?.amcExpiry || '2027-08-22'}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Surveillance Scale:</span>
            <strong className="text-slate-900 text-sm">{activeCustomer?.cameraCount || 14} Cameras Covered</strong>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Scheduled Visits:</span>
            <strong className="text-slate-900 text-sm">4 Quarterly Visits / Year</strong>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Breakdown Visits:</span>
            <strong className="text-emerald-700 text-sm font-bold">Unlimited (Free Labor)</strong>
          </div>
        </div>
      </div>

      {/* 11 Maintenance Protocols Included */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Included Maintenance Checkpoints
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AMC_CHECKLIST.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-slate-900 block">{item.title}</strong>
                <span className="text-[11px] text-slate-500">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
