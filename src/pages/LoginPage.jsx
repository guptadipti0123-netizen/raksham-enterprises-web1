import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  FileCheck, 
  ArrowRight, 
  Building, 
  KeyRound, 
  Check, 
  Phone, 
  Sparkles, 
  HelpCircle, 
  Search, 
  Wrench,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_CUSTOMERS } from '../data/websiteData';

export default function LoginPage() {
  const { loginAsCustomer, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'
  const [customerLoginType, setCustomerLoginType] = useState('mobile'); // 'mobile' or 'id'
  
  const [customerPhone, setCustomerPhone] = useState('9867890606');
  const [customerNo, setCustomerNo] = useState('ULV2601');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('4829');

  const [password, setPassword] = useState('admin123');
  const [adminUsername, setAdminUsername] = useState('admin@raksham.com');

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    if (customerLoginType === 'mobile') {
      loginAsCustomer(customerPhone);
    } else {
      loginAsCustomer(customerNo);
    }
    navigate('/customer/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    loginAsAdmin(password);
    navigate('/admin/dashboard');
  };

  const handleQuickDemoCustomer = (custNo) => {
    loginAsCustomer(custNo);
    navigate('/customer/dashboard');
  };

  const handleQuickDemoAdmin = () => {
    loginAsAdmin('admin123');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-soft-lg overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center mx-auto shadow-md relative z-10">
            <img 
              src="/assets/logo-icon.jpg" 
              alt="Raksham Enterprises Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white relative z-10">
            Raksham Service Portal
          </h1>
          <p className="text-xs text-gold-400 font-medium relative z-10">
            Customer Dashboard & Operations Management Desk
          </p>
        </div>

        {/* Main Role Tab Selector */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100/70 text-xs font-bold">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-3.5 text-center transition-all flex items-center justify-center space-x-2 border-b-2 ${
              activeTab === 'customer'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Building className="w-4 h-4 text-gold-600" />
            <span>Customer Portal Login</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-3.5 text-center transition-all flex items-center justify-center space-x-2 border-b-2 ${
              activeTab === 'admin'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <KeyRound className="w-4 h-4 text-slate-700" />
            <span>Admin / Operations Desk</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: CUSTOMER LOGIN */}
          {activeTab === 'customer' ? (
            <div className="space-y-5 text-xs animate-fadeIn">
              
              {/* Educational Explanation Box */}
              <div className="p-4 rounded-2xl bg-gold-50/80 border border-gold-200 text-slate-800 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-gold-900 text-xs">
                  <ShieldCheck className="w-4 h-4 text-gold-700 flex-shrink-0" />
                  <span>How Customer Login Works:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Housing Societies and AMC Clients can log in using either their <strong>Registered Mobile Number</strong> or their <strong>Customer ID (Site ID)</strong> to view CCTV health status, download verified service reports (PDF 1), and raise free priority tickets.
                </p>
              </div>

              {/* Sub-choice: Login by Mobile vs Login by Customer ID */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 font-bold text-[11px]">
                <button
                  type="button"
                  onClick={() => setCustomerLoginType('mobile')}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    customerLoginType === 'mobile'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>By Mobile Number</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomerLoginType('id')}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    customerLoginType === 'id'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-gold-600" />
                  <span>By Customer ID</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleCustomerLogin} className="space-y-4">
                {customerLoginType === 'mobile' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Registered Mobile Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9867890606 or 9820566789"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Enter the phone number given during CCTV installation / AMC registration.
                      </span>
                    </div>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="w-full py-2 rounded-xl bg-slate-100 hover:bg-gold-50 text-slate-800 hover:text-gold-900 font-bold border border-slate-300 flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                        <span>Send Quick Verification Code (OTP)</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 animate-fadeIn">
                        <div className="flex justify-between items-center text-[11px] text-emerald-900 font-semibold">
                          <span>Demo OTP sent to {customerPhone}:</span>
                          <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">4829</strong>
                        </div>
                        <input
                          type="text"
                          maxLength="4"
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value)}
                          placeholder="Enter 4-digit code"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-emerald-300 font-mono font-bold text-center tracking-widest text-sm"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Customer Number / Site ID *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. ULV2601"
                        value={customerNo}
                        onChange={(e) => setCustomerNo(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono font-black uppercase focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Found at the top-left of your official Raksham CCTV Service Report (PDF 1).
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Access Customer Dashboard →</span>
                </button>
              </form>

              {/* Quick 1-Click Demo Accounts */}
              <div className="pt-2 space-y-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick 1-Click Demo Customer:
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoCustomer('ULV2601')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-gold-50/80 border border-slate-200 hover:border-gold-300 transition-all flex items-center justify-between text-left"
                >
                  <div>
                    <strong className="text-slate-900 block text-xs">Silver Springs Residency (Chembur/Ulwe)</strong>
                    <span className="text-[10px] text-slate-500 font-mono">ID: ULV2601 • 14 Cameras AMC Active</span>
                  </div>
                  <span className="text-[11px] font-bold text-gold-700 bg-gold-100/60 px-2 py-0.5 rounded">
                    Login →
                  </span>
                </button>
              </div>

              {/* Non-AMC Customer Fast-Track Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800 text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
                  <span>Not an AMC Customer?</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  If you booked a one-time repair, you don't need a password! Track your live status directly using your Complaint ID (e.g. <span className="font-mono font-bold text-slate-700">NAC-20260825-001</span>):
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    to="/track-service"
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-gold-50 border border-slate-300 text-slate-800 font-bold text-[11px] flex items-center space-x-1 transition-colors"
                  >
                    <Search className="w-3 h-3 text-gold-600" />
                    <span>Track Service</span>
                  </Link>

                  <Link
                    to="/service-request/non-amc"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center space-x-1 transition-colors"
                  >
                    <Wrench className="w-3 h-3 text-gold-400" />
                    <span>Book ₹800 Repair</span>
                  </Link>
                </div>
              </div>

            </div>
          ) : (
            /* TAB 2: ADMIN LOGIN */
            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Operations & Service Desk Desk:</span>
                <p className="text-[11px] text-slate-500">
                  Manage inquiries, assign technicians (Rakesh Toraskar), track AMC contracts, and generate digital service reports (PDF 1).
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Staff Email / Username *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white font-semibold"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Default demo password: <strong>admin123</strong></span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
              >
                Access Admin Dashboard →
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemoAdmin}
                  className="w-full py-2.5 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300 transition-colors"
                >
                  ⚡ One-Click Demo Admin Login
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
