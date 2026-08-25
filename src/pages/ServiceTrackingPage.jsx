import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Phone, 
  UserCheck, 
  ShieldAlert, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  Sparkles,
  Check,
  X,
  Star,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

export default function ServiceTrackingPage() {
  const { complaintNo: routeComplaintNo } = useParams();
  const { getComplaintByNo, approveEstimate, convertToAmc, addFeedback, updateNonAmcRequest, updateServiceRequest } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(routeComplaintNo || 'NAC-20260825-001');
  const [complaint, setComplaint] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [approvalNotice, setApprovalNotice] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (routeComplaintNo) {
      setSearchQuery(routeComplaintNo);
      const res = getComplaintByNo(routeComplaintNo);
      setComplaint(res);
      setHasSearched(true);
    } else {
      const res = getComplaintByNo('NAC-20260825-001');
      setComplaint(res);
      setHasSearched(true);
    }
  }, [routeComplaintNo]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    const res = getComplaintByNo(searchQuery);
    setComplaint(res);
    setHasSearched(true);
  };

  const handleEstimateAction = (approved) => {
    if (!complaint?.complaintNo) return;
    approveEstimate(complaint.complaintNo, approved);
    setApprovalNotice(approved ? 'Estimate approved! Technician authorized to install spare parts.' : 'Estimate declined.');
    const updated = getComplaintByNo(complaint.complaintNo);
    setComplaint(updated);
    setTimeout(() => setApprovalNotice(null), 6000);
  };

  // 1-Click Convert to AMC Action
  const handleUpgradeToAmc = () => {
    if (!complaint) return;
    const newAmcCust = convertToAmc(complaint);
    alert(`🎉 Congratulations ${newAmcCust.name}! Your account has been upgraded to Raksham AMC Shield. Your Customer ID is ${newAmcCust.customerNo}. Redirecting to your Customer Portal...`);
    navigate('/customer/dashboard');
  };

  // Customer Confirmation & Sign-off
  const handleCustomerConfirm = () => {
    if (!complaint) return;
    if (complaint.isNonAmc) {
      updateNonAmcRequest(complaint.id, { status: 'Closed', customerConfirmed: true });
    } else {
      updateServiceRequest(complaint.id, { status: 'Complaint Closed', customerConfirmed: true });
    }
    const updated = getComplaintByNo(complaint.complaintNo || complaint.ticketNo);
    setComplaint(updated);
    setFeedbackSubmitted(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    addFeedback(complaint.complaintNo || complaint.ticketNo, feedbackRating, feedbackComment);
    alert('Thank you for your valuable 5-star review! Your feedback helps us maintain premium security standards.');
    setFeedbackComment('');
  };

  // 8 Sequential Stages
  const trackingStages = [
    { key: 'Request Received', label: 'Request Received', desc: 'Complaint registered in database' },
    { key: 'Customer Verified', label: 'Customer Verified', desc: 'Phone verification completed' },
    { key: 'Technician Assigned', label: 'Technician Assigned', desc: 'Technician assigned to complaint' },
    { key: 'Appointment Confirmed', label: 'Appointment Confirmed', desc: 'Visit time window scheduled' },
    { key: 'Technician On The Way', label: 'Technician Visit / On Way', desc: 'Field technician en route to site' },
    { key: 'In Progress', label: 'Diagnosis & In Progress', desc: 'System inspection & testing' },
    { key: 'Estimate Sent', label: 'Estimate / Approval', desc: 'Spare parts quotation & approval' },
    { key: 'Completed', label: 'Repair & Service Report', desc: 'Work finished & digital report issued' },
    { key: 'Closed', label: 'Customer Confirmed & Closed', desc: 'Signed off & warranty active' }
  ];

  const getStageIndex = (statusStr) => {
    if (!statusStr) return 0;
    const lower = statusStr.toLowerCase();
    if (lower.includes('closed')) return 8;
    if (lower.includes('completed') || lower.includes('resolved')) return 7;
    if (lower.includes('estimate') || lower.includes('approval')) return 6;
    if (lower.includes('progress') || lower.includes('diagnosis')) return 5;
    if (lower.includes('way') || lower.includes('visit')) return 4;
    if (lower.includes('confirmed') || lower.includes('scheduled')) return 3;
    if (lower.includes('assigned')) return 2;
    if (lower.includes('verified')) return 1;
    return 0;
  };

  const currentStageIdx = getStageIndex(complaint?.status);

  // WhatsApp Message Generator
  const waConfirmationText = `*Raksham Enterprises — Service Request Status*%0A%0A` +
    `🔖 *Complaint No:* ${encodeURIComponent(complaint?.complaintNo || complaint?.ticketNo || 'N/A')}%0A` +
    `👤 *Customer:* ${encodeURIComponent(complaint?.customerName || 'Customer')}%0A` +
    `📍 *Location:* ${encodeURIComponent(complaint?.location || 'Mumbai')}%0A` +
    `🔧 *Status:* ${encodeURIComponent(complaint?.status || 'Active')}%0A` +
    `👨‍🔧 *Technician:* ${encodeURIComponent(complaint?.technician || 'Rakesh Toraskar')}%0A` +
    `💳 *Visit Charge:* ${encodeURIComponent(complaint?.visitCharge ? '₹800 Fixed' : 'Free under AMC')}`;

  return (
    <div className="bg-white pt-28 pb-20 min-h-screen">
      
      {/* Header */}
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Live Service Dispatch & AMC Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Track Your <span className="text-gradient-gold">CCTV Service Request</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time status tracking, technician assignment, spare part approval, and AMC protection.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Complaint No (e.g. NAC-20260825-001 or SR-8842)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Track Service</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
            <span>Quick references:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('NAC-20260825-001');
                setComplaint(getComplaintByNo('NAC-20260825-001'));
              }}
              className="text-gold-700 hover:underline font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
            >
              NAC-20260825-001 (Non-AMC)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('SR-8842');
                setComplaint(getComplaintByNo('SR-8842'));
              }}
              className="text-gold-700 hover:underline font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
            >
              SR-8842 (AMC Society)
            </button>
          </div>
        </div>
      </section>

      {/* Main Tracking Details */}
      <section className="py-10 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          
          {approvalNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{approvalNotice}</span>
            </div>
          )}

          {hasSearched && complaint ? (
            <div className="space-y-6">
              
              {/* Ticket Overview Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        complaint.isNonAmc 
                          ? 'bg-amber-50 text-amber-800 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {complaint.serviceType || (complaint.isNonAmc ? 'NON-AMC PAID' : 'AMC PRIORITY')}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Logged: {complaint.createdDate || complaint.reportedDate}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {complaint.complaintNo || complaint.ticketNo}
                    </h2>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Current Status:</span>
                    <strong className="text-sm font-extrabold text-gold-700 block">
                      ● {complaint.status}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Customer Name:</span>
                    <strong className="text-slate-900">{complaint.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Location:</span>
                    <strong className="text-slate-900">{complaint.location || 'Ulwe / Mumbai'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Technician:</span>
                    <strong className="text-slate-900">{complaint.technician || 'Rakesh Toraskar'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Visit Charge:</span>
                    <strong className="text-emerald-700 font-bold">
                      {complaint.visitCharge ? `₹${complaint.visitCharge}/- Fixed` : '₹0 Free under AMC'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${waConfirmationText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Share on WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      <span>Call Tech: {complaint.technician || 'Rakesh'}</span>
                    </a>
                  </div>

                  {complaint.reportRef && (
                    <Link
                      to="/service-report"
                      className="text-xs font-bold text-gold-700 hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Verified Report (#{complaint.reportRef}) →</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* 8-Stage Visual Timeline */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Service Lifecycle Progression
                </h3>

                <div className="space-y-4">
                  {trackingStages.map((stage, idx) => {
                    const isCompleted = idx < currentStageIdx;
                    const isCurrent = idx === currentStageIdx;

                    return (
                      <div key={stage.key} className="flex items-start space-x-3.5 relative">
                        {idx !== trackingStages.length - 1 && (
                          <div className={`absolute left-3.5 top-7 w-0.5 h-7 ${
                            isCompleted ? 'bg-gold-500' : 'bg-slate-200'
                          }`} />
                        )}

                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all z-10 ${
                          isCompleted
                            ? 'bg-gold-500 text-white shadow-gold-soft'
                            : isCurrent
                            ? 'bg-slate-900 text-gold-400 ring-4 ring-gold-100 shadow-xs'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}>
                          {isCompleted ? '✓' : isCurrent ? '●' : '○'}
                        </div>

                        <div className="flex-1 pb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-bold ${
                              isCompleted ? 'text-slate-900' : isCurrent ? 'text-gold-700 text-sm' : 'text-slate-400'
                            }`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider text-gold-800 bg-gold-100 px-2 py-0.5 rounded-full animate-pulse">
                                Active Stage
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spare Part Estimate Approval Box */}
              {complaint.estimate && (
                <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-300 shadow-soft space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-amber-200 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        Technician Quotation
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        Spare Parts & Replacement Estimate
                      </h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      complaint.estimate.customerApprovalStatus === 'Approved by Customer'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-200 text-amber-900'
                    }`}>
                      {complaint.estimate.customerApprovalStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">
                    Our technician has diagnosed that your CCTV system requires the following replacement parts. Please approve to authorize installation.
                  </p>

                  <div className="border border-amber-200 rounded-xl overflow-hidden bg-white text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-amber-100/60 text-slate-700 font-bold border-b border-amber-200">
                        <tr>
                          <th className="p-2.5">Item Description</th>
                          <th className="p-2.5 text-center w-16">Qty</th>
                          <th className="p-2.5 text-right w-24">Rate</th>
                          <th className="p-2.5 text-right w-24">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100">
                        {complaint.estimate.items?.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-medium text-slate-900">{item.name}</td>
                            <td className="p-2.5 text-center font-mono">{item.qty}</td>
                            <td className="p-2.5 text-right font-mono">₹{item.rate}</td>
                            <td className="p-2.5 text-right font-mono font-bold">₹{item.amount}</td>
                          </tr>
                        ))}
                        <tr className="bg-amber-50/70 font-bold text-slate-900">
                          <td colSpan="3" className="p-2.5 text-right">Total Spare Parts Estimate:</td>
                          <td className="p-2.5 text-right font-mono text-sm text-amber-900 font-black">
                            ₹{complaint.estimate.totalEstimate}/-
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {complaint.estimate.customerApprovalStatus === 'Pending Approval' && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        onClick={() => handleEstimateAction(false)}
                        className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                      >
                        Decline Estimate
                      </button>
                      <button
                        onClick={() => handleEstimateAction(true)}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Estimate (Authorize ₹{complaint.estimate.totalEstimate})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ⭐ 1. AMC CONVERSION OFFER ENGINE (Non-AMC to AMC Upsell) */}
              {complaint.isNonAmc && !complaint.amcConverted && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-soft-lg space-y-5 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider block">Special AMC Conversion Offer</span>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          Upgrade to Raksham AMC Shield & Save ₹800 On Every Visit!
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                    Why pay ₹800 for every single breakdown? Protect your premises with a customized Raksham Annual Maintenance Contract (AMC). Enjoy <strong>4 quarterly preventive inspections, unlimited emergency breakdowns with ₹0 labor fees, and priority technician dispatch within 4 hours</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 relative z-10">
                    <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                      <span className="text-slate-400 text-[10px] block">Without AMC (One-Time Paid)</span>
                      <strong className="text-rose-400 block">₹800 per visit + extra labor fees</strong>
                      <p className="text-[11px] text-slate-400">Paid service queue & standard scheduling.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 space-y-1">
                      <span className="text-gold-400 text-[10px] block">With Raksham AMC Shield</span>
                      <strong className="text-gold-300 block">₹0 Breakdown Labor + 4 Routine Checks</strong>
                      <p className="text-[11px] text-slate-300">Dedicated Customer Portal & 4-Hour Priority SLA.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 relative z-10">
                    <button
                      onClick={handleUpgradeToAmc}
                      className="px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-2 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Upgrade to AMC & Generate Customer ID Now →</span>
                    </button>

                    <Link
                      to="/cctv-amc-mumbai"
                      className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 text-center transition-colors"
                    >
                      View All 3 AMC Packages & Calculator
                    </Link>
                  </div>
                </div>
              )}

              {/* ⭐ 2. CUSTOMER CONFIRMATION & 5-STAR FEEDBACK CARD */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Customer Confirmation & Service Sign-off
                  </h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    complaint.status.includes('Closed')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {complaint.status.includes('Closed') ? '✓ Sign-off Completed' : 'Pending Customer Review'}
                  </span>
                </div>

                {!complaint.status.includes('Closed') ? (
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-600">
                      Has the technician completed the on-site work and demonstrated live CCTV feeds to your satisfaction?
                    </p>
                    <button
                      onClick={handleCustomerConfirm}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs flex items-center space-x-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Work Completed & Close Ticket</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                    <p className="text-slate-600">
                      Thank you for confirming work completion! Please rate your service experience with technician {complaint.technician || 'Rakesh'}:
                    </p>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= feedbackRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                      <span className="font-bold text-slate-800 ml-2">{feedbackRating} / 5 Stars</span>
                    </div>

                    <textarea
                      rows="2"
                      placeholder="Write a brief comment (e.g. Prompt visit, quick lens cleaning and good explanation)..."
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-gold-500"
                    ></textarea>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>

            </div>
          ) : hasSearched ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Ticket Found with ID: "{searchQuery}"</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please verify your Complaint Number (e.g. NAC-20260825-001) or register a new service request below.
              </p>
              <div className="pt-2">
                <Link
                  to="/service-request"
                  className="px-5 py-2.5 rounded-xl bg-gold-500 text-white font-bold text-xs inline-block shadow-gold-soft"
                >
                  Book New Service Visit
                </Link>
              </div>
            </div>
          ) : null}

        </div>
      </section>

    </div>
  );
}
