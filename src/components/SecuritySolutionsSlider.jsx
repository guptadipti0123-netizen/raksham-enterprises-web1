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
    tagline: 'IP66 • 4K Ultra HD • Night Vision',
    desc: 'Professional 4K CCTV camera installation, continuous recording, and quarterly AMC.',
    image: '/assets/banners/cctv-banner.jpg',
    alt: 'CCTV Surveillance Systems',
    icon: Camera,
    category: 'CCTV & Surveillance',
    link: '/services/cctv-installation',
    buttonText: 'Book Survey',
    badge: '4K Ultra HD'
  },
  {
    id: 'vdp-slide',
    title: 'Video Door Phone Intercom',
    tagline: 'Secure • Smart • Seamless',
    desc: '1080p HD camera with night vision, two-way audio, and mobile app remote unlock.',
    image: '/assets/banners/vdp-banner.jpg',
    alt: 'Video Door Phone Intercom Systems',
    icon: PhoneCall,
    category: 'Video Door Phone',
    link: '/services/video-door-phone',
    buttonText: 'Get VDP Quote',
    badge: 'Smart Touch'
  },
  {
    id: 'biometric-slide',
    title: 'Biometric Access Control',
    tagline: 'Secure • Accurate • Cloud Sync',
    desc: 'High-speed fingerprint & face recognition access terminals with automated cloud attendance.',
    image: '/assets/banners/biometric-banner.jpg',
    alt: 'Biometric Fingerprint Attendance & Access Control',
    icon: Fingerprint,
    category: 'Access Control',
    link: '/services/biometric-access-control',
    buttonText: 'Get Quote',
    badge: 'Cloud Sync'
  },
  {
    id: 'fire-safety-slide',
    title: 'Fire Safety & Alarm Systems',
    tagline: 'Reliable • Certified • 24/7',
    desc: 'Certified optical smoke detectors, heat sensors, alarm strobes, and safety audits.',
    image: '/assets/banners/fire-safety-banner.jpg',
    alt: 'Fire Safety & Smoke Alarm Systems',
    icon: Flame,
    category: 'Fire Safety',
    link: '/services/fire-alarm-systems',
    buttonText: 'Book Audit',
    badge: 'Certified'
  }
];

export default function SecuritySolutionsSlider({ onOpenQuote }) {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
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

        {/* 4-Card Compact Grid (Sleek, Compact, Proportionate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BANNER_SLIDES.map((slide) => {
            const Icon = slide.icon;
            return (
              <div
                key={slide.id}
                className="w-full bg-slate-800/90 rounded-2xl border border-slate-700 hover:border-gold-500/60 shadow-lg overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Compact Banner Image */}
                  <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-950 border-b border-slate-700/60">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Floating Top Category Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-950/85 backdrop-blur-md text-gold-400 text-[10px] font-bold border border-gold-500/30 flex items-center space-x-1">
                        <Icon className="w-3 h-3" />
                        <span>{slide.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-gold-500 text-slate-950 shadow-xs">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-1">
                      {slide.title}
                    </h3>
                    <p className="text-[11px] text-gold-400 font-semibold line-clamp-1">
                      {slide.tagline}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 pt-0.5">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 space-y-2 border-t border-slate-700/50 pt-3">
                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="w-full py-2 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <span>{slide.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] pt-0.5">
                    <Link
                      to={slide.link}
                      className="text-slate-300 hover:text-gold-400 font-semibold transition-colors"
                    >
                      Details →
                    </Link>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Raksham Enterprises, I am interested in ${slide.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-emerald-400 font-bold hover:underline"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
