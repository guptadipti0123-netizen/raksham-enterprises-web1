import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  NON_AMC_PROBLEM_OPTIONS, 
  CUSTOMER_TYPES, 
  PREFERRED_TIME_SLOTS, 
  NON_AMC_PRICING_INFO,
  COMPANY_INFO,
  MUMBAI_LOCATIONS 
} from '../data/websiteData';
import { 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Printer, 
  Sparkles,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export default function NonAmcBookingPage() {
  const { addNonAmcRequest } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [createdComplaint, setCreatedComplaint] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    location: 'Chembur',
    customerType: 'Residential',
    problems: ['Camera No Video'],
    problemDesc: '',
    uploadedFileName: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    preferredTime: 'Morning (9:00 AM - 1:00 PM)',
    termsAccepted: true
  });

  const handleProblemToggle = (label) => {
    if (formData.problems.includes(label)) {
      if (formData.problems.length > 1) {
        setFormData({ ...formData, problems: formData.problems.filter(p => p !== label) });
      }
    } else {
      setFormData({ ...formData, problems: [...formData.problems, label] });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, uploadedFileName: file.name });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.customerName || !formData.mobile || !formData.address) {
        alert('Please fill all required customer and address fields.');
        return;
      }
      if (!formData.whatsapp) {
        setFormData(prev => ({ ...prev, whatsapp: prev.mobile }));
      }
      setCurrentStep(2);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (formData.problems.length === 0) {
        alert('Please select at least one CCTV problem category.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (!formData.problemDesc) {
        alert('Please describe your CCTV problem in a few words.');
        return;
      }
      setCurrentStep(4);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please agree to the ₹800 visit charge terms to proceed.');
      return;
    }

    const newComplaint = addNonAmcRequest(formData);
    setCreatedComplaint(newComplaint);
    setCurrentStep(5);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="bg-white pt-28 pb-20 min-h-screen">
      
      {/* Header */}
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Wrench className="w-4 h-4 text-gold-600" />
            <span>Non-AMC Paid Service Intake</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Book CCTV Service & Repair <span className="text-gradient-gold">(Non-AMC)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Fixed ₹800 on-site technician visit fee. Instant automated complaint registration.
          </p>
        </div>
      </section>

      {/* 4-Step Progress Indicator (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold-500 transition-all duration-300 z-0" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />

            {[
              { step: 1, label: "Customer" },
              { step: 2, label: "Problem" },
              { step: 3, label: "Schedule" },
              { step: 4, label: "Review & Pay" }
            ].map((st) => (
              <div key={st.step} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep >= st.step 
                      ? 'bg-gold-500 text-white shadow-gold-soft ring-4 ring-gold-100' 
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {st.step}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 mt-1 hidden sm:block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Wizard Form Body */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* STEP 1: CUSTOMER DETAILS */}
          {currentStep === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 1: Customer Details & Site Location</h2>
                <p className="text-xs text-slate-500">Provide your contact details so our technician can reach your site.</p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Customer / Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Mehta / Krishna Enterprises"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Customer Type *</label>
                    <select
                      value={formData.customerType}
                      onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white font-semibold"
                    >
                      {CUSTOMER_TYPES.map(ct => (
                        <option key={ct} value={ct}>{ct}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Number (For Call) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98205 66789"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (For Ticket Updates)</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98205 66789"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. client@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Area / Location *</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white font-semibold"
                    >
                      {MUMBAI_LOCATIONS.map(l => (
                        <option key={l.id} value={l.name}>{l.name} ({l.hub})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Site / Premises Address *</label>
                  <textarea
                    rows="2"
                    required
                    placeholder="e.g. Flat 402, Royal Palms, Tilak Nagar, Chembur East, Mumbai 400089"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <Link to="/service-request" className="text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Hub</span>
                  </Link>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all"
                  >
                    <span>Next: Select CCTV Problem →</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: CCTV PROBLEM SELECTION */}
          {currentStep === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 2: What service do you need?</h2>
                <p className="text-xs text-slate-500">Select all applicable problems observed with your CCTV system.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {NON_AMC_PROBLEM_OPTIONS.map((item) => {
                  const isChecked = formData.problems.includes(item.label);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleProblemToggle(item.label)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                        isChecked 
                          ? 'bg-gold-50/80 border-gold-500 shadow-xs' 
                          : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border text-xs font-bold ${
                        isChecked ? 'bg-gold-500 text-white border-gold-500' : 'bg-white border-slate-300'
                      }`}>
                        {isChecked ? '✓' : ''}
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-xs">{item.label}</strong>
                        <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all"
                >
                  <span>Next: Problem Description & Slot →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROBLEM DESCRIPTION & VISIT PREFERENCE */}
          {currentStep === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 3: Problem Description & Preferred Timing</h2>
                <p className="text-xs text-slate-500">Provide specific observations and choose a convenient visit window.</p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Describe Your Problem *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="e.g. 2 cameras in parking area showing black video, DVR makes beeping sound every 5 minutes..."
                    value={formData.problemDesc}
                    onChange={(e) => setFormData({ ...formData, problemDesc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                  ></textarea>
                </div>

                {/* Upload Photo / Video Simulation */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Upload Photo / Video (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50/70 hover:bg-gold-50/30 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-1.5">
                      <Upload className="w-5 h-5 text-gold-600" />
                      <span className="text-xs font-bold text-slate-800">
                        {formData.uploadedFileName ? formData.uploadedFileName : "Click to attach photo of CCTV screen / DVR fault"}
                      </span>
                      <span className="text-[10px] text-slate-400">Supports JPG, PNG, MP4 up to 25MB</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Preferred Visit Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Preferred Time Window *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                      >
                        {PREFERRED_TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all"
                  >
                    <span>Next: Service Charge & Review →</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: SERVICE CHARGE INFORMATION & CONFIRMATION */}
          {currentStep === 4 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 4: Service Charge Information & Confirmation</h2>
                <p className="text-xs text-slate-500">Review ticket summary and service visit pricing.</p>
              </div>

              {/* Service Charge Card */}
              <div className="p-5 rounded-2xl bg-gold-50 border border-gold-300 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gold-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800">Fixed Rate</span>
                    <h3 className="text-base font-bold text-slate-900">Non-AMC CCTV Service Visit Charge</h3>
                  </div>
                  <span className="text-2xl font-black text-slate-900">₹800/-</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Policy:</strong> Spare parts and replacement items will be charged separately. Major/extended work will be carried out only after customer approval of the technician's estimate.
                </p>
              </div>

              {/* Booking Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="text-slate-500">Customer:</span> <strong className="text-slate-900">{formData.customerName}</strong></p>
                  <p><span className="text-slate-500">Phone:</span> <strong className="text-slate-900">{formData.mobile}</strong></p>
                  <p><span className="text-slate-500">Location:</span> <span className="text-slate-800">{formData.location}</span></p>
                  <p><span className="text-slate-500">Preferred Slot:</span> <span className="text-slate-800">{formData.preferredDate} ({formData.preferredTime.split(' ')[0]})</span></p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block mb-1">Selected Problems:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.problems.map(p => (
                      <span key={p} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-800">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-start space-x-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-gold-600 focus:ring-gold-500"
                />
                <span>
                  I agree to the <strong>₹800/- Non-AMC visit charge</strong> payable at technician visit. Any required spare parts will be quoted separately for my approval.
                </span>
              </label>

              <div className="pt-4 flex justify-between items-center border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Service Request →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER CONFIRMATION SCREEN (Exact reproduction of Section 7 in prompt) */}
          {currentStep === 5 && createdComplaint && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-300 shadow-soft-lg space-y-6 text-slate-900 animate-fadeIn">
              
              {/* Top Banner */}
              <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  ✓ SERVICE REQUEST REGISTERED
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Complaint No: <span className="font-mono text-gold-700">{createdComplaint.complaintNo}</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Your Non-AMC CCTV service ticket is now active in Raksham Enterprises dispatch queue.
                </p>
              </div>

              {/* Summary Receipt Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 font-sans">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Customer Name:</span>
                    <strong className="text-slate-900 text-sm">{createdComplaint.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Site Location:</span>
                    <strong className="text-slate-900">{createdComplaint.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Mobile Contact:</span>
                    <strong className="text-slate-900">{createdComplaint.mobile}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Scheduled Slot:</span>
                    <strong className="text-slate-900">{createdComplaint.preferredDate} ({createdComplaint.preferredTime.split(' ')[0]})</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Service Type:</span>
                    <span className="font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded text-[11px]">NON-AMC (Paid)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Visit Charge:</span>
                    <strong className="text-emerald-800 text-sm font-black">₹800 + Spare Parts</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block text-[10px] mb-1">Issue Reported:</span>
                  <span className="text-slate-800 font-semibold">{createdComplaint.problems?.join(', ')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  Our support team will contact you shortly on <strong>{createdComplaint.mobile}</strong> for technician arrival confirmation.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  to={`/track-service/${createdComplaint.complaintNo}`}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Track Service Status</span>
                </Link>

                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Hello Raksham Enterprises, I registered Non-AMC Service Complaint No: ${createdComplaint.complaintNo} for ${createdComplaint.customerName} (${createdComplaint.location}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Receipt</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center flex items-center justify-center space-x-1.5 border border-slate-200 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Receipt</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
