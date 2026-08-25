import React, { useState } from 'react';
import { MUMBAI_LOCATIONS, COMPANY_INFO } from '../data/websiteData';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ServiceAreasPage({ onOpenQuote }) {
  const [selectedArea, setSelectedArea] = useState(MUMBAI_LOCATIONS[0]);

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-gold-600" />
            <span>Local Coverage in Mumbai & MMR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            CCTV & Security <span className="text-gradient-gold">Service Areas</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Our strategically stationed field teams ensure same-day response times and fast on-site troubleshooting across all Mumbai neighborhoods.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hubs List */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MUMBAI_LOCATIONS.map((loc) => {
                const isSelected = selectedArea.name === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedArea(loc)}
                    className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gold-50 border-gold-500 shadow-soft ring-1 ring-gold-400'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-900">{loc.name}</span>
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-600' : 'text-slate-400'}`} />
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{loc.hub}</p>
                    <span className={`text-[9px] font-semibold mt-2 px-1.5 py-0.5 rounded inline-block ${
                      isSelected ? 'bg-gold-500 text-white font-bold' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {loc.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Active Hub Detail Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-50 p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6 sticky top-28">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-700">Active Service Node</span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{selectedArea.name}</h3>
                    <p className="text-xs text-slate-500">{selectedArea.hub}</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
                    <Clock className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Response Window:</strong>
                      <span className="text-[11px] text-slate-600">On-site technician visit within 2-4 hours in {selectedArea.name}.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
                    <Zap className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Key Landmarks Covered:</strong>
                      <span className="text-[11px] text-slate-600">{selectedArea.landmark}.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Services Available:</strong>
                      <span className="text-[11px] text-slate-600">CCTV Installation, Society AMC, Video Door Phone & Biometric.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I need CCTV / Security services in ${selectedArea.name}, Mumbai.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Book Technician in {selectedArea.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>Call Helpline: {COMPANY_INFO.phone}</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
