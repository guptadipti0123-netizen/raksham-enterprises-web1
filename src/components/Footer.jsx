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
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
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
              <div className="flex items-start space-x-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Mumbai & Navi Mumbai, Maharashtra</span>
              </div>
            </div>
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
