import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SERVICES, MUMBAI_LOCATIONS } from '../data/websiteData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  FileCheck, 
  ShieldCheck, 
  Wrench, 
  Sparkles,
  KeyRound,
  ArrowRight
} from 'lucide-react';

export default function Footer({ onOpenQuote }) {
  const googleMapsLink = COMPANY_INFO.googleMapsUrl || "https://maps.app.goo.gl/vh4YBiiS1bh3CJ3P7?g_st=awb";

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ⭐ GOOGLE MY BUSINESS VERIFIED PROFILE STRIP (Top of Footer) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-3.5 text-left w-full sm:w-auto">
            <div className="w-11 h-11 rounded-xl bg-white p-2 flex items-center justify-center flex-shrink-0 shadow-sm">
              {/* Google Official Multicolored Logo */}
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white tracking-tight">Raksham Enterprises on Google</span>
                <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ✓ Verified Business
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Google My Business listing • Directions & Customer Reviews on Google Maps
              </p>
            </div>
          </div>

          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold text-xs shadow-gold-soft transition-all flex-shrink-0 group"
          >
            <MapPin className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Open on Google Maps & Reviews →</span>
          </a>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-lg bg-white p-0.5 flex items-center justify-center shadow-sm">
                <img 
                  src="/assets/logo-icon.jpg" 
                  alt="Raksham Enterprises Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-display font-extrabold text-white">
                  <span className="text-gold-400">RAKSHAM</span> ENTERPRISES
                </span>
                <p className="text-[11px] text-gold-400/90 font-medium uppercase tracking-wider">
                  Security System Solution Provider – Mumbai
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Providing professional CCTV installation, annual maintenance contracts (AMC), access control, fire alarms, video door phones, and structured networking solutions across Mumbai and Navi Mumbai.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                to="/service-report"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gold-400 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Verify CCTV Service Report (PDF 1)</span>
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-gold-400" />
                <span>Customer & Admin Portal</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">All 12 Services</Link></li>
              <li><Link to="/cctv-amc-mumbai" className="hover:text-gold-400 transition-colors">CCTV AMC Plans</Link></li>
              <li><Link to="/service-request" className="text-gold-400 font-bold hover:underline">Need Service / Repair</Link></li>
              <li><Link to="/track-service" className="hover:text-gold-400 transition-colors">Track Complaint</Link></li>
              <li><Link to="/projects" className="hover:text-gold-400 transition-colors">Projects & Case Studies</Link></li>
              <li><Link to="/service-areas" className="hover:text-gold-400 transition-colors">Mumbai Service Areas</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: 12 Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-2">
              Our Security Solutions
            </h4>
            <ul className="space-y-1.5 text-xs">
              {SERVICES.slice(0, 8).map(s => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-gold-400 transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-gold-500" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-2">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center space-x-2 text-white hover:text-gold-400 font-bold">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a href={`https://wa.me/${COMPANY_INFO.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-emerald-400 hover:underline">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 98678 90606</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center space-x-2 text-slate-300 hover:text-gold-400">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <a 
                href={googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-gold-400 hover:underline font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>Google Business Profile (Maps) ↗</span>
              </a>
              <div className="flex items-start space-x-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>Mumbai & Navi Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

        </div>

        {/* ⭐ FOLLOW US ON SOCIAL MEDIA (Matching User Uploaded Image 1) */}
        <div className="pt-8 pb-4 border-t border-slate-800 text-center space-y-4">
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Follow Us On Social Media
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/rakshamenterprises/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram: @rakshamenterprises"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-[#E1306C] text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/raksham-enterprises/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn: Raksham Enterprises"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-[#0A66C2] text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/raksham.group/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook: @raksham.group"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-[#1877F2] text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@rakshamenterprises"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube: Raksham Enterprises"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-[#FF0000] text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/Rakshament"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter): @Rakshament"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-black text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Email Support */}
            <a
              href="mailto:Support@raksham.com"
              title="Email: Support@raksham.com"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-amber-600 text-white flex items-center justify-center border border-slate-700 hover:border-transparent transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Local SEO Service Areas Links */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Popular CCTV & Security Search Locations in Mumbai:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
            {MUMBAI_LOCATIONS.map((loc, idx) => (
              <Link key={loc.name} to={`/service-areas/${loc.id}`} className="hover:text-gold-400">
                CCTV Services in {loc.name} {idx < MUMBAI_LOCATIONS.length - 1 ? '•' : ''}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} <strong className="text-slate-300">Raksham Enterprises</strong>. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-slate-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
