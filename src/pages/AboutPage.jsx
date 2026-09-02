import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SECTORS, WHY_CHOOSE_US, SERVICE_PROCESS } from '../data/websiteData';
import { ShieldCheck, CheckCircle2, ArrowRight, Award, Building, Users } from 'lucide-react';
import IconRenderer from '../components/IconRenderer';

export default function AboutPage({ onOpenQuote }) {
  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Page Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            About <span className="text-gradient-gold">Raksham Enterprises</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Your Trusted Security System & Surveillance Partner in Mumbai for over 15+ years.
          </p>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Story */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Delivering Reliable Surveillance & Electronic Security Across Mumbai
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Raksham Enterprises is a dedicated security system solution provider based in Mumbai, Maharashtra. We specialize in end-to-end electronic security systems—from initial architectural site assessment, cable layout design, and hardware installation to comprehensive maintenance (AMC) and 24/7 technical support.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need a 4-camera setup for an apartment or an enterprise 64-camera IP surveillance network for a cooperative housing society or industrial warehouse, our certified technicians ensure flawless installation, zero blind spots, and dependable recordings.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-extrabold text-slate-900">15+</p>
                  <p className="text-xs text-slate-500 mt-1">Years Experience</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-extrabold text-gold-600">500+</p>
                  <p className="text-xs text-slate-500 mt-1">Projects Completed</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-extrabold text-slate-900">250+</p>
                  <p className="text-xs text-slate-500 mt-1">Active AMCs</p>
                </div>
              </div>
            </div>

            {/* Right Brand Box */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-5">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                <img 
                  src="/assets/logo-full.jpg" 
                  alt="Raksham Enterprises Logo" 
                  className="h-14 w-auto object-contain rounded bg-white p-1"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">RAKSHAM ENTERPRISES</h3>
                  <p className="text-xs text-gold-700 font-semibold">Security System Solution Provider</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Authorized Hardware:</strong> Hikvision, CP Plus, Dahua, Seagate SkyHawk & WD Purple.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Comprehensive Warranty:</strong> Manufacturer warranty on all parts + labor warranty on installation.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Professional Reporting:</strong> Digital inspection sheets & customer verification on every visit.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all"
                >
                  Request Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sectors We Protect Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Sectors & Industries We Protect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tailored security installations designed for specific structural and compliance needs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SECTORS.map((sector) => (
              <div
                key={sector.name}
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-gold-300 hover:shadow-soft transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center mb-3">
                  <IconRenderer name={sector.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{sector.name}</h3>
                <p className="text-xs text-slate-500 leading-normal">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Raksham (6 Pillars from PDF 2) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Choose Raksham Enterprises?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-gold-300 hover:shadow-soft transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center mb-3">
                  <IconRenderer name={item.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Service Process Roadmap */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our 5-Step Service Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICE_PROCESS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
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

          <div className="mt-12 text-center">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs sm:text-sm shadow-gold-soft transition-all"
            >
              Start Step 01: Contact Our Experts
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
