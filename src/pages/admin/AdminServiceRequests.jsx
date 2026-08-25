import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Phone, 
  MapPin, 
  FileText, 
  Plus, 
  Trash2, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  AlertCircle,
  Zap
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function AdminServiceRequests() {
  const { 
    serviceRequests, 
    updateServiceRequest, 
    nonAmcRequests, 
    updateNonAmcRequest,
    convertToAmc 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('non-amc'); // 'non-amc' or 'amc'
  const [editingEstimateId, setEditingEstimateId] = useState(null);
  
  // Estimate Form State
  const [estimateItems, setEstimateItems] = useState([
    { name: '4-Channel CCTV Power Supply (12V 5A SMPS)', qty: 1, rate: 650, amount: 650 },
    { name: 'BNC & DC Connectors Pair', qty: 2, rate: 100, amount: 200 }
  ]);

  const nonAmcStatuses = [
    'Request Received',
    'Customer Verified',
    'Technician Assigned',
    'Appointment Confirmed',
    'Technician On The Way',
    'In Progress',
    'Estimate Sent',
    'Completed',
    'Closed'
  ];

  const amcStatuses = [
    'Pending Assignment',
    'Technician Dispatched',
    'In Progress',
    'Completed'
  ];

  const handleNonAmcStatusChange = (id, newStatus) => {
    updateNonAmcRequest(id, { status: newStatus });
  };

  const handleNonAmcTechAssign = (id, techName) => {
    updateNonAmcRequest(id, { technician: techName, assignedDate: new Date().toISOString().split('T')[0] });
  };

  const handleOpenEstimateModal = (req) => {
    setEditingEstimateId(req.id);
    if (req.estimate?.items && req.estimate.items.length > 0) {
      setEstimateItems(req.estimate.items);
    } else {
      setEstimateItems([
        { name: '', qty: 1, rate: 0, amount: 0 }
      ]);
    }
  };

  const handleAddEstimateItem = () => {
    setEstimateItems([...estimateItems, { name: '', qty: 1, rate: 0, amount: 0 }]);
  };

  const handleRemoveEstimateItem = (idx) => {
    setEstimateItems(estimateItems.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx, field, value) => {
    const updated = [...estimateItems];
    updated[idx][field] = value;
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(updated[idx].qty) || 0;
      const rate = parseFloat(updated[idx].rate) || 0;
      updated[idx].amount = qty * rate;
    }
    setEstimateItems(updated);
  };

  const handleSaveEstimate = (id) => {
    const total = estimateItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    updateNonAmcRequest(id, {
      estimateRequired: true,
      status: 'Estimate Sent',
      estimate: {
        items: estimateItems,
        totalEstimate: total,
        customerApprovalStatus: 'Pending Approval',
        approvalTimestamp: null
      }
    });
    setEditingEstimateId(null);
    alert('Spare parts estimate updated and sent to customer tracking view!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Service Requests & Dispatch Queues</h2>
          <p className="text-xs text-slate-500">
            Manage AMC contract routine visits and Non-AMC one-time paid repairs with spare parts estimation.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('non-amc')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'non-amc'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-gold-600" />
            <span>Non-AMC Paid Queue ({nonAmcRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('amc')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'amc'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>AMC Priority Queue ({serviceRequests.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NON-AMC PAID SERVICE QUEUE */}
      {activeTab === 'non-amc' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex justify-between items-center">
            <span>
              ⚡ <strong>Non-AMC Paid Service Protocol:</strong> ₹800 fixed on-site visit charge. Any spare parts require technician estimate and customer approval before installation.
            </span>
          </div>

          {nonAmcRequests.map((req) => (
            <div
              key={req.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs"
            >
              {/* Top Row: Complaint No & Stage Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-black text-xs text-gold-800 bg-gold-50 border border-gold-300 px-2.5 py-0.5 rounded">
                    {req.complaintNo}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{req.customerName}</h3>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {req.customerType} • {req.location}
                  </span>
                </div>

                {/* Stage Progression Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400 font-semibold">Stage:</span>
                  <select
                    value={req.status}
                    onChange={(e) => handleNonAmcStatusChange(req.id, e.target.value)}
                    className="px-3 py-1 rounded-xl text-xs font-bold border border-gold-300 bg-gold-50 text-slate-900 focus:outline-none focus:bg-white"
                  >
                    {nonAmcStatuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Contact & Problem Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Mobile / WhatsApp:</span>
                  <strong className="text-slate-900">{req.mobile}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Site Address:</span>
                  <span className="text-slate-800">{req.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Preferred Timing:</span>
                  <span className="text-slate-800 font-semibold">{req.preferredDate} ({req.preferredTime.split(' ')[0]})</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] mb-1">Problems Selected:</span>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {req.problems?.map(p => (
                    <span key={p} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-800">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 italic bg-white p-2 rounded border border-slate-100">"{req.problemDesc}"</p>
              </div>

              {/* Technician Assignment & Estimate Action */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 items-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Technician:</span>
                  <select
                    value={req.technician || 'Rakesh Toraskar'}
                    onChange={(e) => handleNonAmcTechAssign(req.id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 font-bold text-slate-800 text-xs w-full mt-0.5"
                  >
                    <option value="Rakesh Toraskar">Rakesh Toraskar (Lead Technician)</option>
                    <option value="Sameer Deshmukh">Sameer Deshmukh (Field Tech)</option>
                    <option value="Amit Jadhav">Amit Jadhav (IP Specialist)</option>
                  </select>
                </div>

                <div className="text-center">
                  {req.estimate ? (
                    <div className="text-left bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <span className="text-[10px] text-amber-800 block">Spare Part Estimate: <strong>₹{req.estimate.totalEstimate}/-</strong></span>
                      <span className={`text-[10px] font-bold ${
                        req.estimate.customerApprovalStatus === 'Approved by Customer'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}>
                        ● {req.estimate.customerApprovalStatus}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenEstimateModal(req)}
                      className="px-3.5 py-1.5 rounded-lg bg-gold-50 hover:bg-gold-100 text-gold-900 font-bold border border-gold-300 transition-colors"
                    >
                      + Create Spare Part Estimate
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Link
                    to={`/track-service/${req.complaintNo}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                  >
                    Live Tracker
                  </Link>

                  <Link
                    to="/admin/create-report"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold"
                  >
                    Report (PDF 1)
                  </Link>

                  {!req.amcConverted ? (
                    <button
                      onClick={() => {
                        const newAmc = convertToAmc(req);
                        alert(`🎉 Customer ${req.customerName} successfully converted to AMC Customer! Assigned Customer ID: ${newAmc.customerNo}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-gold-soft flex items-center space-x-1 transition-all"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Convert to AMC</span>
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                      ✓ AMC Active ({req.convertedCustomerNo})
                    </span>
                  )}
                </div>
              </div>

              {/* Estimate Edit Drawer */}
              {editingEstimateId === req.id && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-3 mt-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900">Create / Edit Spare Parts Quotation for {req.complaintNo}</h4>
                    <button
                      onClick={handleAddEstimateItem}
                      className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 font-bold text-[11px] flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Part</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {estimateItems.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <input
                            type="text"
                            placeholder="Part Name (e.g. 12V 5A Power Supply SMPS)"
                            value={item.name}
                            onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.qty}
                            onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            placeholder="Rate (₹)"
                            value={item.rate}
                            onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveEstimateItem(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setEditingEstimateId(null)}
                      className="px-3 py-1.5 rounded bg-slate-200 text-slate-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEstimate(req.id)}
                      className="px-4 py-1.5 rounded bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-gold-soft"
                    >
                      Save & Send for Customer Approval
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AMC PRIORITY QUEUE */}
      {activeTab === 'amc' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            🛡️ <strong>AMC Priority Queue:</strong> Routine maintenance checkups and emergency breakdown calls for contracted societies (₹0 labor charges).
          </div>

          {serviceRequests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                    {req.ticketNo}
                  </span>
                  <strong className="text-sm font-bold text-slate-900">{req.customerName}</strong>
                  <span className="text-slate-400">({req.customerNo})</span>
                </div>

                {/* Status Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400 font-semibold">Status:</span>
                  <select
                    value={req.status}
                    onChange={(e) => updateServiceRequest(req.id, { status: e.target.value })}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                      req.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {amcStatuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px]">Issue Reported:</span>
                <p className="font-bold text-slate-800">{req.issueType}</p>
                <p className="text-slate-600 italic">"{req.description}"</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 items-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Reported Date:</span>
                  <span className="font-semibold text-slate-800">{req.reportedDate}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Technician:</span>
                  <select
                    value={req.technician || 'Rakesh Toraskar'}
                    onChange={(e) => updateServiceRequest(req.id, { technician: e.target.value })}
                    className="px-2 py-1 rounded bg-white border border-slate-300 font-semibold text-slate-800 text-xs w-full mt-0.5"
                  >
                    <option value="Rakesh Toraskar">Rakesh Toraskar (Senior Tech)</option>
                    <option value="Sameer Deshmukh">Sameer Deshmukh (Field Tech)</option>
                    <option value="Amit Jadhav">Amit Jadhav (IP Specialist)</option>
                  </select>
                </div>

                <div className="text-right">
                  {req.status === 'Completed' ? (
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-end space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Report #{req.reportRef || 'RE-20826-2'}</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-bold text-[11px]">
                      ⚡ On-Site Visit Active
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
