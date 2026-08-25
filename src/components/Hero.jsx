import React from 'react';
import { COMPANY_INFO } from '../data/websiteData';
import { ShieldCheck, Phone, MessageSquare, ArrowRight, CheckCircle2, Video, Eye, Radio, Sparkles } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const highlights = [
    "Residential Societies & Commercial AMC",
    "Same-Day Service Across Mumbai & Navi Mumbai",
    "Hikvision, CP Plus, Dahua Genuine Products",
    "Free On-Site Survey & Customized Quote"
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-obsidian-950">
      {/* Dynamic Background Pattern & Gradients */}
      <div className="absolute inset-0 bg-hero-pattern pointer-events-none z-0" />
      
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C8A251 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 shadow-gold-glow animate-pulse-slow">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                #1 Security System Solution Provider – Mumbai
              </span>
            </div>

            {/* Main Heading from PDF */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              <span className="block text-gradient-white">CCTV & Security System</span>
              <span className="text-gradient-gold">Solutions in Mumbai</span>
            </h1>

            {/* Subheading from PDF */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {COMPANY_INFO.heroSubheading}
            </p>

            {/* Key Bullet Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons from PDF */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              {/* Button 1: Get Free Consultation */}
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-gradient text-obsidian-950 font-extrabold text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-obsidian-950 font-bold" />
              </button>

              {/* Button 2: WhatsApp Us */}
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Raksham Enterprises, I need CCTV / Security solutions for my premises in Mumbai.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/50 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2.5 border border-emerald-400/40"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              {/* Call Link */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-obsidian-900/90 hover:bg-obsidian-800 text-slate-200 font-semibold text-sm border border-gold-500/30 hover:border-gold-500 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Experience & Trust Footnote */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-500" />
                <span className="text-slate-300 font-medium">15+ Years Industry Trust</span>
              </div>
              <span className="text-slate-600">•</span>
              <div>
                <span className="text-gold-400 font-semibold">1,200+</span> Installations
              </div>
              <span className="text-slate-600">•</span>
              <div>
                <span className="text-gold-400 font-semibold">250+</span> Active AMCs
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Security Visual with Live HUD Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Glass Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-obsidian-800/90 to-obsidian-900/90 p-2 sm:p-3 border border-gold-500/40 shadow-2xl shadow-gold-950/60 backdrop-blur-xl">
                
                {/* Surveillance Video Simulation HUD */}
                <div className="relative rounded-xl overflow-hidden bg-obsidian-950 aspect-[4/3] border border-gold-500/20 group">
                  
                  {/* Background Camera Graphics */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `radial-gradient(circle at center, rgba(11, 15, 25, 0.4) 0%, rgba(11, 15, 25, 0.85) 100%), url('/assets/logo-full.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  {/* High-Tech CCTV Camera Overlays */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-xs font-mono pointer-events-none select-none">
                    
                    {/* Top HUD: Live Record Indicator & Timestamp */}
                    <div className="flex justify-between items-center text-slate-200">
                      <div className="flex items-center space-x-2 bg-obsidian-950/80 px-2.5 py-1 rounded-md border border-red-500/40">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-red-400 font-bold text-[11px] tracking-wider">● REC [4K UHD]</span>
                      </div>
                      <div className="bg-obsidian-950/80 px-2.5 py-1 rounded-md text-gold-400 border border-gold-500/30 text-[11px]">
                        CAM_01: MUMBAI_HQ
                      </div>
                    </div>

                    {/* Center Crosshair Target */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div className="w-28 h-28 border border-gold-400/40 rounded-lg flex items-center justify-center relative">
                        <div className="w-3 h-3 border-t-2 border-l-2 border-gold-400 absolute top-0 left-0" />
                        <div className="w-3 h-3 border-t-2 border-r-2 border-gold-400 absolute top-0 right-0" />
                        <div className="w-3 h-3 border-b-2 border-l-2 border-gold-400 absolute bottom-0 left-0" />
                        <div className="w-3 h-3 border-b-2 border-r-2 border-gold-400 absolute bottom-0 right-0" />
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
                        <span className="absolute -bottom-5 bg-obsidian-900/90 text-gold-300 text-[9px] px-2 py-0.5 rounded border border-gold-500/30 tracking-wider">
                          AI PERIMETER ACTIVE
                        </span>
                      </div>
                    </div>

                    {/* Bottom HUD: Status info */}
                    <div className="flex justify-between items-end text-[10px] text-slate-300">
                      <div className="bg-obsidian-950/80 p-1.5 rounded border border-slate-700/60 space-y-0.5">
                        <p className="text-emerald-400 flex items-center space-x-1">
                          <Radio className="w-3 h-3" />
                          <span>SIGNAL: 100% (PoE Gigabit)</span>
                        </p>
                        <p className="text-slate-400">HDD HEALTH: OK (WD Purple)</p>
                      </div>
                      <div className="bg-gold-500/20 text-gold-300 px-2 py-1 rounded border border-gold-500/40 font-bold text-[10px]">
                        RAKSHAM SECURE
                      </div>
                    </div>

                  </div>
                </div>

                {/* Floating Bottom Highlight Cards */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="p-3 rounded-xl bg-obsidian-950/90 border border-gold-500/20 text-left">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Quick Dispatch</p>
                    <p className="text-sm font-bold text-white flex items-center space-x-1 mt-0.5">
                      <span className="text-gold-400">⚡ 2 Hours SLA</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">Across all Mumbai Hubs</p>
                  </div>

                  <div className="p-3 rounded-xl bg-obsidian-950/90 border border-gold-500/20 text-left">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Authorized Brands</p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Hikvision • CP Plus
                    </p>
                    <p className="text-[10px] text-gold-400 mt-1">100% Genuine Warranty</p>
                  </div>
                </div>

              </div>

              {/* Decorative Glow Ring */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500/20 rounded-full blur-2xl pointer-events-none -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
