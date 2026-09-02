import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Camera, 
  PhoneCall, 
  Fingerprint, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

const BANNER_SLIDES = [
  {
    id: 'cctv-slide',
    title: 'Surveillance You Can Trust',
    tagline: 'IP66 Weatherproof • 4K Ultra HD • Night Vision',
    desc: 'Professional 4K CCTV camera installation, continuous recording, mobile live viewing, and quarterly preventive AMC for housing societies and commercial complexes in Mumbai.',
    image: '/assets/banners/cctv-banner.jpg',
    alt: 'CCTV Surveillance Systems',
    icon: Camera,
    category: 'CCTV & Surveillance',
    link: '/services/cctv-installation',
    buttonText: 'Book CCTV Survey',
    badge: '4K Ultra HD'
  },
  {
    id: 'vdp-slide',
    title: 'Video Door Phone Intercom',
    tagline: 'Secure • Smart • Seamless',
    desc: '1080p HD camera with night vision, crystal-clear two-way audio communication, mobile app remote door unlocking, and weatherproof multi-apartment intercom setups.',
    image: '/assets/banners/vdp-banner.jpg',
    alt: 'Video Door Phone Intercom Systems',
    icon: PhoneCall,
    category: 'Video Door Phones',
    link: '/services/video-door-phone',
    buttonText: 'Get VDP Quote',
    badge: 'Smart Touchscreen'
  },
  {
    id: 'biometric-slide',
    title: 'Biometric Fingerprint Attendance',
    tagline: 'Secure • Accurate • Reliable',
    desc: 'High-speed biometric fingerprint and facial recognition access control terminals with cloud attendance sync and magnetic EM lock integration for corporate offices & societies.',
    image: '/assets/banners/biometric-banner.jpg',
    alt: 'Biometric Fingerprint Attendance & Access Control',
    icon: Fingerprint,
    category: 'Access Control',
    link: '/services/biometric-access-control',
    buttonText: 'Get Biometric Quote',
    badge: 'Cloud Sync'
  },
  {
    id: 'fire-safety-slide',
    title: 'Fire Safety & Alarm Systems',
    tagline: 'Reliable • Certified • 24/7 Protection',
    desc: 'Government safety compliant fire alarm panels, optical smoke detectors, heat sensors, high-decibel alarm strobes, and certified scheduled maintenance audits across Mumbai.',
    image: '/assets/banners/fire-safety-banner.jpg',
    alt: 'Fire Safety & Smoke Alarm Systems',
    icon: Flame,
    category: 'Fire Safety',
    link: '/services/fire-alarm-systems',
    buttonText: 'Book Safety Audit',
    badge: 'Certified Protection'
  }
];

export default function SecuritySolutionsSlider({ onOpenQuote }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const newIdx = Math.round(scrollLeft / (clientWidth * 0.85 || 1));
      setActiveIdx(Math.min(newIdx, BANNER_SLIDES.length - 1));
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 350);
    }
  };

  const scrollToSlide = (idx) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveIdx(idx);
      setTimeout(checkScrollButtons, 350);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Raksham Security Hardware Range</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Featured Security <span className="text-gradient-gold">Solutions & Systems</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Explore our complete range of certified surveillance, door intercoms, biometric access, and fire alarm systems.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous Slide"
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                canScrollLeft 
                  ? 'bg-slate-800 border-slate-700 text-white hover:bg-gold-500 hover:text-slate-950 hover:border-gold-400 cursor-pointer shadow-md' 
                  : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next Slide"
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                canScrollRight 
                  ? 'bg-slate-800 border-slate-700 text-white hover:bg-gold-500 hover:text-slate-950 hover:border-gold-400 cursor-pointer shadow-md' 
                  : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Sliding Track of Banners */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex space-x-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BANNER_SLIDES.map((slide, idx) => {
            const Icon = slide.icon;
            return (
              <div
                key={slide.id}
                className="w-[90vw] sm:w-[580px] md:w-[680px] lg:w-[720px] flex-shrink-0 bg-slate-800/90 rounded-3xl border-2 border-slate-700/80 hover:border-gold-500/60 shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 snap-start"
              >
                <div>
                  {/* Banner Image Container */}
                  <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-950 border-b border-slate-700/60">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Floating Top Category Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-gold-400 text-xs font-bold border border-gold-500/30 flex items-center space-x-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{slide.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-gold-500 text-slate-950 shadow-md">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {slide.title}
                      </h3>
                      <span className="text-xs text-gold-400 font-semibold">
                        {slide.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/50 pt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 cursor-pointer transition-all"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      to={slide.link}
                      className="px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-600 transition-colors"
                    >
                      <span>View Service Info →</span>
                    </Link>
                  </div>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Raksham Enterprises, I am interested in ${slide.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-bold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Indicator Buttons */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {BANNER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx 
                  ? 'w-8 bg-gold-400 shadow-gold-glow' 
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
