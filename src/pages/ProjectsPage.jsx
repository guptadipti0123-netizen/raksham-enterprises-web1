import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, ChevronRight, FileCheck, ShieldCheck } from 'lucide-react';

export default function ProjectsPage({ onOpenQuote }) {
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
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Building className="w-4 h-4 text-gold-600" />
            <span>Proven Track Record</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Projects & <span className="text-gradient-gold">Case Studies</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Explore our real-world CCTV installations and society AMC maintenance projects across Mumbai.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === f.id
                    ? 'bg-gold-500 text-white shadow-gold-soft'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className={`rounded-2xl bg-white border transition-all duration-200 p-6 flex flex-col justify-between ${
                  proj.highlight ? 'border-gold-400 shadow-soft-lg ring-1 ring-gold-300' : 'border-slate-200 hover:shadow-soft'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-gold-800 bg-gold-50 border border-gold-200 px-2.5 py-0.5 rounded-md">
                      {proj.categoryName}
                    </span>
                    {proj.badge && (
                      <span className="text-[10px] font-extrabold uppercase text-white bg-slate-900 px-2 py-0.5 rounded">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                    <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    ⚡ {proj.specs}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Scale</span>
                      <strong className="text-slate-900">{proj.stats.cameras}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Storage</span>
                      <strong className="text-slate-900">{proj.stats.storage}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Uptime</span>
                      <strong className="text-emerald-700">{proj.stats.uptime}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  {proj.reportNo ? (
                    <Link
                      to="/service-report"
                      className="w-full py-2.5 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-800 font-bold text-xs border border-gold-300 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FileCheck className="w-4 h-4 text-gold-600" />
                      <span>Verify Service Report ({proj.reportNo})</span>
                    </Link>
                  ) : (
                    <button
                      onClick={onOpenQuote}
                      className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Inquire Similar Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
