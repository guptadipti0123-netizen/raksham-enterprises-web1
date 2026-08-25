import React from 'react';
import { USP_CARDS } from '../data/websiteData';
import IconRenderer from './IconRenderer';

export default function TrustStats() {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {USP_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className="relative group rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 p-6 border border-gold-500/30 hover:border-gold-400 transition-all duration-300 shadow-dark-card hover:shadow-gold-glow hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top decorative index & glow */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all duration-300 shadow-sm">
                <IconRenderer name={card.icon} className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-gold-400 transition-colors">
                0{idx + 1}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-semibold text-gold-400/90 mt-0.5 mb-2">
                {card.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>

            {/* Bottom active line */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
}
