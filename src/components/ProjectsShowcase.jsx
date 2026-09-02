import React, { useState } from 'react';
import { MapPin, Building, ChevronRight } from 'lucide-react';

export default function ProjectsShowcase({ onOpenQuote, onOpenReportDetail }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: "silver-springs",
      title: "Silver Springs Residency",
      category: "society",
      categoryName: "Residential Society",
      location: "Sector 24, Ulwe, Navi Mumbai",
      specs: "14 Hikvision IP Cameras + NVR System + PoE Racks",
      desc: "Quarterly CCTV AMC, optical lens cleaning, NVR firmware audit, and network connectivity test.",
      reportNo: "RE-20826-2",
      badge: "Verified Client",
      stats: { cameras: "14 Cams", storage: "30 Days", uptime: "100%" },
      highlight: true,
      image: "/assets/banners/cctv-banner.jpg"
    },
    {
      id: "apex-corporate",
      title: "Apex Logistics & Business Park",
      category: "commercial",
      categoryName: "Corporate Office",
      location: "Sakinaka, Andheri East, Mumbai",
      specs: "32 4K IP Cameras, 9U Rack & Biometric Access",
      desc: "Structured Cat6 network cabling, perimeter AI motion alert system, and command desk display.",
      stats: { cameras: "32 Cams", storage: "60 Days", uptime: "99.9%" },
      image: "/assets/banners/biometric-banner.jpg"
    },
    {
      id: "royal-palms-society",
      title: "Royal Heights Co-op Housing Society",
      category: "society",
      categoryName: "Residential Society",
      location: "Chembur, Mumbai",
      specs: "24 ColorVu Night Vision Cameras + Society EPABX",
      desc: "Upgraded legacy wiring to high-speed IP CCTV across 3 wings with secretary mobile streaming.",
      stats: { cameras: "24 Cams", storage: "45 Days", uptime: "100%" },
      image: "/assets/banners/vdp-banner.jpg"
    },
    {
      id: "city-retail-hub",
      title: "Metro Plaza Shopping Complex",
      category: "retail",
      categoryName: "Retail & Malls",
      location: "Ghatkopar West, Mumbai",
      specs: "18 Ultra HD Wide-Angle Dome Cameras",
      desc: "Anti-theft surveillance with crystal-clear 4K zooming over billing counters and entry gates.",
      stats: { cameras: "18 Cams", storage: "30 Days", uptime: "99.8%" },
      image: "/assets/banners/cctv-banner.jpg"
    },
    {
      id: "st-xavier-academy",
      title: "Bright Future International School",
      category: "institution",
      categoryName: "School & Campus",
      location: "Powai, Mumbai",
      specs: "40 Cameras + Fire Alarm Smoke Sensors & PA",
      desc: "Safe campus surveillance covering playground, corridors, bus parking, and emergency staircase.",
      stats: { cameras: "40 Cams", storage: "60 Days", uptime: "100%" },
      image: "/assets/banners/fire-safety-banner.jpg"
    },
    {
      id: "midc-warehouse",
      title: "Mahavir Industrial Warehousing",
      category: "industrial",
      categoryName: "Warehouse & Factory",
      location: "MIDC, Thane-Belapur Road",
      specs: "16 Long-Range IR Bullet Cameras + Perimeter",
      desc: "Weatherproof IP67 industrial outdoor setup with night vision up to 80m and forklift zone safety.",
      stats: { cameras: "16 Cams", storage: "90 Days", uptime: "99.9%" },
      image: "/assets/banners/cctv-banner.jpg"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Sectors' },
    { id: 'society', name: 'Societies' },
    { id: 'commercial', name: 'Offices' },
    { id: 'retail', name: 'Retail' },
    { id: 'institution', name: 'Schools' },
    { id: 'industrial', name: 'Warehouses' }
  ];

  const filteredProjects = projects.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Featured Projects & Implementations
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Real installations, society AMC transformations, and enterprise security deployments in Mumbai.
          </p>
        </div>

        {/* Compact Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
                activeFilter === f.id
                  ? 'bg-gold-500 text-slate-950 shadow-gold-soft scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Compact 6-Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md group hover:-translate-y-0.5 ${
                proj.highlight ? 'border-gold-400 ring-1 ring-gold-400/40' : 'border-slate-200 hover:border-gold-300'
              }`}
            >
              <div>
                {/* Compact Thumbnail Banner */}
                <div className="relative h-32 sm:h-36 bg-slate-100 overflow-hidden border-b border-slate-200">
                  <img 
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Floating Tags */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/85 text-gold-400 font-bold text-[10px] border border-gold-500/30">
                      {proj.categoryName}
                    </span>
                    {proj.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-gold-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center space-x-1 text-[11px] font-semibold text-white">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span className="truncate max-w-[220px]">{proj.location}</span>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-gold-700 transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  
                  <p className="text-[11px] text-slate-700 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg font-semibold line-clamp-1">
                    ⚡ {proj.specs}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {proj.desc}
                  </p>

                  {/* Compact 1-Line Stats Strip */}
                  <div className="flex items-center justify-between text-[11px] bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
                    <span>📷 <strong className="text-slate-900">{proj.stats.cameras}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>💾 <strong className="text-slate-900">{proj.stats.storage}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>⚡ <strong className="text-emerald-700">{proj.stats.uptime}</strong></span>
                  </div>
                </div>
              </div>

              {/* Compact Footer Action */}
              <div className="p-4 pt-0">
                {proj.reportNo ? (
                  <button
                    onClick={() => onOpenReportDetail(proj.reportNo)}
                    className="w-full py-2 rounded-xl bg-gold-50 hover:bg-gold-500 text-gold-950 hover:text-slate-950 font-bold text-xs border border-gold-300 transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
                  >
                    <span>View Report ({proj.reportNo})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenQuote}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
                  >
                    <span>Request Setup</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
