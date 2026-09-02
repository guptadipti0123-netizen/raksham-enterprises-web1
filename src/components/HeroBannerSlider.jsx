import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const SLIDES = [
  {
    id: 'cctv',
    badge: '4K Ultra HD Security',
    title: 'Surveillance You Can Trust',
    tagline: 'IP66 Weatherproof • 4K Ultra HD • Night Vision',
    description: 'Professional CCTV installation and preventive AMC across Mumbai. Crystal clear resolution, night vision, and instant mobile live monitoring.',
    features: [
      '4K Ultra HD & Color Night Vision',
      'Remote Mobile Live Stream & Playback',
      'AI Motion & Intrusion Alerts',
      'Society & Commercial AMC Shield'
    ],
    image: '/assets/banners/cctv-banner.jpg',
    alt: 'CCTV Surveillance & Security Cameras',
    primaryCta: 'Book Free Site Survey',
    secondaryCta: 'CCTV AMC Packages',
    secondaryLink: '/cctv-amc-mumbai'
  },
  {
    id: 'vdp',
    badge: 'Smart Touchscreen Intercom',
    title: 'Video Door Phone Intercom',
    tagline: 'Secure • Smart • Seamless Access',
    description: 'High-definition touchscreen indoor monitors with wide-angle night camera, crystal-clear two-way audio, and mobile app door unlock.',
    features: [
      '1080p HD Wide-Angle Camera',
      'Two-Way Noise-Free Audio',
      'Mobile App Remote Door Unlock',
      'Multi-Apartment Intercom Setup'
    ],
    image: '/assets/banners/vdp-banner.jpg',
    alt: 'Smart Video Door Phone Intercom Systems',
    primaryCta: 'Get VDP Installation Quote',
    secondaryCta: 'Intercom Solutions',
    secondaryLink: '/services/intercom-systems'
  },
  {
    id: 'biometric',
    badge: 'Biometric Access & Attendance',
    title: 'Biometric Access Control',
    tagline: 'Secure • Accurate • Cloud Sync',
    description: 'High-speed biometric fingerprint and facial recognition access control terminals with automated attendance reports and EM locks.',
    features: [
      'Fast Biometric & Face Recognition',
      'Cloud Attendance Sync & Reports',
      'Magnetic EM Lock Integration',
      'Office & Housing Society Security'
    ],
    image: '/assets/banners/biometric-banner.jpg',
    alt: 'Biometric Fingerprint Attendance & Access Control',
    primaryCta: 'Get Biometric Quote',
    secondaryCta: 'Access Control Details',
    secondaryLink: '/services/biometric-access-control'
  },
  {
    id: 'fire-safety',
    badge: 'Certified Fire Protection',
    title: 'Fire Safety & Alarm Systems',
    tagline: 'Reliable • Certified • 24/7 Protection',
    description: 'Government compliant fire alarm panels, optical smoke detectors, heat sensors, high-decibel alarm strobes, and certified safety audits.',
    features: [
      'Optical Smoke & Heat Detectors',
      'High-Decibel Strobe Sounders',
      'Fire Safety Audit & Certification',
      '24/7 Rapid Emergency Response'
    ],
    image: '/assets/banners/fire-safety-banner.jpg',
    alt: 'Fire Safety & Alarm Systems',
    primaryCta: 'Book Fire Safety Audit',
    secondaryCta: 'Maintenance Plans',
    secondaryLink: '/services/fire-alarm-systems'
  }
];

export default function HeroBannerSlider({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [currentSlide, isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    }
    if (touchStartX - touchEndX < -50) {
      prevSlide();
    }
  };

  const current = SLIDES[currentSlide];

  return (
    <section 
      id="hero-banner-section"
      className="relative w-full pt-16 sm:pt-20 lg:pt-24 bg-white text-slate-900 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. FULL SCREEN / FULL WIDTH BANNER STAGE (BRIGHT & CLEAN WHITE THEME) */}
      <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] lg:h-[88vh] min-h-[520px] max-h-[920px] bg-slate-100 overflow-hidden group">
        
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Clean, Bright 4K Image (No Dark Filters, Natural Lighting) */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center bg-slate-100"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Soft White Gradient for crystal-clear readability without black shade */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent pointer-events-none" />

              {/* Foreground Crisp Typography */}
              <div className="absolute inset-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                  
                  <div className="max-w-2xl space-y-3 sm:space-y-4 pt-4 sm:pt-0">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300/80 backdrop-blur-md text-gold-800 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">
                      {slide.title}
                    </h1>

                    {/* Tagline */}
                    <p className="text-xs sm:text-base md:text-lg font-extrabold text-gold-700">
                      {slide.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-slate-700 font-medium leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* 4 Feature Bullet Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pb-2 max-w-lg">
                      {slide.features.map((feature, fIdx) => (
                        <div 
                          key={fIdx}
                          className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 text-[11px] sm:text-xs text-slate-800 font-semibold shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={onOpenQuote}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs sm:text-sm shadow-gold-soft transition-all transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{slide.primaryCta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link
                        to={slide.secondaryLink}
                        className="px-5 sm:px-6 py-3 sm:py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm border border-slate-300 backdrop-blur-md shadow-sm transition-colors inline-flex items-center space-x-1.5"
                      >
                        <span>{slide.secondaryCta}</span>
                      </Link>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          );
        })}

        {/* Left Navigation Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-gold-500 text-slate-800 hover:text-slate-950 border border-slate-300/90 hover:border-gold-400 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-gold-500 text-slate-800 hover:text-slate-950 border border-slate-300/90 hover:border-gold-400 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Slide Indicator Dots Floating Bottom Center */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-300 shadow-md text-slate-700">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide 
                  ? 'w-8 bg-gold-500 shadow-2xs' 
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
          <span className="text-[11px] font-mono font-bold text-slate-700 ml-2">
            0{currentSlide + 1}/0{SLIDES.length}
          </span>
        </div>

      </div>

      {/* 2. FULL WIDTH BOTTOM TRUST HIGHLIGHTS BAR (BRIGHT WHITE/SLATE THEME) */}
      <div className="w-full bg-slate-50 border-t border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-[11px] sm:text-xs">15+ Years Experience</p>
              <p className="text-[10px] text-slate-500">1,200+ Installations Done</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-[11px] sm:text-xs">24×7 Rapid Support</p>
              <p className="text-[10px] text-slate-500">Emergency On-Site Visits</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-[11px] sm:text-xs">Mumbai Coverage</p>
              <p className="text-[10px] text-slate-500">14 Local Dispatch Hubs</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-[11px] sm:text-xs">CCTV AMC Shield</p>
              <p className="text-[10px] text-slate-500">₹0 Breakdown Labor</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
