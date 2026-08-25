import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MUMBAI_LOCATIONS, COMPANY_INFO, SERVICES } from '../data/websiteData';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import IconRenderer from '../components/IconRenderer';

export default function LocationDetailPage({ onOpenQuote }) {
  const { areaId } = useParams();
  const location = MUMBAI_LOCATIONS.find(l => l.id === areaId);

  if (!location) {
    return <Navigate to="/service-areas" replace />;
  }

  const otherLocations = MUMBAI_LOCATIONS.filter(l => l.id !== areaId).slice(0, 6);

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Breadcrumb & Header */}
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-gold-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/service-areas" className="hover:text-gold-700">Service Areas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-semibold">{location.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>{location.hub}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                {location.title}
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {location.desc}
              </p>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-colors"
              >
                <span>Contact Local Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={onOpenQuote}
                className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all"
              >
                Book Site Survey
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Reliable Surveillance & Security Solutions in {location.name}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Raksham Enterprises provides specialized CCTV installation, repair troubleshooting, and annual maintenance contracts (AMC) for cooperative housing societies, corporate offices, retail showrooms, and residential apartments across {location.name} and surrounding Mumbai areas.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Our locally stationed field technicians guarantee quick turnaround times (within 2 to 4 hours) for breakdown emergencies, camera lens cleanings, and system re-configurations.
                </p>
              </div>

              {/* Local Highlights Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-gold-700 text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Response SLA</span>
                  </div>
                  <p className="text-xs text-slate-700">Same-day technician visit & emergency troubleshooting in {location.name}.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-gold-700 text-xs font-bold">
                    <Zap className="w-4 h-4" />
                    <span>Key Localities & Landmarks</span>
                  </div>
                  <p className="text-xs text-slate-700">{location.landmark}</p>
                </div>
              </div>

              {/* Services in this Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Services Provided in {location.name}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "CCTV Camera Installation (HD / 4K IP)",
                    "Housing Society CCTV AMC Contracts",
                    "CCTV Repair & Video Loss Troubleshooting",
                    "Video Door Phone (VDP) & Intercom Systems",
                    "Biometric Attendance & Access Control",
                    "Surveillance Hard Disk (HDD) Replacement"
                  ].map((srv, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-page Booking Banner */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <h3 className="text-base font-bold text-white">Need a Security Survey in {location.name}?</h3>
                <p className="text-xs text-slate-300">
                  Schedule a free on-site survey. Our technician will visit and provide an itemized proposal with zero hidden costs.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenQuote}
                    className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft transition-all"
                  >
                    Book On-Site Survey
                  </button>
                  <Link
                    to="/contact"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
                  >
                    Contact Support Desk
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Other Mumbai Locations
                </h3>
                <div className="space-y-2">
                  {otherLocations.map((other) => (
                    <Link
                      key={other.id}
                      to={`/service-areas/${other.id}`}
                      className="p-2.5 rounded-xl bg-white hover:bg-gold-50 border border-slate-200/80 hover:border-gold-300 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-gold-800"
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-gold-600" />
                        <span>{other.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{other.hub}</span>
                    </Link>
                  ))}
                </div>
                <div className="pt-1 text-center">
                  <Link to="/service-areas" className="text-xs font-bold text-gold-700 hover:underline">
                    View All Mumbai Locations →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
