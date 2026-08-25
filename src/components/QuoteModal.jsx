import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES } from '../data/websiteData';
import { X, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: 'CCTV Installation',
    propertyType: 'Residential Society',
    cameraCount: '8-16 Cameras',
    requirement: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill your name and phone number.');
      return;
    }

    const waText = `*Quick Quote Request - Raksham Enterprises*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `📍 *Location in Mumbai:* ${encodeURIComponent(formData.location || 'Mumbai')}%0A` +
      `🏢 *Property:* ${encodeURIComponent(formData.propertyType)}%0A` +
      `🔧 *Service:* ${encodeURIComponent(formData.service)}%0A` +
      `📷 *Cameras/Scale:* ${encodeURIComponent(formData.cameraCount)}%0A` +
      `💬 *Details:* ${encodeURIComponent(formData.requirement || 'Please provide quotation.')}`;

    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${waText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Quotation Request Received!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              We have opened your request on WhatsApp. A senior surveillance technician will contact you with an itemized proposal shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-gold-700 font-bold uppercase tracking-wider">Free Consultation & Survey</span>
                <h3 className="text-xl font-bold text-slate-900">Get Instant CCTV Quote</h3>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Serving Mumbai, Navi Mumbai & Thane. Guaranteed genuine products & competitive pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rakesh Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98678 90606"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Location in Mumbai *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghatkopar, Ulwe, Powai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    <option value="Residential Society">Residential Society</option>
                    <option value="Home / Apartment">Home / Apartment</option>
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="Retail Shop">Retail Shop</option>
                    <option value="Warehouse / Factory">Warehouse / Factory</option>
                    <option value="School / Hospital">School / Hospital</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Service Type</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Approx. Camera Count</label>
                  <select
                    value={formData.cameraCount}
                    onChange={(e) => setFormData({ ...formData, cameraCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    <option value="1-4 Cameras">1-4 Cameras (Small)</option>
                    <option value="8-16 Cameras">8-16 Cameras (Mid)</option>
                    <option value="16-32 Cameras">16-32 Cameras (Large)</option>
                    <option value="32+ Cameras">32+ Cameras (Enterprise)</option>
                    <option value="Repair / Service Only">Repair / Service Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Additional Requirements</label>
                <textarea
                  rows="2"
                  placeholder="Describe any specific requirements (Hikvision/CP Plus, night vision, AMC)..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp Quotation Request</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
