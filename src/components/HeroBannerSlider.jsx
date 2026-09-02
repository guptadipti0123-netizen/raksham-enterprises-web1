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
      {/* 1. FULL SCREEN / FULL WIDTH BANNER STAGE (100% CLEAR ORIGINAL IMAGE) */}
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
              {/* Clean, 100% Vibrant 4K Image - NO OVERLAY WASH */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Left-Aligned Floating High-Contrast Card */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                  
                  <div className="max-w-lg lg:max-w-xl bg-white/98 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-3 sm:space-y-4 pointer-events-auto">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-400 text-gold-900 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-gold-700" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 leading-tight tracking-tight">
                      {slide.title}
                    </h1>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm md:text-base font-black text-gold-800">
                      {slide.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-slate-800 font-semibold leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {slide.description}
                    </p>

                    {/* 4 Feature Bullet Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 pb-1">
                      {slide.features.map((feature, fIdx) => (
                        <div 
                          key={fIdx}
                          className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/90 text-[11px] sm:text-xs text-slate-950 font-bold shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
                      <button
                        type="button"
                        onClick={onOpenQuote}
                        className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs sm:text-sm shadow-gold-soft transition-all transform hover:-translate-y-0.5 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>{slide.primaryCta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link
                        to={slide.secondaryLink}
                        className="px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition-colors inline-flex items-center space-x-1"
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

        {/* Bottom-Right Corner Unified Navigation Controls */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-slate-300 shadow-xl text-slate-800 pointer-events-auto">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-100 hover:bg-gold-500 text-slate-800 hover:text-slate-950 transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Indicator Dots & Counter */}
          <div className="flex items-center space-x-1.5 px-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide 
                    ? 'w-7 bg-gold-500 shadow-2xs' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
            <span className="text-[11px] font-mono font-bold text-slate-700 ml-1.5">
              0{currentSlide + 1}/0{SLIDES.length}
            </span>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-100 hover:bg-gold-500 text-slate-800 hover:text-slate-950 transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>

      {/* 2. FULL WIDTH BOTTOM TRUST HIGHLIGHTS BAR */}
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
