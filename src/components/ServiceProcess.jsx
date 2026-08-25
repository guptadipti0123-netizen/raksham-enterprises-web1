import React from 'react';
import { SERVICE_PROCESS, COMPANY_INFO } from '../data/websiteData';
import { ArrowRight, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ServiceProcess({ onOpenQuote }) {
  return (
    <section className="py-24 bg-obsidian-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Our Simple <span className="text-gradient-gold">5-Step Service Process</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From initial site consultation to flawless installation and proactive lifetime maintenance.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {SERVICE_PROCESS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between group"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gold-500 text-obsidian-950 font-display font-extrabold text-sm flex items-center justify-center shadow-gold-glow">
                    {step.step}
                  </span>
                  {idx < SERVICE_PROCESS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-600 group-hover:text-gold-400 transition-colors" />
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] font-semibold text-gold-400/90 mt-0.5 mb-2">
                  {step.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center space-x-1.5 text-[10px] text-slate-500">
                <CheckCircle2 className="w-3 h-3 text-gold-500" />
                <span>Standardized Quality Check</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar below process */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gold-gradient text-obsidian-950 font-extrabold text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
          >
            <span>Start Step 01: Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
