import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  KeyRound, 
  User, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

export default function LoginPage() {
  const { loginAsCustomer, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'
  const [identifier, setIdentifier] = useState(() => location.state?.registeredId || location.state?.registeredPhone || '');
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(() => {
    if (location.state?.registeredId) {
      return `Account registered successfully! Your Customer ID is ${location.state.registeredId}. Please login below.`;
    }
    return '';
  });

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your mobile number or Customer ID');
      return;
    }
    setErrorMessage('');
    loginAsCustomer(identifier.trim());
    navigate('/customer/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminEmail.trim() || !password.trim()) {
      setErrorMessage('Please enter staff email and password');
      return;
    }
    setErrorMessage('');
    loginAsAdmin(password.trim());
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 text-center space-y-2 relative">
          <Link to="/" className="inline-flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
              <img 
                src="/assets/logo-icon.jpg" 
                alt="Raksham Enterprises" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-base font-black tracking-tight text-white block leading-none">
                <span className="text-gold-400">RAKSHAM</span> ENTERPRISES
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                Client & Operations Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setErrorMessage('');
            }}
            className={`py-3.5 text-center transition-all flex items-center justify-center space-x-1.5 border-b-2 ${
              activeTab === 'customer'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-gold-600" />
            <span>Customer Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`py-3.5 text-center transition-all flex items-center justify-center space-x-1.5 border-b-2 ${
              activeTab === 'admin'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-700" />
            <span>Staff / Operations</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center animate-fadeIn">
              {errorMessage}
            </div>
          )}

          {activeTab === 'customer' ? (
            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Registered Mobile Number or Customer ID *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9867890606 or ULV2601"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Found on your CCTV service report (PDF 1) or registered mobile number.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Login to Customer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="p-2.5 rounded-xl bg-gold-50/70 border border-gold-200 text-center">
                  <span className="text-slate-600">New Client or Society? </span>
                  <Link to="/register" className="text-gold-800 font-bold hover:underline">
                    Register Account & Get Customer ID →
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-gold-700 font-medium">
                    Need Help? Call Support
                  </a>
                  <Link to="/track-service" className="text-gold-700 font-bold hover:underline">
                    Track One-Time Repair →
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Staff Email / Username *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. staff@raksham.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Login to Operations Desk</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-slate-400">
                  Authorized personnel and field technicians only.
                </span>
              </div>
            </form>
          )}

        </div>

        {/* Footer Link */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
          <Link to="/" className="text-xs font-bold text-slate-600 hover:text-gold-700 transition-colors">
            ← Return to Raksham Enterprises Website
          </Link>
        </div>

      </div>
    </div>
  );
}
