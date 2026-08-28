import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES, FAQS } from '../data/websiteData';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  HelpCircle 
} from 'lucide-react';

export default function ContactPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    serviceRequired: 'CCTV Installation',
    propertyType: 'Residential Society',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }

    const waText = `*New Website Contact - Raksham Enterprises*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Mobile:* ${encodeURIComponent(formData.mobile)}%0A` +
      `📧 *Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A` +
      `📍 *Location:* ${encodeURIComponent(formData.location || 'Mumbai')}%0A` +
      `🏢 *Property Type:* ${encodeURIComponent(formData.propertyType)}%0A` +
      `🔧 *Service:* ${encodeURIComponent(formData.serviceRequired)}%0A` +
      `💬 *Message:* ${encodeURIComponent(formData.message || 'Please provide quotation.')}`;

    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${waText}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Mail className="w-4 h-4 text-gold-600" />
            <span>Direct Communication</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Contact <span className="text-gradient-gold">Raksham Enterprises</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Schedule a free on-site survey or get in touch with our security engineers across Mumbai.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-soft space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reach Us Directly</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Quick assistance for inquiries and emergency repairs.</p>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Phone */}
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-gold-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Helpline / Direct Call:</span>
                      <strong className="text-slate-900 text-sm font-bold">{COMPANY_INFO.phone}</strong>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Raksham Enterprises, I want to inquire about security services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-emerald-700 block text-[11px]">WhatsApp Support (Instant Reply):</span>
                      <strong className="text-emerald-900 text-sm font-bold">+91 98678 90606</strong>
                    </div>
                  </a>

                  {/* Emails */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-slate-500 block text-[11px]">Email Addresses:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-800 hover:text-gold-700 font-semibold block">
                      {COMPANY_INFO.email}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-slate-800 hover:text-gold-700 font-semibold block">
                      {COMPANY_INFO.supportEmail}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Working Hours:</span>
                      <span className="text-slate-800 font-semibold">{COMPANY_INFO.workingHours}</span>
                    </div>
                  </div>

                  {/* Location & Google Maps */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-slate-500 block text-[11px]">Head Office & Service Areas:</span>
                      <span className="text-slate-800 font-semibold block">Mumbai, Navi Mumbai, Thane & MMR, Maharashtra</span>
                      <a 
                        href={COMPANY_INFO.googleMapsUrl || "https://maps.app.goo.gl/vh4YBiiS1bh3CJ3P7?g_st=awb"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-gold-700 hover:text-gold-800 font-bold text-xs hover:underline pt-0.5"
                      >
                        <span>View on Google Maps & Reviews ↗</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-soft-lg">
                
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Your inquiry has been forwarded on WhatsApp. Our engineer will contact you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Siddhesh Purarkar"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          placeholder="e.g. +91 90291 14205"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. client@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Location in Mumbai *</label>
                        <input
                          type="text"
                          name="location"
                          required
                          placeholder="e.g. Ulwe, Ghatkopar, Andheri"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Service Required *</label>
                        <select
                          name="serviceRequired"
                          value={formData.serviceRequired}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                        >
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Property Type</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                        >
                          <option value="Residential Society">Residential Society / Complex</option>
                          <option value="Corporate Office">Corporate Office</option>
                          <option value="Retail Shop / Mall">Retail Shop / Showroom</option>
                          <option value="Warehouse / Factory">Warehouse / Factory</option>
                          <option value="School / College">School / College</option>
                          <option value="Hospital / Clinic">Hospital / Healthcare</option>
                          <option value="Individual Home">Individual Home / Apartment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Message / Requirements</label>
                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Please describe your requirements (number of cameras, AMC inquiry, etc.)..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </button>

                      <a
                        href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Raksham Enterprises, I want to discuss a new security requirement.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded FAQs Accordion Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Clear answers regarding CCTV installation costs, AMC contracts, warranty, and technician visits in Mumbai.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all border overflow-hidden ${
                    isOpen
                      ? 'bg-white border-gold-400 shadow-soft'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-2.5">
                      <span className="text-gold-700 font-mono text-xs font-black">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <div className={`p-1.5 rounded-lg transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-gold-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      <p className="pt-2">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
