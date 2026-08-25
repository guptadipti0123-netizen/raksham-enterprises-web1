import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, COMPANY_INFO } from '../data/websiteData';
import { ArrowRight, Check, Sparkles, Phone, MessageSquare } from 'lucide-react';
import IconRenderer from '../components/IconRenderer';

export default function ServicesPage({ onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState('all');

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
    <div className="bg-white pt-28 pb-20">
      
      {/* Page Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Complete Electronic Security Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Our Security <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Explore our 12 specialized electronic security and surveillance installation & maintenance services in Mumbai.
          </p>
        </div>
      </section>

      {/* Services Showcase Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gold-500 text-white shadow-gold-soft'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 12 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-gold-300 hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      <IconRenderer name={service.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-gold-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 py-3 border-t border-slate-100 mb-4">
                    {service.highlights.slice(0, 3).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    to={`/services/${service.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-gold-50 text-slate-800 hover:text-gold-800 border border-slate-200 hover:border-gold-200 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                  </Link>

                  <button
                    onClick={onOpenQuote}
                    className="py-2.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Need Multiple Security Systems Integrated?</h3>
              <p className="text-xs text-slate-600 mt-1">We design unified CCTV, Intercom, Access Control & Fire Alarm architectures for buildings.</p>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-gold-400 transition-colors flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all"
              >
                Request Custom Proposal
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
