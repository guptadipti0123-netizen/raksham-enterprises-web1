import React, { useState } from 'react';
import { ShieldCheck, MapPin, Building, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function ProjectsShowcase({ onOpenQuote, onOpenReportDetail }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: "silver-springs",
      title: "Silver Springs Residency",
      category: "society",
      categoryName: "Residential Society",
      location: "Sector 24, Ulwe, Navi Mumbai",
      specs: "14 Hikvision IP Dome & Bullet Cameras + NVR System + PoE Racks",
      desc: "Comprehensive quarterly AMC, optical lens cleaning, NVR firmware audit, and 100% network connectivity test.",
      reportNo: "RE-20826-2",
      badge: "Verified Client Case Study",
      stats: { cameras: "14 Cams", storage: "30 Days Retention", uptime: "100%" },
      highlight: true,
      image: "/assets/banners/cctv-banner.jpg"
    },
    {
      id: "apex-corporate",
      title: "Apex Logistics & Business Park",
      category: "commercial",
      categoryName: "Corporate Office & Logistics",
      location: "Sakinaka, Andheri East, Mumbai",
      specs: "32 4K IP Cameras, 9U Server Rack Dressing & Biometric Access",
      desc: "Structured Cat6 network cabling, perimeter AI motion alert system, and centralized command desk with HDMI multi-display.",
      stats: { cameras: "32 Cams", storage: "60 Days Retention", uptime: "99.9%" },
      image: "/assets/banners/biometric-banner.jpg"
    },
    {
      id: "royal-palms-society",
      title: "Royal Heights Co-op Housing Society",
      category: "society",
      categoryName: "Residential Society",
      location: "Chembur, Mumbai",
      specs: "24 ColorVu Night Vision Cameras + Society EPABX Intercom",
      desc: "Upgraded legacy analog wiring to high-speed IP CCTV across 3 wings, guard cabin monitor, and secretary mobile streaming.",
      stats: { cameras: "24 Cams", storage: "45 Days Retention", uptime: "100%" },
      image: "/assets/banners/vdp-banner.jpg"
    },
    {
      id: "city-retail-hub",
      title: "Metro Plaza Shopping Complex",
      category: "retail",
      categoryName: "Retail & Malls",
      location: "Ghatkopar West, Mumbai",
      specs: "18 Ultra HD Wide-Angle Dome Cameras & Cash Desk Coverage",
      desc: "Anti-theft surveillance with crystal-clear 4K zooming over billing counters and customer entry turnstiles.",
      stats: { cameras: "18 Cams", storage: "30 Days Retention", uptime: "99.8%" },
      image: "/assets/banners/cctv-banner.jpg"
    },
    {
      id: "st-xavier-academy",
      title: "Bright Future International School",
      category: "institution",
      categoryName: "School & Institution",
      location: "Powai, Mumbai",
      specs: "40 Cameras + Fire Alarm Smoke Sensors & PA Intercom",
      desc: "Safe campus surveillance covering playground, corridors, bus parking, and emergency staircase access.",
      stats: { cameras: "40 Cams", storage: "60 Days Retention", uptime: "100%" },
      image: "/assets/banners/fire-safety-banner.jpg"
    },
    {
      id: "midc-warehouse",
      title: "Mahavir Industrial Warehousing",
      category: "industrial",
      categoryName: "Warehouse & Factory",
      location: "MIDC, Thane-Belapur Road",
      specs: "16 Long-Range Infrared Bullet Cameras + Perimeter Beams",
      desc: "Weatherproof IP67 industrial outdoor setup with night vision up to 80 meters and forklift zone safety monitoring.",
      stats: { cameras: "16 Cams", storage: "90 Days Retention", uptime: "99.9%" },
      image: "/assets/banners/cctv-banner.jpg"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Sectors' },
    { id: 'society', name: 'Housing Societies' },
    { id: 'commercial', name: 'Corporate & Offices' },
    { id: 'retail', name: 'Retail & Shops' },
    { id: 'institution', name: 'Schools & Hospitals' },
    { id: 'industrial', name: 'Warehouses & Industrial' }
  ];

  const filteredProjects = projects.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-24 bg-slate-50 border-t border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Single Line Heading & Crisp Contrast) */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Building className="w-3.5 h-3.5 text-gold-600" />
            <span>Proven Track Record</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Featured Projects & Implementations
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Real installations, society AMC transformations, and enterprise security deployments across Mumbai & Navi Mumbai.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
                activeFilter === f.id
                  ? 'bg-gold-500 text-slate-950 shadow-gold-soft scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-lg group ${
                proj.highlight ? 'border-gold-400 ring-1 ring-gold-400/50' : 'border-slate-200 hover:border-gold-300'
              }`}
            >
              <div>
                {/* Visual Header / Banner */}
                <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-200">
                  <img 
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Floating Tags */}
                  <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/90 text-gold-400 font-bold text-[11px] border border-gold-500/30">
                      {proj.categoryName}
                    </span>
                    {proj.badge && (
                      <span className="px-2.5 py-1 rounded-md bg-gold-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-1.5 text-xs font-semibold text-white">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-gold-700 transition-colors">
                    {proj.title}
                  </h3>
                  
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold">
                    ⚡ {proj.specs}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.desc}
                  </p>

                  {/* Stat Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Scale</p>
                      <p className="text-xs font-extrabold text-slate-900 mt-0.5">{proj.stats.cameras}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Retention</p>
                      <p className="text-xs font-extrabold text-slate-900 mt-0.5">{proj.stats.storage}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Uptime</p>
                      <p className="text-xs font-extrabold text-emerald-700 mt-0.5">{proj.stats.uptime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0">
                {proj.reportNo ? (
                  <button
                    onClick={() => onOpenReportDetail(proj.reportNo)}
                    className="w-full py-2.5 rounded-xl bg-gold-50 hover:bg-gold-500 text-gold-950 hover:text-slate-950 font-bold text-xs border border-gold-300 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>View Verified Service Report ({proj.reportNo})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenQuote}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Request Similar Setup</span>
                    <ChevronRight className="w-4 h-4" />
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
