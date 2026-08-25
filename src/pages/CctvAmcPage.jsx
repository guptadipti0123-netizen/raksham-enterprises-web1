import React, { useState } from 'react';
import { AMC_CHECKLIST, COMPANY_INFO } from '../data/websiteData';
import { ShieldCheck, CheckCircle2, Calculator, Check, ArrowRight, MessageSquare, Phone, Wrench } from 'lucide-react';

export default function CctvAmcPage({ onOpenQuote }) {
  // Calculator State
  const [propertyType, setPropertyType] = useState('society');
  const [cameraCount, setCameraCount] = useState(16);
  const [planType, setPlanType] = useState('comprehensive');

  const calculateEstimate = () => {
    let basePerCamera = planType === 'comprehensive' ? 350 : 220;
    if (propertyType === 'society') basePerCamera *= 0.9;
    if (propertyType === 'warehouse') basePerCamera *= 1.1;
    const total = Math.round((cameraCount * basePerCamera) / 100) * 100;
    return {
      annualCost: Math.max(total, 3500),
      breakdownVisits: planType === 'comprehensive' ? 'Unlimited Breakdown Calls' : 'Up to 6 Breakdown Calls'
    };
  };

  const estimate = calculateEstimate();

  const packages = [
    {
      name: "Essential Preventive Plan",
      target: "Small Shops & Small Offices (4-8 Cameras)",
      price: "From ₹3,500 / Year",
      recommended: false,
      features: [
        "4 Scheduled quarterly preventive visits",
        "Camera lens chemical cleaning & refocusing",
        "DVR/NVR & HDD sector health check",
        "SMPS power supply voltage testing",
        "Priority emergency breakdown support",
        "Digital service report on every visit"
      ]
    },
    {
      name: "Society & Enterprise Shield",
      target: "Most Popular for Housing Societies & Complexes",
      price: "Custom Volume Pricing",
      recommended: true,
      features: [
        "4 Comprehensive quarterly deep cleanings",
        "Free labor on all breakdown visits",
        "Same-day emergency response in Mumbai",
        "High-ladder external camera servicing",
        "PoE switch & network bandwidth audit",
        "Mobile live stream & cloud recording verify",
        "Verifiable digital job cards for Society AGM"
      ]
    },
    {
      name: "24/7 Mission-Critical AMC",
      target: "Hospitals, Banks & 24/7 Logistics Warehouses",
      price: "Enterprise Custom",
      recommended: false,
      features: [
        "Monthly on-site preventive inspections",
        "2-Hour guaranteed Mumbai SLA",
        "Standby spare DVR/NVR during repairs",
        "RAID storage redundancy diagnostics",
        "Annual thermal & wiring compliance check",
        "Dedicated senior security engineer"
      ]
    }
  ];

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Page Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Wrench className="w-4 h-4 text-gold-600" />
            <span>Annual Maintenance Contracts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Professional <span className="text-gradient-gold">CCTV AMC Services</span> in Mumbai
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Ensure 100% camera uptime, flawless recording retention, and rapid technician turnaround across Mumbai & Navi Mumbai.
          </p>
        </div>
      </section>

      {/* 11-Point Inspection Checklist */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 space-y-1">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Quality Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our 11-Point Preventive Inspection Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every maintenance visit follows a standardized protocol to prevent camera failures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AMC_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-300 hover:bg-white transition-all flex items-start space-x-3"
              >
                <div className="w-7 h-7 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Live AMC Calculator */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft-lg p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 text-gold-700 text-xs font-bold uppercase tracking-wider mb-1">
                    <Calculator className="w-4 h-4" />
                    <span>Instant Price Calculator</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Estimate Your CCTV AMC Package
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your property type and camera scale to estimate annual contract costs.
                  </p>
                </div>

                {/* 1. Property Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">1. Property / Premises Type:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'society', name: 'Housing Society' },
                      { id: 'office', name: 'Corporate Office' },
                      { id: 'retail', name: 'Retail Shop / Mall' },
                      { id: 'warehouse', name: 'Warehouse / Factory' },
                      { id: 'school', name: 'School / College' },
                      { id: 'hospital', name: 'Hospital / Clinic' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setPropertyType(t.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                          propertyType === t.id
                            ? 'bg-gold-50 border-gold-500 text-gold-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Camera Count */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">2. Total Number of Cameras:</span>
                    <span className="font-bold text-gold-700 text-sm px-2.5 py-0.5 rounded bg-gold-50 border border-gold-200">
                      {cameraCount} Cameras
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    step="2"
                    value={cameraCount}
                    onChange={(e) => setCameraCount(Number(e.target.value))}
                    className="w-full accent-gold-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>4 Cams</span>
                    <span>16 Cams (Mid Society)</span>
                    <span>32 Cams</span>
                    <span>64+ Cams</span>
                  </div>
                </div>

                {/* 3. Plan Scope */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">3. Preferred Maintenance Scope:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPlanType('non-comprehensive')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        planType === 'non-comprehensive'
                          ? 'bg-gold-50 border-gold-500 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900">Standard Preventive Plan</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">4 Scheduled visits + cleaning</p>
                    </button>

                    <button
                      onClick={() => setPlanType('comprehensive')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        planType === 'comprehensive'
                          ? 'bg-gold-50 border-gold-500 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <p className="text-xs font-bold text-gold-800">Comprehensive Society Plan</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Unlimited breakdowns + all labor free</p>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Output Box */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-200">
                    Estimated Annual Plan
                  </span>

                  <div>
                    <p className="text-xs text-slate-500">Estimated Annual Contract Cost</p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                      <span className="text-gradient-gold">₹{estimate.annualCost.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-normal text-slate-500"> / year</span>
                    </p>
                  </div>

                  <div className="py-3 border-t border-b border-slate-200 space-y-2 text-left text-xs text-slate-700">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span><strong>4 Quarterly</strong> Deep Service Cleanings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span>{estimate.breakdownVisits}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span>DVR/NVR & HDD Health Diagnostics</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I want an AMC quote for my ${propertyType} with ${cameraCount} cameras. Estimated: ₹${estimate.annualCost}/yr.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Get Official AMC Quotation on WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={onOpenQuote}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors"
                    >
                      Request On-Site Site Survey
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              CCTV AMC Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choose the right maintenance contract suited for your building's scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  pkg.recommended
                    ? 'bg-white border-2 border-gold-500 shadow-soft-lg'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div>
                  {pkg.recommended && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-gold-500 px-3 py-0.5 rounded-full inline-block mb-3">
                      Most Recommended for Societies
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{pkg.target}</p>
                  <p className="text-lg font-extrabold text-gold-700 mt-2">{pkg.price}</p>

                  <div className="space-y-2.5 my-6 pt-6 border-t border-slate-200">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenQuote}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    pkg.recommended
                      ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold-soft'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
