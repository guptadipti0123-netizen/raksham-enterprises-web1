import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  User, 
  Lock, 
  Wrench, 
  ArrowRight,
  Sparkles,
  KeyRound,
  UserCheck,
  MapPin
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, MUMBAI_LOCATIONS } from '../data/websiteData';
import { useAuth } from '../context/AuthContext';
import IconRenderer from './IconRenderer';

export default function Navbar({ onOpenQuote }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { userRole, activeCustomer } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Main Desktop Navigation Links (Clean & Concise)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'CCTV AMC', path: '/cctv-amc-mumbai' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. Top Mini Bar (Contact & Portal) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 hidden lg:block border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-gold-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Security System Solution Provider – Mumbai</span>
            </span>
            <span className="text-slate-700">|</span>
            <span>
              24×7 Support: <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white hover:text-gold-400 font-bold transition-colors">{COMPANY_INFO.phone}</a>
            </span>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-gold-400 transition-colors">
              {COMPANY_INFO.email}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/service-areas" 
              className="text-slate-300 hover:text-gold-400 font-semibold transition-colors flex items-center space-x-1"
            >
              <span>📍 Service Areas</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link 
              to="/track-service" 
              className="text-slate-300 hover:text-gold-400 font-semibold transition-colors flex items-center space-x-1"
            >
              <span>🔍 Track Service</span>
            </Link>
            <span className="text-slate-700">|</span>
            {userRole ? (
              <Link 
                to={userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                className="flex items-center space-x-1.5 text-gold-400 hover:text-gold-300 font-bold bg-slate-800 px-2.5 py-0.5 rounded border border-gold-500/30 transition-all"
              >
                <UserCheck className="w-3 h-3 text-gold-400" />
                <span className="truncate max-w-[200px]">
                  {userRole === 'admin' ? 'Operations Desk' : (activeCustomer?.name || 'Customer Portal')}
                </span>
              </Link>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1.5 text-gold-400 hover:text-gold-300 font-semibold bg-slate-800 px-2.5 py-0.5 rounded border border-gold-500/30 transition-colors"
              >
                <KeyRound className="w-3 h-3" />
                <span>Customer & Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5' 
          : 'bg-white border-b border-slate-100 py-3'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs group-hover:border-gold-500 transition-colors flex-shrink-0">
                <img 
                  src="/assets/logo-icon.jpg" 
                  alt="Raksham Enterprises Logo Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-left flex-shrink-0">
                <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 leading-none group-hover:text-gold-700 transition-colors whitespace-nowrap">
                  <span className="text-gold-600">RAKSHAM</span> ENTERPRISES
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5 whitespace-nowrap">
                  Security System Solutions • Mumbai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                
                if (link.hasDropdown) {
                  return (
                    <div 
                      key={link.name} 
                      ref={dropdownRef}
                      className="relative group/nav"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <div className="flex items-center">
                        <Link
                          to={link.path}
                          className={`pl-2.5 pr-1 py-1.5 text-[13px] font-bold rounded-l-lg transition-all whitespace-nowrap ${
                            isActive 
                              ? 'text-gold-700 bg-gold-50' 
                              : 'text-slate-700 hover:text-gold-700 hover:bg-slate-50'
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`pr-2 py-1.5 text-[13px] rounded-r-lg transition-all flex items-center ${
                            isActive 
                              ? 'text-gold-700 bg-gold-50' 
                              : 'text-slate-700 hover:text-gold-700 hover:bg-slate-50'
                          }`}
                          aria-label="Toggle services menu"
                        >
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-gold-600' : 'text-slate-400'}`} />
                        </button>
                      </div>

                      {/* Dropdown Menu (Includes 12 Services + Service Areas Submenu) */}
                      {isServicesOpen && (
                        <div className="absolute top-full left-0 w-[620px] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 transition-all duration-200 z-50 animate-fadeIn mt-1">
                          
                          {/* Top Sub-Bar with Direct Page Links */}
                          <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between px-1">
                            <Link 
                              to="/services" 
                              onClick={() => setIsServicesOpen(false)}
                              className="text-xs text-gold-700 hover:text-gold-800 font-extrabold flex items-center space-x-1"
                            >
                              <span>🛠️ View All 12 Services Page</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            <Link 
                              to="/service-areas" 
                              onClick={() => setIsServicesOpen(false)}
                              className="text-xs text-slate-800 hover:text-gold-700 font-bold bg-gold-50 hover:bg-gold-100 px-2.5 py-1 rounded-lg border border-gold-200 flex items-center space-x-1 transition-colors"
                            >
                              <span>📍 Mumbai Service Areas (14 Hubs)</span>
                              <ArrowRight className="w-3 h-3 text-gold-600" />
                            </Link>
                          </div>

                          {/* 12 Services Grid */}
                          <div className="grid grid-cols-2 gap-2">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.id}
                                to={`/services/${service.id}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="flex items-start space-x-2.5 p-2 rounded-xl hover:bg-gold-50/70 border border-transparent hover:border-gold-200 transition-all text-left group/item"
                              >
                                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover/item:bg-gold-500 group-hover/item:text-white transition-colors flex-shrink-0 mt-0.5">
                                  <IconRenderer name={service.icon} className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold text-slate-800 group-hover/item:text-gold-700 transition-colors truncate">
                                    {service.title}
                                  </p>
                                  <p className="text-[10px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                                    {service.shortDesc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom Area Quick Link Banner */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs px-2 bg-slate-50 p-2 rounded-xl">
                            <span className="text-[11px] text-slate-600 font-medium">
                              Covering Chembur, Ghatkopar, Sakinaka, Andheri, Navi Mumbai & more
                            </span>
                            <Link
                              to="/service-areas"
                              onClick={() => setIsServicesOpen(false)}
                              className="font-bold text-gold-700 hover:underline flex items-center space-x-1"
                            >
                              <span>Explore Locations →</span>
                            </Link>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-2.5 xl:px-3 py-1.5 text-[13px] font-bold rounded-lg transition-all whitespace-nowrap ${
                      isActive 
                        ? 'text-gold-700 bg-gold-50' 
                        : 'text-slate-700 hover:text-gold-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Header Action Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2.5 flex-shrink-0">
              <Link
                to={userRole ? (userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all whitespace-nowrap shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>{userRole ? (userRole === 'admin' ? 'Admin' : 'Portal') : 'Login'}</span>
              </Link>

              <button
                onClick={onOpenQuote}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft hover:shadow-gold-hover transition-all whitespace-nowrap flex-shrink-0"
              >
                Get Free Quote
              </button>
            </div>

            {/* Mobile Header Right Controls */}
            <div className="flex items-center space-x-2 lg:hidden flex-shrink-0">
              <Link
                to={userRole ? (userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center space-x-1 shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span>{userRole ? 'Portal' : 'Login'}</span>
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive ? 'bg-gold-50 text-gold-700' : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/service-areas"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-gold-600" />
                <span>Mumbai Service Areas (14 Locations)</span>
              </Link>
              
              <Link
                to="/service-request"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-gold-50/80 border border-gold-200 flex items-center space-x-2"
              >
                <Wrench className="w-4 h-4 text-gold-700" />
                <span>Need Service / Repair (AMC & Paid)</span>
              </Link>

              <Link
                to="/track-service"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Track Service Complaint Status</span>
              </Link>

              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 flex items-center space-x-2"
              >
                <KeyRound className="w-4 h-4 text-gold-400" />
                <span>Customer & Admin Portal Login</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft text-center transition-colors"
              >
                Get Free Consultation & Quote
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
