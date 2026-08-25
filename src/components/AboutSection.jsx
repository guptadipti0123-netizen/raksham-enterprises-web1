import React, { useState } from 'react';
import { COMPANY_INFO, SECTORS } from '../data/websiteData';
import { ShieldCheck, CheckCircle2, ArrowRight, Building, Award, Users2, Shield } from 'lucide-react';
import IconRenderer from './IconRenderer';

export default function AboutSection({ onOpenQuote }) {
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);

  const corePillars = [
    { title: "End-to-End Surveillance", desc: "From architectural site assessment and cable blueprint design to hardware installation & remote cloud configuration." },
    { title: "Certified Brand Hardware", desc: "Direct sourcing of high-durability equipment from Hikvision, CP Plus, Dahua, Seagate SkyHawk and Western Digital." },
    { title: "Dedicated Mumbai SLA", desc: "Fast on-site dispatch across Mumbai, Navi Mumbai & Thane with verified digital documentation on every visit." },
  ];

  return (
    <section id="about" className="py-24 bg-obsidian-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>About Raksham Enterprises</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Your Trusted <span className="text-gradient-gold">Security System Partner</span> in Mumbai
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Raksham Enterprises provides complete electronic security and surveillance solutions, from system assessment and design to professional installation, preventive maintenance, and 24/7 technical support.
          </p>
        </div>

        {/* Two-Column Grid: Company Mission & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 p-6 border border-gold-500/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-800">
                <img 
                  src="/assets/logo-full.jpg" 
                  alt="Raksham Enterprises Logo" 
                  className="h-16 w-auto object-contain rounded-lg bg-white p-2 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-bold text-white">RAKSHAM ENTERPRISES</h3>
                  <p className="text-xs text-gold-400 font-medium">Security System Solution Provider</p>
                  <p className="text-[11px] text-slate-400">Est. Mumbai, Maharashtra</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <p className="leading-relaxed">
                  With over <strong className="text-gold-400">15+ years of specialized experience</strong>, Raksham Enterprises has safeguarded hundreds of cooperative housing societies, corporate offices, industrial warehouses, and commercial establishments across Mumbai.
                </p>
                <p className="leading-relaxed">
                  We believe that security is not just about mounting cameras—it is about zero blind spots, infallible recording retention, and rapid technician turnaround when you need support the most.
                </p>
              </div>

              {/* Quick Stat Pill Highlights */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-obsidian-800/80 border border-slate-700">
                  <p className="text-xl font-extrabold text-gold-400">500+</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Projects Delivered</p>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-800/80 border border-slate-700">
                  <p className="text-xl font-extrabold text-gold-400">99.8%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">AMC Uptime Record</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why Mumbai Organizations Rely on Raksham for Complete Electronic Protection
            </h3>
            
            <div className="space-y-4">
              {corePillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-obsidian-900/60 border border-slate-800 hover:border-gold-500/30 transition-all flex items-start space-x-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 text-sm font-bold text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Schedule a Free Site Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Sectors & Industries We Serve (Grid from PDF) */}
        <div className="mt-16 pt-16 border-t border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Industries & Sectors <span className="text-gradient-gold">We Protect</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Customized electronic security architectures tailored for every property type.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SECTORS.map((sector) => (
              <div
                key={sector.name}
                className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 hover:border-gold-500/40 hover:bg-obsidian-800 transition-all duration-300 text-center group cursor-pointer"
                onClick={onOpenQuote}
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all mb-2.5">
                  <IconRenderer name={sector.icon} className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-gold-400 transition-colors leading-tight">
                  {sector.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
