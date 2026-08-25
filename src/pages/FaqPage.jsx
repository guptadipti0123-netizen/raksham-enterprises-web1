import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/websiteData';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';

export default function FaqPage({ onOpenQuote }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-gold-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            CCTV & Security <span className="text-gradient-gold">FAQs</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about CCTV installation costs, AMC inclusions, and system repairs in Mumbai.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all border overflow-hidden ${
                    isOpen
                      ? 'bg-slate-50 border-gold-400 shadow-soft'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-3">
                      <span className="text-gold-700 font-mono text-xs">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <div className={`p-1.5 rounded-lg transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-gold-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 animate-fadeIn">
                      <p>{faq.a}</p>
                      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center space-x-2 text-xs text-gold-800">
                        <span>Have more specific requirements?</span>
                        <a
                          href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Raksham, I have a question regarding: ${faq.q}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline hover:text-gold-900"
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

          {/* Bottom Help Box */}
          <div className="mt-14 p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Have a Question Not Listed Here?</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our CCTV engineers and security consultants are happy to assist with technical queries and site surveys.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Call Helpline: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Raksham Enterprises, I have a query regarding security systems.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
