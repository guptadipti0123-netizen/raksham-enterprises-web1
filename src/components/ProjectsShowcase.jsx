import React, { useState } from 'react';
import { ShieldCheck, MapPin, Building, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

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
      desc: "Complete comprehensive quarterly AMC, optical lens cleaning, NVR firmware audit, and 100% network connectivity test.",
      reportNo: "RE-20826-2",
      badge: "Verified Client Case Study",
      stats: { cameras: "14 Cams", storage: "30 Days Retention", uptime: "100%" },
      highlight: true
    },
    {
      id: "apex-corporate",
      title: "Apex Logistics & Business Park",
      category: "commercial",
      categoryName: "Corporate Office & Logistics",
      location: "Sakinaka, Andheri East, Mumbai",
      specs: "32 4K IP Cameras, 9U Server Rack Dressing & Biometric Access",
      desc: "Structured Cat6 network cabling, perimeter AI motion alert system, and centralized command desk with HDMI multi-display.",
      stats: { cameras: "32 Cams", storage: "60 Days Retention", uptime: "99.9%" }
    },
    {
      id: "royal-palms-society",
      title: "Royal Heights Co-op Housing Society",
      category: "society",
      categoryName: "Residential Society",
      location: "Chembur, Mumbai",
      specs: "24 ColorVu Night Vision Cameras + Society EPABX Intercom",
      desc: "Upgraded legacy analog wiring to high-speed IP CCTV across 3 wings, guard cabin monitor, and secretary mobile streaming.",
      stats: { cameras: "24 Cams", storage: "45 Days Retention", uptime: "100%" }
    },
    {
      id: "city-retail-hub",
      title: "Metro Plaza Shopping Complex",
      category: "retail",
      categoryName: "Retail & Malls",
      location: "Ghatkopar West, Mumbai",
      specs: "18 Ultra HD Wide-Angle Dome Cameras & Cash Desk Coverage",
      desc: "Anti-theft surveillance with crystal-clear 4K zooming over billing counters and customer entry turnstiles.",
      stats: { cameras: "18 Cams", storage: "30 Days Retention", uptime: "99.8%" }
    },
    {
      id: "st-xavier-academy",
      title: "Bright Future International School",
      category: "institution",
      categoryName: "School & Institution",
      location: "Powai, Mumbai",
      specs: "40 Cameras + Fire Alarm Smoke Sensors & PA Intercom",
      desc: "Safe campus surveillance covering playground, corridors, bus parking, and emergency staircase access.",
      stats: { cameras: "40 Cams", storage: "60 Days Retention", uptime: "100%" }
    },
    {
      id: "midc-warehouse",
      title: "Mahavir Industrial Warehousing",
      category: "industrial",
      categoryName: "Warehouse & Factory",
      location: "MIDC, Thane-Belapur Road",
      specs: "16 Long-Range Infrared Bullet Cameras + Perimeter Beams",
      desc: "Weatherproof IP67 industrial outdoor setup with night vision up to 80 meters and forklift zone safety monitoring.",
      stats: { cameras: "16 Cams", storage: "90 Days Retention", uptime: "99.9%" }
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
    <section id="projects" className="py-24 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Featured <span className="text-gradient-gold">Projects & Industry Implementations</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real installations, society AMC transformations, and enterprise security deployments across Mumbai & Navi Mumbai.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-gold-500 text-obsidian-950 shadow-gold-glow'
                  : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
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
              className={`rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-gold-glow group ${
                proj.highlight ? 'border-gold-500/70 shadow-gold-glow' : 'border-slate-800 hover:border-gold-500/40'
              }`}
            >
              <div>
                {/* Visual Header / Banner */}
                <div className="relative h-44 bg-obsidian-900 overflow-hidden border-b border-slate-800">
                  {/* Subtle CCTV Grid Graphic Background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-900/60 to-transparent z-10" />
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 opacity-60"
                    style={{
                      backgroundImage: `url('/assets/logo-full.jpg')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-obsidian-950/90 text-gold-400 font-semibold text-[11px] border border-gold-500/30">
                      {proj.categoryName}
                    </span>
                    {proj.badge && (
                      <span className="px-2.5 py-1 rounded-md bg-gold-500 text-obsidian-950 font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-1.5 text-xs text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                    {proj.title}
                  </h3>
                  
                  <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800/80 text-xs text-gold-400 font-medium">
                    ⚡ {proj.specs}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {proj.desc}
                  </p>

                  {/* Stat Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="p-2 rounded bg-obsidian-950/80 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Scale</p>
                      <p className="text-xs font-bold text-slate-200 mt-0.5">{proj.stats.cameras}</p>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950/80 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Retention</p>
                      <p className="text-xs font-bold text-slate-200 mt-0.5">{proj.stats.storage}</p>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950/80 border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase">Uptime</p>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">{proj.stats.uptime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                {proj.reportNo ? (
                  <button
                    onClick={() => onOpenReportDetail(proj.reportNo)}
                    className="w-full py-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-obsidian-950 font-bold text-xs border border-gold-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>View Verified Service Report ({proj.reportNo})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenQuote}
                    className="w-full py-2.5 rounded-xl bg-obsidian-800 hover:bg-gold-500/20 text-slate-300 hover:text-gold-300 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
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
