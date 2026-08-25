import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MUMBAI_LOCATIONS, COMPANY_INFO } from '../data/websiteData';

export default function RegisterPage() {
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    societyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    location: 'Chembur',
    address: '',
    camerasCount: '8',
    amcRequired: true,
    amcPlan: 'Comprehensive Shield AMC'
  });

  const [registeredCust, setRegisteredCust] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.societyName || !formData.mobile || !formData.contactPerson) {
      alert('Please fill in Society Name, Contact Person and Mobile Number.');
      return;
    }

    const newCust = registerCustomer(formData);
    setRegisteredCust(newCust);
  };

  const handleProceedToDashboard = () => {
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-28 pb-16 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
        
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
                Customer & AMC Registration
              </span>
            </div>
          </Link>
          <h1 className="text-lg font-bold text-white pt-1">
            New Customer Account Registration
          </h1>
          <p className="text-xs text-gold-400 font-medium">
            Register your Housing Society, Office, or Commercial Site
          </p>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 sm:p-8">
          
          {registeredCust ? (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Registration Successful
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Welcome, {registeredCust.name}!
                </h2>
                <p className="text-xs text-slate-600">
                  Your official Raksham Customer Account and Site ID have been generated.
                </p>
              </div>

              {/* Generated Customer ID Badge */}
              <div className="p-5 rounded-2xl bg-gold-50/80 border-2 border-gold-400 space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Your Permanent Customer ID:</span>
                  <span className="text-lg font-mono font-black text-gold-900 bg-white px-3 py-1 rounded-lg border border-gold-300 shadow-2xs">
                    {registeredCust.customerNo}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 pt-1 space-y-1 border-t border-gold-200">
                  <p>• <strong>Registered Mobile:</strong> {registeredCust.contactPhone}</p>
                  <p>• <strong>Site Location:</strong> {registeredCust.address}</p>
                  <p>• <strong>Login Note:</strong> You can log in anytime using your <strong>Mobile Number</strong> or <strong>Customer ID ({registeredCust.customerNo})</strong>.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/login', { state: { registeredId: registeredCust.customerNo, registeredPhone: registeredCust.contactPhone } })}
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Proceed to Login Page →</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="p-3 rounded-xl bg-gold-50 border border-gold-200 text-slate-700 space-y-1">
                <span className="font-bold text-gold-900 block">Create Your Customer Account:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Register to view digital service reports (PDF 1), manage your CCTV AMC, track camera inventory, and raise priority complaints.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Society / Business / Building Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palms CHS or ABC Corporate Office"
                    value={formData.societyName}
                    onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil (Secretary)"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Registered Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200 12345"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Location in Mumbai *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    {MUMBAI_LOCATIONS.map(l => (
                      <option key={l.id} value={l.name}>{l.name} ({l.hub})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Installed CCTV Cameras *
                  </label>
                  <select
                    value={formData.camerasCount}
                    onChange={(e) => setFormData({ ...formData, camerasCount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    <option value="4">4 Cameras (Small Society / Office)</option>
                    <option value="8">8 Cameras (Standard Complex)</option>
                    <option value="16">16 Cameras (Large Gated Society)</option>
                    <option value="32">32+ Cameras (Commercial Hub)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Premises Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plot 42, Sector 19, Chembur, Mumbai"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Register & Generate Customer ID</span>
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500">
                  Already registered? <Link to="/login" className="text-gold-700 font-bold hover:underline">Login with Mobile or ID →</Link>
                </p>
              </div>

            </form>
          )}

        </div>

        {/* Footer Link */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
          <Link to="/" className="text-xs font-bold text-slate-600 hover:text-gold-700 transition-colors">
            ← Return to Raksham Enterprises Home
          </Link>
        </div>

      </div>
    </div>
  );
}
