import React, { useState } from 'react';
import { MUMBAI_LOCATIONS, COMPANY_INFO } from '../data/websiteData';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function MumbaiServiceAreas({ onOpenQuote }) {
  const [selectedArea, setSelectedArea] = useState(MUMBAI_LOCATIONS[0]);

  return (
    <section id="service-areas" className="py-24 bg-obsidian-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            CCTV & Security Services <span className="text-gradient-gold">Across Mumbai & Navi Mumbai</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our strategically stationed surveillance field teams ensure rapid response times and same-day on-site troubleshooting across all major Mumbai zones.
          </p>
        </div>

        {/* Location Grid & Active Hub Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Locations List */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MUMBAI_LOCATIONS.map((loc) => {
              const isSelected = selectedArea.name === loc.name;
              return (
                <button
                  key={loc.name}
                  onClick={() => setSelectedArea(loc)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-obsidian-900 to-obsidian-950 border-gold-500 shadow-gold-glow'
                      : 'bg-obsidian-950/70 border-slate-800 hover:border-gold-500/40 hover:bg-obsidian-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white">{loc.name}</span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-400' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{loc.hub}</p>
                  <span className={`text-[9px] font-semibold mt-2 px-1.5 py-0.5 rounded inline-block ${
                    isSelected ? 'bg-gold-500 text-obsidian-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {loc.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Selected Area Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 p-6 sm:p-8 border border-gold-500/40 shadow-2xl space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-mono text-gold-400 font-bold">Active Service Hub</span>
                  <h3 className="text-2xl font-extrabold text-white">{selectedArea.name}</h3>
                  <p className="text-xs text-slate-400">{selectedArea.hub}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Area Perks */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-obsidian-950 border border-slate-800">
                  <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Rapid Dispatch Window:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">Technicians available for emergency on-site inspection within 2 hours in {selectedArea.name}.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-obsidian-950 border border-slate-800">
                  <Zap className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Coverage Highlights:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">Key landmarks & residential clusters: {selectedArea.landmark}.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-obsidian-950 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Available Services in {selectedArea.name}:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">CCTV Installation, Society AMC, Video Door Phone, Intercom & Biometrics.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I need CCTV / Security services in ${selectedArea.name}, Mumbai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-obsidian-950 font-extrabold text-xs shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>Book Technician in {selectedArea.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full py-3 px-4 rounded-xl bg-obsidian-950 text-slate-200 font-bold text-xs border border-slate-700 hover:border-gold-500/50 transition-all flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
