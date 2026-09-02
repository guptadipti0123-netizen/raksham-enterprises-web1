import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES, MUMBAI_LOCATIONS } from '../data/websiteData';
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
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

    // Prepare WhatsApp message
    const waText = `*New Website Inquiry - Raksham Enterprises*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Mobile:* ${encodeURIComponent(formData.mobile)}%0A` +
      `📧 *Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A` +
      `📍 *Location in Mumbai:* ${encodeURIComponent(formData.location || 'Mumbai')}%0A` +
      `🏢 *Property Type:* ${encodeURIComponent(formData.propertyType)}%0A` +
      `🔧 *Service Required:* ${encodeURIComponent(formData.serviceRequired)}%0A` +
      `💬 *Message:* ${encodeURIComponent(formData.message || 'Please provide quotation.')}`;

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${waText}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-obsidian-950 relative border-t border-slate-900">
      
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Schedule a <span className="text-gradient-gold">Free Site Assessment</span> or Request a Quote
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill out the form below or connect instantly on WhatsApp. Our certified security technician will contact you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 p-6 sm:p-8 border border-gold-500/30 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white">
                Contact <span className="text-gold-400">Raksham Enterprises</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Security System Solution Provider across Mumbai, Navi Mumbai & Thane.
              </p>

              <div className="space-y-4 pt-2">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-center space-x-4 p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 hover:border-gold-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Direct Inquiry & Helpline:</span>
                    <strong className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                      {COMPANY_INFO.phone}
                    </strong>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hello Raksham Enterprises, I would like to inquire about CCTV / security services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-400 block">Fast WhatsApp Chat:</span>
                    <strong className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      +91 98678 90606 (Instant Reply)
                    </strong>
                  </div>
                </a>

                {/* Email */}
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-3 text-gold-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-semibold text-slate-200">Official Email Addresses:</span>
                  </div>
                  <div className="pl-7 space-y-1 text-xs">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="block text-slate-300 hover:text-gold-400">
                      📧 {COMPANY_INFO.email}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="block text-slate-300 hover:text-gold-400">
                      📧 {COMPANY_INFO.supportEmail}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operating Schedule:</strong>
                    <span className="text-[11px] text-slate-400">{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form from PDF 2 */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 p-6 sm:p-8 border border-gold-500/40 shadow-2xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Thank You for Reaching Out!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your security inquiry has been generated and forwarded to our team on WhatsApp. Our technician will review your requirement and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-obsidian-800 text-gold-400 font-bold text-xs border border-gold-500/30 hover:bg-gold-500/20"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Siddhesh Purarkar"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        placeholder="e.g. +91 90291 14205"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. client@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    {/* Location in Mumbai */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Location in Mumbai / Navi Mumbai *</label>
                      <input
                        type="text"
                        name="location"
                        required
                        placeholder="e.g. Ulwe, Chembur, Ghatkopar, Andheri"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Required */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Service Required *</label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500"
                      >
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Premises / Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-500"
                      >
                        <option value="Residential Society">Residential Society / Apartment</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="Retail Shop / Mall">Retail Shop / Showroom</option>
                        <option value="Warehouse / Factory">Warehouse / Factory</option>
                        <option value="School / College">School / Educational Institute</option>
                        <option value="Hospital / Clinic">Hospital / Healthcare</option>
                        <option value="Individual Home / Villa">Individual Home / Villa</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Message / System Details</label>
                    <textarea
                      name="message"
                      rows="3"
                      placeholder="Describe your requirement (e.g. number of cameras, DVR issue, new society AMC)..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold-500 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit & WhatsApp Buttons from PDF 2 */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-gold-gradient text-obsidian-950 font-extrabold text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry (Fast Direct Dispatch)</span>
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Raksham Enterprises, I want to talk to a technician directly.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 border border-emerald-400/40"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-slate-500 text-center pt-1">
                    🔒 Your contact information is strictly confidential. No spam guaranteed.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
