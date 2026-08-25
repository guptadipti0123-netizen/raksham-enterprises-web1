import React, { useState } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/websiteData';
import IconRenderer from './IconRenderer';
import { Check, ArrowRight, X, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServicesSection({ onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', name: 'All 12 Services' },
    { id: 'cctv', name: 'CCTV & Surveillance', ids: ['cctv-installation', 'cctv-repair', 'cctv-amc', 'ip-cctv-hd', 'dvr-nvr-solutions', 'cloud-surveillance'] },
    { id: 'access', name: 'Access & Attendance', ids: ['access-control', 'biometric-attendance', 'video-door-phone'] },
    { id: 'safety', name: 'Fire & Intercom', ids: ['fire-alarm', 'intercom-systems'] },
    { id: 'network', name: 'Networking & Infrastructure', ids: ['networking-solutions'] }
  ];

  const filteredServices = SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    const cat = categories.find(c => c.id === activeCategory);
    return cat?.ids?.includes(service.id);
  });

  return (
    <section id="services" className="py-24 bg-obsidian-900/50 relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Electronic Security</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Professional <span className="text-gradient-gold">Security & Surveillance</span> Services
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From single-camera residential setups to high-density IP surveillance and multi-building society AMCs across Mumbai.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gold-500 text-obsidian-950 shadow-gold-glow'
                  : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 hover:bg-obsidian-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid (All 12 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="group relative rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 p-6 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon and Service Number */}
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all duration-300">
                    <IconRenderer name={service.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-gold-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Bullet Points */}
                <div className="space-y-2 py-3 border-t border-slate-800/80 mb-4">
                  {service.highlights.slice(0, 3).map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-obsidian-800 hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-slate-700 hover:border-gold-500/40 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </button>
                
                <button
                  onClick={onOpenQuote}
                  className="py-2.5 px-3 rounded-lg bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-obsidian-950 border border-gold-500/30 text-xs font-bold transition-all"
                  title="Request Quote"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 p-8 border border-gold-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white">Need a Customized CCTV or Security Package for Your Building?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Get an on-site inspection and itemized technical proposal within 24 hours.</p>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-obsidian-950 border border-gold-500/40 text-slate-200 text-xs font-bold hover:text-gold-400 transition-all flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-xl bg-gold-gradient text-obsidian-950 text-xs font-extrabold shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              Book Site Survey
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-obsidian-950 rounded-2xl border border-gold-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-obsidian-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <IconRenderer name={selectedService.icon} className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Specialized Service</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedService.title}</h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <p className="leading-relaxed">{selectedService.fullDesc}</p>
              
              <div className="pt-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2.5">Key Highlights & Inclusions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feature, fIdx) => (
                    <div key={fIdx} className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span className="text-xs text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">Service Standard:</h4>
                <div className="p-3 rounded-xl bg-gold-500/5 border border-gold-500/20 text-xs text-slate-300">
                  ⚡ Same-Day Technician Visit in Mumbai • 100% Genuine Spare Parts • Official Digital Service Sheet
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I want to inquire about ${selectedService.title} in Mumbai.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-1/2 sm:w-auto px-4 py-3 rounded-xl bg-obsidian-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenQuote();
                  }}
                  className="w-1/2 sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs shadow-gold-glow"
                >
                  Get Instant Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
