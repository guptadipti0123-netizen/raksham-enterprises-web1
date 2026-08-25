import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  ShieldCheck, 
  HardDrive, 
  LogOut, 
  Building, 
  User, 
  Phone,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function CustomerLayout() {
  const { activeCustomer, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'Service Reports', path: '/customer/service-reports', icon: FileText },
    { name: 'Service Requests', path: '/customer/service-requests', icon: Wrench },
    { name: 'AMC Contract', path: '/customer/amc', icon: ShieldCheck },
    { name: 'Installed Equipment', path: '/customer/equipment', icon: HardDrive },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-soft-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
              <img 
                src="/assets/logo-icon.jpg" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gold-400 uppercase font-bold tracking-wider">Customer Portal</span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {activeCustomer?.name || 'Silver Springs Residency'}
              </h1>
              <p className="text-xs text-slate-300">
                Customer ID: <span className="font-mono text-gold-400 font-bold">{activeCustomer?.customerNo || 'ULV2601'}</span> • {activeCustomer?.address}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Portal Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-soft p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gold-500 text-white shadow-gold-soft'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100 p-2 text-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Support Desk</span>
              <p className="font-bold text-slate-900">{COMPANY_INFO.name}</p>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-gold-700 font-bold block hover:underline">
                📞 {COMPANY_INFO.phone}
              </a>
              <span className="text-[11px] text-slate-500 block">Technician: Rakesh Toraskar</span>
            </div>
          </div>

          {/* Main Portal View */}
          <div className="lg:col-span-9">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}
