import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Wrench, Plus, CheckCircle2, Clock, AlertCircle, Send, MessageSquare, FileText, Check, Star } from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function CustomerServiceRequests() {
  const { activeCustomer, serviceRequests, addServiceRequest, updateServiceRequest, addFeedback } = useAuth();
  const customerRequests = serviceRequests.filter(r => r.customerNo === activeCustomer?.customerNo);

  const [isCreating, setIsCreating] = useState(false);
  const [issueType, setIssueType] = useState('Camera Video Loss / Black Screen');
  const [priority, setPriority] = useState('Emergency (Within 4 Hours AMC SLA)');
  const [description, setDescription] = useState('');
  const [successTicket, setSuccessTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter issue details.');
      return;
    }

    const created = addServiceRequest({
      issueType,
      priority,
      description
    });

    setIsCreating(false);
    setDescription('');
    setSuccessTicket(created);
    setTimeout(() => setSuccessTicket(null), 10000);
  };

  const handleCustomerSignoff = (reqId) => {
    updateServiceRequest(reqId, {
      status: 'Complaint Closed',
      customerConfirmed: true
    });
    alert('Thank you! Complaint successfully verified and marked as Closed.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase border border-emerald-200">
            ● AMC Priority Service Desk (₹0 Labor)
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-1">Service Requests & Breakdown Tickets</h2>
          <p className="text-xs text-slate-500">
            Contract: {activeCustomer?.name} ({activeCustomer?.customerNo}) • All breakdown labor covered under AMC.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : '+ Raise AMC Complaint'}</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successTicket && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <strong className="text-sm">Complaint Registered Successfully! Ticket No: {successTicket.ticketNo}</strong>
          </div>
          <p className="text-[11px] text-emerald-800">
            Assigned to Lead Technician <strong>Rakesh Toraskar</strong> under your AMC Priority SLA.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`*AMC Complaint Registered - Raksham Enterprises*%0A%0A` +
                `🔖 *Ticket No:* ${successTicket.ticketNo}%0A` +
                `🏢 *Society:* ${activeCustomer?.name}%0A` +
                `👤 *ID:* ${activeCustomer?.customerNo}%0A` +
                `🔧 *Issue:* ${successTicket.issueType}%0A` +
                `⚡ *Priority:* High (AMC Free Labor)`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send WhatsApp Confirmation</span>
            </a>

            <Link
              to={`/track-service/${successTicket.ticketNo}`}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center space-x-1"
            >
              <span>Track Live Stage →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Create New Request Modal / Drawer */}
      {isCreating && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gold-300 shadow-soft-lg space-y-4 animate-fadeIn">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Raise New AMC Service Complaint (Priority Ticket)
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Issue Category *</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                >
                  <option value="Camera Video Loss / Black Screen">Camera Video Loss / Black Screen</option>
                  <option value="Blurry Lens / Cleaning Request">Blurry Lens / Cleaning Request</option>
                  <option value="DVR / NVR Beeping / Storage Issue">DVR / NVR Beeping / Storage Issue</option>
                  <option value="Mobile Live View Not Connecting">Mobile Live View Not Connecting</option>
                  <option value="Power Supply / SMPS Failure">Power Supply / SMPS Failure</option>
                  <option value="Quarterly Routine AMC Inspection">Quarterly Routine AMC Inspection</option>
                  <option value="Other Breakdown">Other Breakdown</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">AMC Response Priority *</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white font-semibold"
                >
                  <option value="Emergency (Within 4 Hours AMC SLA)">Emergency (Within 4 Hours AMC SLA)</option>
                  <option value="Same Day Visit (Within 12 Hours)">Same Day Visit (Within 12 Hours)</option>
                  <option value="Scheduled Maintenance (Preferred Date)">Scheduled Maintenance (Preferred Date)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Problem Description / Camera Location *</label>
              <textarea
                rows="3"
                required
                placeholder="e.g. Camera 4 near main gate is showing black screen since yesterday night..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
              ></textarea>
            </div>

            <div className="p-3 bg-gold-50 border border-gold-200 rounded-xl text-gold-900 text-[11px]">
              ✓ As an active AMC customer ({activeCustomer?.customerNo}), this technician visit and labor diagnosis are <strong>100% Free (₹0)</strong>.
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-gold-soft flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Priority Complaint</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Service Requests List */}
      <div className="space-y-4">
        {customerRequests.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-black text-gold-800 bg-gold-50 border border-gold-300 px-2.5 py-0.5 rounded">
                  {req.ticketNo}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{req.issueType}</h3>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block self-start sm:self-auto ${
                req.status.includes('Closed') || req.status.includes('Completed')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                ● {req.status}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              "{req.description}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="block text-slate-400">Reported Date:</span>
                <strong className="text-slate-800">{req.reportedDate}</strong>
              </div>
              <div>
                <span className="block text-slate-400">Assigned Technician:</span>
                <strong className="text-slate-800">{req.technician || 'Rakesh Toraskar'}</strong>
              </div>
              <div>
                <span className="block text-slate-400">SLA Response:</span>
                <strong className="text-emerald-700 font-bold">Within 4 Hours (Free AMC)</strong>
              </div>
              {req.reportRef && (
                <div>
                  <span className="block text-slate-400">Linked Report:</span>
                  <Link to="/customer/service-reports" className="text-gold-700 font-mono font-bold hover:underline">
                    #{req.reportRef} (PDF 1)
                  </Link>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/track-service/${req.ticketNo}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                >
                  Live Dispatch Tracker
                </Link>

                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`*AMC Complaint Update Request*%0A%0A` +
                    `🔖 *Ticket No:* ${req.ticketNo}%0A` +
                    `🏢 *Society:* ${activeCustomer?.name}%0A` +
                    `👤 *Customer No:* ${activeCustomer?.customerNo}%0A` +
                    `🔧 *Issue:* ${req.issueType}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Helpdesk</span>
                </a>
              </div>

              {/* Customer Confirmation Button if Completed */}
              {(req.status === 'Completed' || req.status === 'Complaint Resolved') && !req.customerConfirmed && (
                <button
                  onClick={() => handleCustomerSignoff(req.id)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Work & Sign-Off</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
