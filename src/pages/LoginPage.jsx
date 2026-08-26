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
  CheckCircle2,
  Sparkles,
  UserPlus,
  MapPin
} from 'lucide-react';
import { COMPANY_INFO, MUMBAI_LOCATIONS } from '../data/websiteData';

// Smart Location & Zone-based Customer ID Generator (e.g. CHEE2601, GHAW2601, ULV2601)
export const generateSmartCustomerId = (location = 'Chembur', zone = 'East', seq = 1) => {
  let prefix = 'MUM';
  const locLower = (location || '').toLowerCase();
  
  if (locLower.includes('chembur')) prefix = 'CHE';
  else if (locLower.includes('ghatkopar')) prefix = 'GHA';
  else if (locLower.includes('andheri')) prefix = 'AND';
  else if (locLower.includes('sakinaka')) prefix = 'SAK';
  else if (locLower.includes('vikhroli')) prefix = 'VIK';
  else if (locLower.includes('kurla')) prefix = 'KUR';
  else if (locLower.includes('powai')) prefix = 'POW';
  else if (locLower.includes('mulund')) prefix = 'MUL';
  else if (locLower.includes('bhandup')) prefix = 'BHA';
  else if (locLower.includes('wadala')) prefix = 'WAD';
  else if (locLower.includes('govandi')) prefix = 'GOV';
  else if (locLower.includes('mankhurd')) prefix = 'MAN';
  else if (locLower.includes('ulwe')) prefix = 'ULV';
  else if (locLower.includes('navi') || locLower.includes('vashi') || locLower.includes('nerul')) prefix = 'NAV';
  else if (locLower.includes('thane')) prefix = 'THA';
  else if (locLower.includes('dadar')) prefix = 'DAD';
  else if (locLower.includes('bandra')) prefix = 'BAN';
  else prefix = (location.replace(/[^a-zA-Z]/g, '') || 'MUM').slice(0, 3).toUpperCase();

  let zoneChar = 'E';
  const zoneLower = (zone || '').toLowerCase();
  if (zoneLower.startsWith('w') || zoneLower.includes('west')) zoneChar = 'W';
  else if (zoneLower.startsWith('c') || zoneLower.includes('central') || zoneLower.includes('midc')) zoneChar = 'C';
  else zoneChar = 'E';

  const yearSeq = '26'; // Year 2026
  const seqNum = (seq || 1).toString().padStart(2, '0');

  return `${prefix}${zoneChar}${yearSeq}${seqNum}`;
};

