import React from 'react';
import { COMPANY_INFO } from '../data/websiteData';
import { Phone, MessageSquare, ClipboardList } from 'lucide-react';

export default function MobileStickyBar({ onOpenQuote }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 p-2 shadow-lg no-print">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* 1. Call Button */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 active:bg-slate-200 transition-colors"
        >
          <Phone className="w-4 h-4 text-gold-600 mb-0.5" />
          <span className="text-[10px] font-bold">Call</span>
        </a>

        {/* 2. WhatsApp Button */}
        <a
          href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Raksham Enterprises, I would like to inquire about CCTV / Security solutions.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 active:bg-emerald-100 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* 3. Get Quote Button */}
        <button
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gold-500 text-white active:bg-gold-600 transition-colors font-bold shadow-sm"
        >
          <ClipboardList className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Get Quote</span>
        </button>

      </div>
    </div>
  );
}
