import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  PhoneCall, 
  Fingerprint, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  MessageSquare
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
    tagline: 'Secure • Smart • Seamless Access',
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
    title: 'Biometric Access Control',
    tagline: 'Secure • Accurate • Cloud Sync',
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
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Security Hardware Range</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Featured Security Systems & Hardware
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our complete range of certified surveillance, door intercoms, biometric access, and fire alarm systems.
          </p>
        </div>

        {/* 2x2 Equal Symmetrical Grid (Equal Width, Equal Height, No Partial Cutoffs) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BANNER_SLIDES.map((slide) => {
            const Icon = slide.icon;
            return (
              <div
                key={slide.id}
                className="w-full bg-slate-800/90 rounded-3xl border-2 border-slate-700/80 hover:border-gold-500/60 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
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
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {slide.title}
                      </h3>
                      <span className="text-xs text-gold-400 font-semibold truncate">
                        {slide.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                {/* Footer CTAs (Aligned Symmetrically) */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/50 pt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="px-4 sm:px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 cursor-pointer transition-all"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      to={slide.link}
                      className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-600 transition-colors"
                    >
                      <span>View Info →</span>
                    </Link>
                  </div>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Raksham Enterprises, I am interested in ${slide.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-bold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
