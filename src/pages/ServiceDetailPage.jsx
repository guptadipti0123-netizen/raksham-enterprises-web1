import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES, COMPANY_INFO, NON_AMC_PRICING_INFO } from '../data/websiteData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  Sparkles, 
  Check, 
  FileCheck,
  Building2,
  Clock,
  Wrench,
  HelpCircle,
  Award,
  ChevronDown,
  Layers,
  Zap
} from 'lucide-react';
import IconRenderer from '../components/IconRenderer';

export default function ServiceDetailPage({ onOpenQuote }) {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = SERVICES.filter(s => s.id !== id);

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Breadcrumb & Hero Header */}
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-gold-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-gold-700">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-semibold">{service.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700 flex-shrink-0 shadow-2xs">
                <IconRenderer name={service.icon} className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                    Service #{service.code} • Mumbai Coverage
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
                  {service.heroTitle || service.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {service.tagline || service.shortDesc}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                to="/service-request"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
              >
                <Wrench className="w-4 h-4 text-gold-400" />
                <span>Book Service / Repair</span>
              </Link>
              <button
                onClick={onOpenQuote}
                className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all"
              >
                Book Free Site Survey
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Main Article Content */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* 1. Overview & Service Scope */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Overview & Engineering Scope
                  </h2>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Highlights Bar */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. What We Offer / Key Inclusions */}
              {service.offers && service.offers.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      What We Offer — Key Inclusions & Capabilities
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.offers.map((offer, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-gold-300 transition-colors flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-lg bg-gold-50 text-gold-800 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-xs font-semibold text-slate-800 leading-snug">{offer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Benefits & Advantages */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Key Benefits of Raksham's {service.title}
                    </h3>
                  </div>

                  <div className="p-6 rounded-2xl bg-gold-50/50 border border-gold-200 space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800">
                        <Check className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Who Needs This Service */}
              {service.whoNeeds && service.whoNeeds.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Ideal Applications & Industries
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.whoNeeds.map((sector, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3 text-xs text-slate-800 font-medium">
                        <Building2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span>{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Execution Process */}
              {service.process && service.process.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      5-Step Installation & Service Process
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center space-x-3 text-xs text-slate-800 font-medium shadow-2xs">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                          {idx + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Hardware Brands & Quality Assurance */}
              {service.brands && service.brands.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-2 text-gold-800 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>OEM Brands & Hardware Warranty</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We deploy only 100% original, brand-certified security hardware with standard 1 to 3-year manufacturer replacement warranty. Supported brands:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.brands.map((brand, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. FAQs Accordion */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                          className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 hover:text-gold-700 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-gold-600' : ''}`} />
                        </button>
                        {openFaq === idx && (
                          <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Bottom In-Page Consultation & Booking CTA */}
              <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xl font-bold">Schedule an On-Site Assessment for {service.title}</h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Our certified surveillance engineer will inspect your premises, assess cable paths, and provide a transparent itemized quotation with zero hidden charges.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={onOpenQuote}
                    className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft transition-all"
                  >
                    Book Free Site Survey
                  </button>
                  <Link
                    to="/service-request"
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center space-x-1.5 transition-colors"
                  >
                    <Wrench className="w-3.5 h-3.5 text-gold-400" />
                    <span>Raise Breakdown Repair</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Inquiry Widget */}
              <div className="p-6 rounded-2xl bg-white border-2 border-gold-300 shadow-soft space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800 bg-gold-50 px-2 py-0.5 rounded">
                    Quick Consultation
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">Request {service.title} Quote</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Response within 15 minutes across Mumbai.</p>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={onOpenQuote}
                    className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft text-center transition-all"
                  >
                    Request Itemized Quotation →
                  </button>

                  <Link
                    to="/service-request/non-amc"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-all"
                  >
                    Book ₹800 On-Site Repair →
                  </Link>
                </div>
              </div>

              {/* All 12 Security Services Directory */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    All 12 Security Services
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Directory</span>
                </div>

                <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isCurrent = s.id === id;
                    return (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs font-semibold ${
                          isCurrent
                            ? 'bg-gold-500 text-white border-gold-500 shadow-gold-soft font-bold'
                            : 'bg-white hover:bg-gold-50 text-slate-700 hover:text-gold-800 border-slate-200/80 hover:border-gold-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className={`text-[10px] font-mono ${isCurrent ? 'text-white/80' : 'text-slate-400'}`}>
                            {s.code}
                          </span>
                          <span className="truncate">{s.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Service Report Verification Widget (PDF 1) */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center space-x-2 text-gold-700 text-xs font-bold">
                  <FileCheck className="w-4 h-4" />
                  <span>Official Job Card Verification</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Verify Digital Service Report</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Verify your official Raksham CCTV inspection sheet (matching PDF 1 report format).
                </p>
                <Link
                  to="/service-report"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-gold-50 text-slate-800 hover:text-gold-900 border border-slate-200 font-bold text-xs text-center block transition-colors"
                >
                  Verify Service Report →
                </Link>
              </div>

              {/* Support & Direct Line */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-800 flex items-center justify-center mx-auto">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Direct Security Helpline</h4>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="block text-sm font-black text-slate-900 hover:text-gold-700 transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
                <span className="text-[10px] text-slate-500 block">Monday to Sunday: 8:00 AM - 9:00 PM</span>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
