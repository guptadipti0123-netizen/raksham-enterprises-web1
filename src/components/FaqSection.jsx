import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/websiteData';
import { ChevronDown, HelpCircle, MessageSquare, Phone } from 'lucide-react';

export default function FaqSection({ onOpenQuote }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-obsidian-900/40 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Frequently Asked <span className="text-gradient-gold">Questions (FAQs)</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Essential guidelines about CCTV installation costs in Mumbai, AMC inclusions, and system upgrades.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-b from-obsidian-900 to-obsidian-950 border-gold-500/50 shadow-gold-glow'
                    : 'bg-obsidian-900/70 border-slate-800 hover:border-gold-500/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center space-x-3">
                    <span className="text-gold-400 font-mono text-xs">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <div className={`p-1.5 rounded-lg bg-obsidian-950 border border-slate-700 text-gold-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-gold-500 text-obsidian-950 border-gold-500' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-fadeIn">
                    <p>{faq.a}</p>
                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center space-x-3 text-xs text-gold-400">
                      <span>Still have questions regarding this?</span>
                      <a
                        href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Raksham, I have a question about: ${faq.q}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline hover:text-gold-300"
                      >
                        Ask on WhatsApp →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
