import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  KeyRound, 
  User, 
  Lock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function LoginPage() {
  const { loginAsCustomer, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'
  const [identifier, setIdentifier] = useState('ULV2601');
  const [password, setPassword] = useState('admin123');
  const [adminEmail, setAdminEmail] = useState('admin@raksham.com');

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    loginAsCustomer(identifier || 'ULV2601');
    navigate('/customer/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    loginAsAdmin(password);
    navigate('/admin/dashboard');
  };

  const handleDemoCustomer = () => {
    loginAsCustomer('ULV2601');
    navigate('/customer/dashboard');
  };

  const handleDemoAdmin = () => {
    loginAsAdmin('admin123');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(217, 178, 86, 0.2) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative z-10 animate-fadeIn my-auto">
        
        {/* Compact Header */}
        <div className="bg-slate-950 text-white p-5 text-center space-y-1.5 border-b border-slate-800">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shadow-sm">
              <img 
                src="/assets/logo-icon.jpg" 
                alt="Raksham Enterprises" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-black tracking-wide text-white">
              <span className="text-gold-400">RAKSHAM</span> PORTAL
            </span>
          </Link>
          <p className="text-[11px] text-slate-400">
            Customer Dashboard & Operations Management
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-3 text-center transition-all flex items-center justify-center space-x-1.5 border-b-2 ${
              activeTab === 'customer'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-gold-600" />
            <span>Customer Login</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-3 text-center transition-all flex items-center justify-center space-x-1.5 border-b-2 ${
              activeTab === 'admin'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-700" />
            <span>Admin / Staff</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {activeTab === 'customer' ? (
            <form onSubmit={handleCustomerLogin} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number or Customer ID *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9867890606 or ULV2601"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Found on your CCTV service report or registered mobile number.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Access Customer Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDemoCustomer}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-gold-50 text-slate-800 hover:text-gold-900 text-[11px] font-bold border border-slate-200 transition-colors"
              >
                ⚡ 1-Click Demo Login (Silver Springs Residency)
              </button>

              <div className="pt-2 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500">
                  Non-AMC client? <Link to="/track-service" className="text-gold-700 font-bold hover:underline">Track Complaint</Link> or <Link to="/service-request/non-amc" className="text-gold-700 font-bold hover:underline">Book Repair</Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Staff Email *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Access Admin Operations</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>

              <button
                type="button"
                onClick={handleDemoAdmin}
                className="w-full py-2 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 text-[11px] font-bold border border-gold-300 transition-colors"
              >
                ⚡ 1-Click Demo Admin Login
              </button>
            </form>
          )}

        </div>

        {/* Back to Home Link */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-center">
          <Link to="/" className="text-[11px] font-bold text-slate-600 hover:text-gold-700 transition-colors">
            ← Back to Raksham Enterprises Home
          </Link>
        </div>

      </div>
    </div>
  );
}
