import React, { useState } from 'react';
import { AMC_CHECKLIST, COMPANY_INFO } from '../data/websiteData';
import { ShieldCheck, CheckCircle2, Calculator, ArrowRight, MessageSquare, Phone, Sparkles, Check, HelpCircle } from 'lucide-react';

export default function CctvAmcSection({ onOpenQuote }) {
  // AMC Interactive Calculator State
  const [propertyType, setPropertyType] = useState('society');
  const [cameraCount, setCameraCount] = useState(16);
  const [planType, setPlanType] = useState('comprehensive');

  // Dynamic estimate calculation
  const calculateEstimate = () => {
    let basePerCamera = planType === 'comprehensive' ? 350 : 220;
    if (propertyType === 'society') basePerCamera *= 0.9; // Society volume benefit
    if (propertyType === 'warehouse') basePerCamera *= 1.1; // Height / ladder factor
    const total = Math.round((cameraCount * basePerCamera) / 100) * 100;
    return {
      annualCost: Math.max(total, 3500),
      visitsPerYear: 4,
      breakdownVisits: planType === 'comprehensive' ? 'Unlimited Breakdown Calls' : 'Up to 6 Breakdown Calls'
    };
  };

  const estimate = calculateEstimate();

  const amcPackages = [
    {
      name: "Essential Preventive AMC",
      type: "non-comprehensive",
      popular: false,
      tag: "Small Shops & Offices (4-8 Cameras)",
      price: "From ₹3,500 / Year",
      features: [
        "4 Scheduled quarterly preventive visits",
        "Camera lens cleaning & refocusing",
        "DVR/NVR HDD health diagnostics",
        "Power supply & SMPS voltage test",
        "Priority emergency call-outs",
        "Digital service inspection report"
      ]
    },
    {
      name: "Society & Enterprise Shield",
      type: "comprehensive",
      popular: true,
      tag: "Most Popular for Housing Societies",
      price: "Customized Volume Rates",
      features: [
        "4 Quarterly deep maintenance visits",
        "Free labor on all breakdown calls",
        "Same-day emergency response in Mumbai",
        "High-ladder external camera servicing",
        "Full NVR network & PoE load audit",
        "Mobile live stream & cloud verification",
        "Verifiable digital job cards & AGM reports"
      ]
    },
    {
      name: "24/7 Mission-Critical AMC",
      type: "premium",
      popular: false,
      tag: "Hospitals, Banks & Warehouses",
      price: "Enterprise Custom",
      features: [
        "Monthly dedicated on-site inspections",
        "2-Hour guaranteed Mumbai SLA",
        "Standby spare DVR/NVR during repairs",
        "RAID redundancy & backup audits",
        "Annual thermal & wiring compliance check",
        "Dedicated senior security engineer"
      ]
    }
  ];

  return (
    <section id="cctv-amc" className="py-24 bg-obsidian-950 relative overflow-hidden border-t border-b border-slate-900">
      
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header from PDF */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">
            Professional <span className="text-gradient-gold">CCTV AMC Services</span> in Mumbai
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate camera blind spots, hard drive failures, and missed recordings with structured quarterly maintenance and fast on-site breakdown support.
          </p>
        </div>

        {/* 11 Inspection Checklist Cards (All 11 Points from PDF) */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">
                Our 11-Point Preventive <span className="text-gold-400">Inspection Protocol</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Every AMC visit undergoes a strict technical audit checklist.</p>
            </div>
            <div className="mt-3 sm:mt-0 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-gold-500/20 text-gold-400 text-xs font-semibold">
              ✓ Digital Service Report Issued
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AMC_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-obsidian-900/70 border border-slate-800 hover:border-gold-500/40 hover:bg-obsidian-900 transition-all duration-200 flex items-start space-x-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-colors flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Live AMC Calculator & Quick Estimator */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 p-6 sm:p-10 border border-gold-500/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Instant CCTV AMC Estimator</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Estimate Your Property's <span className="text-gold-400">Annual AMC Cost</span>
              </h3>
              <p className="text-xs text-slate-300">
                Select your premises details to get an immediate cost estimate and tailored service breakdown.
              </p>

              {/* Property Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">1. Property / Premises Type:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'society', name: 'Housing Society' },
                    { id: 'office', name: 'Corporate Office' },
                    { id: 'retail', name: 'Shop / Showroom' },
                    { id: 'warehouse', name: 'Warehouse / Factory' },
                    { id: 'school', name: 'School / College' },
                    { id: 'hospital', name: 'Hospital / Clinic' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPropertyType(t.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium border transition-all text-center ${
                        propertyType === t.id
                          ? 'bg-gold-500/20 border-gold-500 text-gold-300 font-bold'
                          : 'bg-obsidian-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Count Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">2. Number of CCTV Cameras:</span>
                  <span className="font-bold text-gold-400 text-sm px-2.5 py-0.5 rounded bg-obsidian-950 border border-gold-500/30">
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
                  className="w-full accent-gold-500 bg-obsidian-950 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>4 Cams (Small Setup)</span>
                  <span>16 Cams (Mid Society)</span>
                  <span>32 Cams (Large Complex)</span>
                  <span>64+ Cams</span>
                </div>
              </div>

              {/* AMC Plan Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">3. Preferred Maintenance Scope:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlanType('non-comprehensive')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      planType === 'non-comprehensive'
                        ? 'bg-gold-500/20 border-gold-500 text-white'
                        : 'bg-obsidian-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold">Standard Preventive Plan</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">4 Scheduled visits + lens cleaning</p>
                  </button>

                  <button
                    onClick={() => setPlanType('comprehensive')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      planType === 'comprehensive'
                        ? 'bg-gold-500/20 border-gold-500 text-white'
                        : 'bg-obsidian-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold text-gold-300">Full Comprehensive Society Plan</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Unlimited breakdowns + all labor free</p>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Estimate Output Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-obsidian-950 p-6 sm:p-8 border border-gold-500/40 text-center shadow-xl space-y-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 font-semibold bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30">
                  Estimated AMC Package
                </span>

                <div>
                  <p className="text-xs text-slate-400">Estimated Annual Contract Cost</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    <span className="text-gradient-gold">₹{estimate.annualCost.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-normal text-slate-400"> / year</span>
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Includes GST & Official Documentation
                  </p>
                </div>

                <div className="py-4 border-t border-b border-slate-800 space-y-2 text-left text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span><strong>4 Quarterly</strong> Deep Service Cleanings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{estimate.breakdownVisits}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>DVR/NVR & HDD Health Diagnostic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>Free Mobile Remote Viewing Re-configuration</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I want an AMC quote for my ${propertyType} with ${cameraCount} cameras. Estimated: ₹${estimate.annualCost}/yr.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-obsidian-950 font-extrabold text-xs shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Get Formal AMC Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Speak with AMC Manager</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* AMC Package Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {amcPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-obsidian-900 to-obsidian-950 border-2 border-gold-500 shadow-gold-glow'
                  : 'bg-obsidian-900/60 border border-slate-800 hover:border-gold-500/40'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gold-500 text-obsidian-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  Most Recommended
                </div>
              )}

              <div>
                <span className="text-[11px] font-medium text-gold-400">{pkg.tag}</span>
                <h3 className="text-xl font-bold text-white mt-1">{pkg.name}</h3>
                <p className="text-lg font-extrabold text-gold-300 mt-2">{pkg.price}</p>

                <div className="space-y-3 my-6 pt-6 border-t border-slate-800">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  pkg.popular
                    ? 'bg-gold-gradient text-obsidian-950 shadow-gold-glow hover:shadow-gold-glow-lg'
                    : 'bg-obsidian-800 text-slate-200 hover:bg-gold-500/20 hover:text-gold-300 border border-slate-700'
                }`}
              >
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