export default function LoginPage() {
  const { loginAsCustomer, registerCustomer, loginAsAdmin, customers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If path is /register, start on register tab, otherwise customer login tab
  const [activeTab, setActiveTab] = useState(() => {
    return location.pathname === '/register' ? 'register' : 'customer';
  });

  // Login form states
  const [identifier, setIdentifier] = useState(() => location.state?.registeredId || location.state?.registeredPhone || '');
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Register form states (with smart location & East/West zone support)
  const [regData, setRegData] = useState({
    societyName: '',
    contactPerson: '',
    mobile: '',
    location: 'Chembur',
    zone: 'East',
    address: '',
    camerasCount: '8'
  });

  const [generatedIdSuccess, setGeneratedIdSuccess] = useState(null);

  // Sync tab if URL changes
  useEffect(() => {
    if (location.pathname === '/register') {
      setActiveTab('register');
    }
  }, [location.pathname]);

  // Handle Customer Login
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

  // Handle Admin Login
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

  // Handle Customer Self-Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regData.societyName?.trim() || !regData.mobile?.trim() || !regData.contactPerson?.trim()) {
      setErrorMessage('Please fill in Society Name, Contact Person and Mobile Number.');
      return;
    }

    setErrorMessage('');
    
    // Generate Customer ID & Save to Database
    const newCust = registerCustomer(regData);

    if (newCust && newCust.customerNo) {
      setGeneratedIdSuccess(newCust);
      setIdentifier(newCust.customerNo);
      setSuccessMessage(`Account Created Successfully! Your Customer ID is ${newCust.customerNo}.`);
      setActiveTab('customer');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 text-center space-y-1 relative">
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

        {/* 3-Tab Switcher */}
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setErrorMessage('');
            }}
            className={`py-3 text-center transition-all flex items-center justify-center space-x-1 border-b-2 ${
              activeTab === 'customer'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-gold-600" />
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-3 text-center transition-all flex items-center justify-center space-x-1 border-b-2 ${
              activeTab === 'register'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Register</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`py-3 text-center transition-all flex items-center justify-center space-x-1 border-b-2 ${
              activeTab === 'admin'
                ? 'bg-white text-slate-900 border-gold-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-700" />
            <span>Staff Desk</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Generated ID Success Notification */}
          {generatedIdSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Account Created Successfully!</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Your Permanent Customer ID:</span>
                  <span className="text-base font-black text-slate-900 font-mono">{generatedIdSuccess.customerNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Registered Mobile:</span>
                  <span className="text-xs font-bold text-slate-800">{generatedIdSuccess.contactPhone}</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-700">
                You can now log in below using either your <strong>Customer ID ({generatedIdSuccess.customerNo})</strong> or your <strong>Mobile Number</strong>.
              </p>
            </div>
          )}

          {successMessage && !generatedIdSuccess && (
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

          {/* TAB 1: CUSTOMER LOGIN */}
          {activeTab === 'customer' && (
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
                  Found on your CCTV service report or registered mobile number.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Login to Customer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                  }}
                  className="text-xs font-bold text-gold-800 hover:underline"
                >
                  New Client or Housing Society? Register Here →
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-gold-700 font-medium">
                  Need Help? Call Support
                </a>
                <Link to="/track-service" className="text-gold-700 font-bold hover:underline">
                  Track One-Time Repair →
                </Link>
              </div>
            </form>
          )}

          {/* TAB 2: NEW REGISTRATION */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div className="p-2.5 rounded-xl bg-gold-50 border border-gold-200 text-[11px] text-slate-700">
                Register your housing society or business site to generate your permanent <strong>Raksham Customer ID</strong>.
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Society / Business Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palms CHS or ABC Office"
                    value={regData.societyName}
                    onChange={(e) => setRegData({ ...regData, societyName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Contact Person *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Secretary Name"
                      value={regData.contactPerson}
                      onChange={(e) => setRegData({ ...regData, contactPerson: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200 12345"
                      value={regData.mobile}
                      onChange={(e) => setRegData({ ...regData, mobile: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Location in Mumbai *
                  </label>
                  <select
                    value={regData.location}
                    onChange={(e) => setRegData({ ...regData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white text-xs"
                  >
                    {MUMBAI_LOCATIONS.map(l => (
                      <option key={l.id} value={l.name}>{l.name} ({l.hub})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Zone / Side *
                  </label>
                  <select
                    value={regData.zone}
                    onChange={(e) => setRegData({ ...regData, zone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-gold-500 focus:bg-white text-xs"
                  >
                    <option value="East">East (E)</option>
                    <option value="West">West (W)</option>
                    <option value="Central">Central (C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Installed CCTV Cameras *
                </label>
                <select
                  value={regData.camerasCount}
                  onChange={(e) => setRegData({ ...regData, camerasCount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-gold-500 focus:bg-white text-xs"
                >
                  <option value="4">4 Cameras (Small Site)</option>
                  <option value="8">8 Cameras (Standard Complex)</option>
                  <option value="14">14 Cameras (Society Tower)</option>
                  <option value="16">16 Cameras (Large Society)</option>
                  <option value="32">32+ Cameras (Commercial Complex)</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Register & Generate My Customer ID →</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('customer');
                    setErrorMessage('');
                  }}
                  className="text-[11px] font-bold text-slate-600 hover:text-gold-700 hover:underline"
                >
                  Already have Customer ID? Login →
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: ADMIN / STAFF LOGIN */}
          {activeTab === 'admin' && (
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
            ← Return to Raksham Enterprises Home
          </Link>
        </div>

      </div>
    </div>
  );
}
