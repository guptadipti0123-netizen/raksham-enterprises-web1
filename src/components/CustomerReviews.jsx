import React from 'react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/websiteData';
import { Star, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CustomerReviews({ onOpenQuote }) {
  return (
    <section className="py-24 bg-obsidian-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Trusted by Hundreds of <span className="text-gradient-gold">Societies & Businesses</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Read verified feedback from housing society secretaries, facility managers, and business owners across Mumbai.
          </p>

          {/* Google Reviews Badge Header */}
          <div className="pt-2 inline-flex items-center space-x-3 bg-obsidian-900 px-5 py-2 rounded-full border border-gold-500/20 text-xs">
            <span className="font-bold text-white">Google Rating:</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-gold-400">4.9 / 5.0</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">180+ Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-slate-800 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-gold-glow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-gold-400 font-medium">{t.role}</p>
                    <p className="text-[10px] text-slate-500">{t.location}</p>
                  </div>
                  {t.verified && (
                    <div className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA Bar from PDF 2 */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Star className="w-5 h-5 fill-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have we serviced your security system recently?</h4>
              <p className="text-xs text-slate-400">Your genuine review on Google helps other Mumbai residents choose quality security.</p>
            </div>
          </div>
          
          <a
            href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Raksham Enterprises, I would like to leave a customer review / feedback.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs shadow-gold-glow flex-shrink-0"
          >
            Submit Google Review / Feedback
          </a>
        </div>

      </div>
    </section>
  );
}
