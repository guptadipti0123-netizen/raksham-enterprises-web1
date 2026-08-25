import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  COMPANY_INFO, 
  USP_CARDS, 
  SECTORS, 
  SERVICES, 
  AMC_CHECKLIST, 
  WHY_CHOOSE_US, 
  SERVICE_PROCESS, 
  MUMBAI_LOCATIONS, 
  TESTIMONIALS, 
  FAQS 
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
  ChevronDown
} from 'lucide-react';
import IconRenderer from '../components/IconRenderer';

export default function HomePage({ onOpenQuote }) {
  const { addEnquiry } = useAuth();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // In-page Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    serviceRequired: 'CCTV Installation',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.mobile) {
      alert('Please provide your name and mobile number.');
      return;
    }

    // Save to CRM / Admin state
    addEnquiry(contactForm);

    // Trigger WhatsApp
    const waText = `*Website Consultation Inquiry - Raksham Enterprises*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(contactForm.name)}%0A` +
      `📞 *Mobile:* ${encodeURIComponent(contactForm.mobile)}%0A` +
      `📧 *Email:* ${encodeURIComponent(contactForm.email || 'N/A')}%0A` +
      `📍 *Location:* ${encodeURIComponent(contactForm.location || 'Mumbai')}%0A` +
      `🔧 *Service:* ${encodeURIComponent(contactForm.serviceRequired)}%0A` +
      `💬 *Message:* ${encodeURIComponent(contactForm.message || 'Please provide quotation.')}`;

    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${waText}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white">
      
      {/* 3. HERO SECTION */}
      <section className="relative pt-24 pb-14 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
        
        {/* Subtle Background Security Imagery & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('/assets/logo-full.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>Security System Solution Provider – Mumbai</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                CCTV & Security System <br className="hidden sm:block" />
                <span className="text-gradient-gold">Solutions in Mumbai</span>
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {COMPANY_INFO.heroSubheading}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs sm:text-sm shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/services"
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center space-x-2 border border-slate-700"
                >
                  <span>Explore 12 Services</span>
                </Link>
              </div>

              {/* Small Trust Points Below Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-slate-300 text-xs text-left">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-semibold">24×7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-semibold">Mumbai Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-semibold">AMC Services</span>
                </div>
              </div>

            </div>

            {/* Right Brand & Portal Action Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 flex items-center justify-center mx-auto shadow-md">
                  <img 
                    src="/assets/logo-icon.jpg" 
                    alt="Raksham Enterprises Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">RAKSHAM ENTERPRISES</h3>
                  <p className="text-xs text-gold-400 font-semibold mt-0.5">Security System Solution Provider – Mumbai</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Direct site assessments, genuine warranty hardware, and official digital service reports.
                  </p>
                </div>

                <div className="pt-2 space-y-2.5">
                  <Link
                    to="/login"
                    className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft transition-all block text-center"
                  >
                    Customer & Admin Portal Login →
                  </Link>

                  <Link
                    to="/cctv-amc-mumbai"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                    <span>View CCTV AMC Packages</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST / USP SECTION */}
      <section className="py-14 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USP_CARDS.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-gold-400 hover:shadow-soft transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex items-center justify-center mb-4">
                    <IconRenderer name={card.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{card.title}</h3>
                  <p className="text-xs font-semibold text-gold-700 mb-2">{card.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT RAKSHAM ENTERPRISES */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">About Raksham Enterprises</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Your Trusted Security System Partner in Mumbai
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Raksham Enterprises provides complete electronic security and surveillance solutions — from system assessment and design to installation, maintenance and technical support.
            </p>
          </div>

          {/* Industry Chips Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industries & Sectors We Protect:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SECTORS.slice(0, 10).map((sec) => (
                <div
                  key={sec.name}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-300 hover:bg-gold-50/50 transition-all flex items-center space-x-2.5 text-xs font-semibold text-slate-800"
                >
                  <IconRenderer name={sec.icon} className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span className="truncate">{sec.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/about-us"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION (All 12 Core Cards) */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block mb-1">Our Core Capabilities</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                Our Security & Surveillance Services
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                12 specialized electronic security solutions with certified hardware and dedicated technician support.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-gold-400 text-slate-800 font-bold text-xs transition-colors shadow-xs"
            >
              <span>View Services Directory</span>
              <ChevronRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>

          {/* 12 Individual Cards (01 to 12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-gold-400 hover:shadow-soft transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      <IconRenderer name={serv.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-extrabold text-slate-400">
                      {serv.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-gold-700 transition-colors mb-2">
                    {serv.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {serv.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${serv.id}`}
                    className="text-xs font-bold text-gold-700 hover:text-gold-800 flex items-center space-x-1"
                  >
                    <span>Learn More →</span>
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

        </div>
      </section>

      {/* 8. CCTV AMC SPECIAL CONVERSION SECTION */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Maintenance & Protection</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Professional CCTV AMC Services in Mumbai
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ensure 365 days of uninterrupted recording retention with structured quarterly preventive maintenance, lens cleaning, DVR/NVR health diagnostics, and unlimited emergency breakdown support.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/cctv-amc-mumbai"
                className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all"
              >
                Get CCTV AMC Quote & Calculator →
              </Link>
            </div>
          </div>

          {/* What's Included in Our CCTV AMC? (11 Cards) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              What's Included in Our CCTV AMC? (11-Point Inspection Checklist)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {AMC_CHECKLIST.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-300 hover:bg-white transition-all flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-md bg-gold-100 text-gold-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 11. WHY CHOOSE RAKSHAM (6 Cards) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Our Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Choose Raksham Enterprises?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-gold-300 hover:shadow-soft transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center mb-3">
                  <IconRenderer name={card.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. SERVICE PROCESS (5 Steps) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our 5-Step Service Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICE_PROCESS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-lg bg-gold-500 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">{step.title}</h3>
                  <p className="text-[11px] font-semibold text-gold-700 mb-2">{step.subtitle}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. PROJECTS / INDUSTRIES */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block mb-1">Portfolio</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Security Solutions Across Multiple Industries
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-xs font-bold text-gold-700 hover:underline flex items-center space-x-1"
            >
              <span>View All Project Details →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real Case Study from PDF 1 */}
            <div className="p-6 rounded-2xl bg-white border border-gold-300 shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800 bg-gold-100 px-2 py-0.5 rounded inline-block mb-3">
                  Residential Society
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1">Silver Springs Residency</h3>
                <p className="text-xs text-slate-500 mb-2">Sector 24, Ulwe, Navi Mumbai</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  14 Hikvision NVR camera system comprehensive servicing, optical lens cleaning, and HDD diagnostics.
                </p>
              </div>
              <Link
                to="/service-report"
                className="w-full py-2 rounded-lg bg-gold-50 hover:bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold text-center block transition-colors"
              >
                View Service Report (RE-20826-2) →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block mb-3">
                  Corporate Office
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1">Apex Logistics Park</h3>
                <p className="text-xs text-slate-500 mb-2">Sakinaka, Andheri East</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  32 4K IP cameras, structured Cat6 server rack dressing, and biometric attendance integration.
                </p>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-slate-700 hover:text-gold-700"
              >
                View Project →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block mb-3">
                  Commercial Retail
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1">Metro Plaza Shopping Complex</h3>
                <p className="text-xs text-slate-500 mb-2">Ghatkopar West, Mumbai</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  18 Ultra HD Wide-Angle dome cameras with cash counter zoom and customer flow monitoring.
                </p>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-slate-700 hover:text-gold-700"
              >
                View Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 14. SERVICE AREAS */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block mb-1">Local SEO</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              CCTV Services in Mumbai
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Dedicated field technician teams stationed across major Mumbai neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {MUMBAI_LOCATIONS.map((loc) => (
              <Link
                key={loc.id}
                to={`/service-areas/${loc.id}`}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-400 hover:bg-gold-50 text-center transition-all group"
              >
                <MapPin className="w-4 h-4 text-gold-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-gold-800 block">
                  {loc.name}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {loc.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 16. CUSTOMER REVIEWS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block mb-1">Testimonials</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                What Our Customers Say
              </h2>
            </div>
            <div className="flex items-center space-x-1 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs font-bold text-slate-800">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-slate-700">4.9 / 5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-slate-900 block">{rev.name}</strong>
                    <span className="text-[11px] text-slate-500">{rev.role} • {rev.location}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. FAQ SECTION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Help Center</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'bg-slate-50 border-gold-300 shadow-xs' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-3"
                  >
                    <span className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <span className="text-gold-700 font-mono text-xs">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-gold-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 18. CONTACT SECTION */}
      <section id="contact-cta" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-gold-700 uppercase tracking-wider block mb-1">Get In Touch</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Get in Touch With Raksham Enterprises
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Security System Solution Provider – Mumbai. Schedule a free site assessment or request a fast quotation.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-gold-300 transition-colors shadow-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Helpline & Inquiry:</span>
                    <strong className="text-slate-900 text-sm font-bold">{COMPANY_INFO.phone}</strong>
                  </div>
                </a>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <span className="text-slate-500 block text-[11px]">Email Inquiries:</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-800 font-semibold block hover:text-gold-700">
                    📧 {COMPANY_INFO.email}
                  </a>
                  <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-slate-800 font-semibold block hover:text-gold-700">
                    📧 {COMPANY_INFO.supportEmail}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start space-x-3 shadow-xs">
                  <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Coverage:</span>
                    <span className="text-slate-800 font-semibold">Mumbai, Navi Mumbai & Thane, Maharashtra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft-lg">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Forwarded to WhatsApp!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Our security engineer will review your site requirements and contact you promptly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Request a Free Consultation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siddhesh Purarkar"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 90291 14205"
                        value={contactForm.mobile}
                        onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="e.g. client@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ulwe, Chembur, Andheri"
                        value={contactForm.location}
                        onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Service Required *</label>
                    <select
                      value={contactForm.serviceRequired}
                      onChange={(e) => setContactForm({ ...contactForm, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Message / Details</label>
                    <textarea
                      rows="3"
                      placeholder="Please describe your security requirements (number of cameras, AMC inquiry, etc.)..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Consultation Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
