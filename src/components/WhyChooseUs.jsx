import React from 'react';
import { WHY_CHOOSE_US } from '../data/websiteData';
import IconRenderer from './IconRenderer';
import { Award, CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Our Commitment to Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Why Choose <span className="text-gradient-gold">Raksham Enterprises?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivering highest standards of surveillance engineering, honest business ethics, and unmatched customer satisfaction across Mumbai.
          </p>
        </div>

        {/* 6 Cards Grid (Exact matching PDF 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 hover:shadow-gold-glow hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all mb-4">
                <IconRenderer name={item.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors flex items-center space-x-2">
                <span>{item.title}</span>
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {item.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center space-x-2 text-[11px] text-gold-400/90 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
