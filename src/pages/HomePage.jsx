import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  COMPANY_INFO, 
  USP_CARDS, 
  SERVICES, 
  MUMBAI_LOCATIONS, 
  TESTIMONIALS 
} from '../data/websiteData';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Wrench, 
  Building2, 
  ChevronRight, 
  Check, 
  MapPin, 
  Mail, 
  Clock, 
  Send,
  HelpCircle,
  Award,
  Sparkles,
  Zap,
  FileText
} from 'lucide-react';
import IconRenderer from '../components/IconRenderer';
import HeroBannerSlider from '../components/HeroBannerSlider';
import SecuritySolutionsSlider from '../components/SecuritySolutionsSlider';
import ProjectsShowcase from '../components/ProjectsShowcase';

export default function HomePage({ onOpenQuote }) {
  const { addEnquiry } = useAuth();

  // In-page Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    email: '',
    location: 'Chembur',
    serviceRequired: 'CCTV Installation',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeLocId, setActiveLocId] = useState('chembur');

  const activeLoc = MUMBAI_LOCATIONS.find(l => l.id === activeLocId) || MUMBAI_LOCATIONS[0];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.mobile) {
      alert('Please provide your name and mobile number.');
      return;
    }

    addEnquiry(contactForm);
    setFormSubmitted(true);
    alert('Thank you! Your consultation request has been received. Our team will contact you shortly.');
  };

  // Top 6 Featured Services for Home Page Teaser
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION BANNER CAROUSEL (4 Branded High-Impact Slides) */}
      <HeroBannerSlider onOpenQuote={onOpenQuote} />

      {/* 2. SERVICES TEASER (Compact 6-Card Grid with View All Link) */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider block mb-1">Our Core Services</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Security & Surveillance Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Certified installations, emergency repairs, and maintenance across Mumbai.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-gold-400 text-slate-800 font-bold text-xs transition-colors shadow-2xs self-start sm:self-auto"
            >
              <span>View All 12 Services</span>
              <ChevronRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>

          {/* 6 Compact Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.map((serv) => (
              <div
                key={serv.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-gold-400 hover:shadow-soft transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      <IconRenderer name={serv.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {serv.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-gold-700 transition-colors mb-1">
                    {serv.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                    {serv.shortDesc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${serv.id}`}
                    className="text-xs font-bold text-gold-700 hover:underline flex items-center space-x-0.5"
                  >
                    <span>Read Details →</span>
                  </Link>
                  <button
                    onClick={onOpenQuote}
                    className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-gold-700"
            >
              <span>Explore Fire Alarms, VDP, Intercom, Access Control & all 12 services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE HARDWARE & SECURITY SOLUTIONS IMAGE SLIDER */}
      <SecuritySolutionsSlider onOpenQuote={onOpenQuote} />

      {/* 4. CCTV AMC HIGHLIGHT BANNER (Compact with direct calculator link) */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-soft-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-8 space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded border border-gold-500/30">
                Annual Maintenance Protection
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                CCTV AMC Contracts for Societies & Offices in Mumbai
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                4 scheduled quarterly preventive lens cleanings, HDD recording audits, and unlimited breakdown emergency visits with <strong>₹0 labor charges</strong>.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>4 Routine Inspections</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>₹0 Breakdown Labor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>4-Hour SLA Response</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 relative z-10">
              <Link
                to="/cctv-amc-mumbai"
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft text-center transition-all"
              >
                CCTV AMC Cost Calculator & 11-Point Checklist →
              </Link>
              <Link
                to="/about-us"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 text-center transition-colors"
              >
                Learn About Our 15+ Years Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT INSTALLATION CASE STUDIES & PROJECT SHOWCASE */}
      <ProjectsShowcase onOpenQuote={onOpenQuote} onOpenReportDetail={() => {}} />

      {/* 6. SERVICE & COMPLAINT ROUTING HUB TEASER */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider">Fast Service Dispatch</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Need CCTV Service or Camera Repair?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choose your queue below for instant scheduling and automated complaint tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: AMC Customer */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-gold-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">₹0 Labor</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">1. AMC Customer Queue</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active AMC societies log in to raise free priority breakdown tickets with 4-hour SLA.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-colors"
              >
                Customer Login →
              </Link>
            </div>

            {/* Card 2: Non-AMC Paid Repair */}
            <div className="p-5 rounded-2xl bg-white border-2 border-gold-400 shadow-soft space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-gold-900 bg-gold-50 px-2 py-0.5 rounded uppercase">₹800 Visit Fee</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">2. Non-AMC Paid Repair</h3>
                <p className="text-xs text-slate-500 mt-1">
                  No AMC? Book on-demand technician visit with instant Complaint ID (e.g. NAC-20260825-001).
                </p>
              </div>
              <Link
                to="/service-request/non-amc"
                className="w-full py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs text-center block shadow-gold-soft transition-colors"
              >
                Book Non-AMC Repair (₹800) →
              </Link>
            </div>

            {/* Card 3: Track Existing Request */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase">Live Status</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">3. Track Service Ticket</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter Complaint No to see live technician assignment, ETA, and spare part quotes.
                </p>
              </div>
              <Link
                to="/track-service"
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block border border-slate-200 transition-colors"
              >
                Track Live Ticket →
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 6. MUMBAI SERVICE HUBS & INTERACTIVE COVERAGE MAP */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>Local Mumbai Coverage Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Fast Technician Dispatch Across Mumbai
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Select any location below to see nearby technician hubs, landmark coverage, and rapid response SLAs.
              </p>
            </div>

            <Link 
              to="/service-areas" 
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-gold-400 text-slate-800 font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto"
            >
              <span>View All 14 Hubs Directory</span>
              <ChevronRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>

          {/* Interactive Map & Hub Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Map Container & Selected Hub Spotlight Card */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Styled Interactive Map Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-300 shadow-md bg-slate-900 h-[280px] sm:h-[320px]">
                <iframe
                  title="Raksham Mumbai Coverage Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLoc.name + ', Mumbai, Maharashtra')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter contrast-105 opacity-90"
                  loading="lazy"
                ></iframe>

                {/* Floating Top-Left Status Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-white flex items-center space-x-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Live Dispatch Hub: {activeLoc.name}</span>
                </div>

                {/* Floating Top-Right SLA Badge */}
                <div className="absolute top-3 right-3 bg-gold-500 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-md">
                  {activeLoc.tag || '2hr Dispatch'}
                </div>
              </div>

              {/* Selected Location Details Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {activeLoc.name} Hub
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {activeLoc.hub}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Landmarks covered:</strong> {activeLoc.landmark}
                  </p>
                </div>

                <Link
                  to={`/service-areas/${activeLoc.id}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 flex-shrink-0 transition-colors"
                >
                  <span>Explore {activeLoc.name} →</span>
                </Link>
              </div>

            </div>

            {/* Right: Interactive 14 Location Micro-Chips Grid */}
            <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select A Service Hub (14 Locations)
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● Technicians On-Duty
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {MUMBAI_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === activeLocId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveLocId(loc.id)}
                      className={`p-2.5 rounded-xl text-left transition-all flex items-center justify-between group border ${
                        isSelected
                          ? 'bg-gold-500 text-slate-950 border-gold-600 shadow-sm font-bold scale-[1.02]'
                          : 'bg-slate-50 hover:bg-gold-50/60 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-gold-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-slate-950' : 'text-gold-600'}`} />
                        <span className="text-xs truncate">{loc.name}</span>
                      </div>
                      
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-slate-950/20 text-slate-950' : 'text-slate-400 bg-white border border-slate-200'
                      }`}>
                        {loc.tag?.split(' ')[0] || 'Fast'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-100">
                <span>Looking for urgent CCTV repair? </span>
                <Link to="/service-request" className="text-gold-700 font-bold hover:underline">
                  Book Technician Now →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. QUICK CONSULTATION INQUIRY FORM */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1.5">
            <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Book a Free On-Site Consultation
            </h2>
            <p className="text-xs text-slate-500">
              Our technician will call you within 15 minutes to assess your security requirements.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-xs shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98200 12345"
                  value={contactForm.mobile}
                  onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location / Area *</label>
                <select
                  value={contactForm.location}
                  onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500"
                >
                  {MUMBAI_LOCATIONS.map(l => (
                    <option key={l.id} value={l.name}>{l.name} ({l.hub})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Needed *</label>
                <select
                  value={contactForm.serviceRequired}
                  onChange={(e) => setContactForm({ ...contactForm, serviceRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Requirement Details (Optional)</label>
              <textarea
                rows="2"
                placeholder="e.g. Need 8 cameras for society entrance and lift lobby..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Consultation Request</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
