import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  Wrench, 
  FileCheck, 
  PlusCircle, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  PhoneCall,
  Bell,
  CheckCheck,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function AdminLayout() {
  const { logout, enquiries, serviceRequests, notifications, markNotificationAsRead, markAllNotificationsAsRead, currentAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const pendingTicketsCount = serviceRequests.filter(r => r.status !== 'Completed').length;
  const unreadNotifsCount = (notifications || []).filter(n => !n.isRead).length;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries Pipeline', path: '/admin/enquiries', icon: Inbox, badge: pendingEnquiriesCount },
    { name: 'Customers Directory', path: '/admin/customers', icon: Users },
    { name: 'Service Requests', path: '/admin/service-requests', icon: Wrench, badge: pendingTicketsCount },
    { name: 'Service Reports', path: '/admin/service-reports', icon: FileCheck },
    { name: 'Create Service Report', path: '/admin/create-report', icon: PlusCircle, highlight: true },
    { name: 'AMC Management', path: '/admin/amc', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pt-28 pb-16">
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
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-gold-400 uppercase font-bold tracking-wider">Operations & Admin Portal</span>
                <span className="text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  🛡️ Super-Admin Verified
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {COMPANY_INFO.name} — Command Desk
              </h1>
              <p className="text-xs text-slate-400">
                Authorized Session: <strong className="text-slate-200">{currentAdmin?.name || 'Master Super-Admin'}</strong> ({currentAdmin?.email || 'admin@raksham.com'})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            
            {/* 🔔 Real-time Admin Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-400 border border-slate-700 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                title="Customer Inquiries & Service Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white font-black text-[10px] rounded-full flex items-center justify-center animate-pulse border-2 border-slate-900">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Tray */}
              {showNotifs && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn">
                  <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gold-400" />
                      <span className="text-xs font-bold">Real-Time Customer Alerts ({unreadNotifsCount} New)</span>
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button 
                        onClick={markAllNotificationsAsRead}
                        className="text-[10px] text-gold-400 hover:underline font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {(!notifications || notifications.length === 0) ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No recent notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 10).map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.link) {
                              navigate(notif.link);
                              setShowNotifs(false);
                            }
                          }}
                          className={`p-3.5 text-xs space-y-1 hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.isRead ? 'bg-amber-50/70 border-l-4 border-gold-500 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-[11px] truncate">{notif.title}</span>
                            <span className="text-[9px] text-slate-400 flex-shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-tight">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/admin/create-report"
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-gold-soft flex items-center space-x-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Generate Service Report (PDF 1)</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Portal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-soft p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    item.highlight && !isActive
                      ? 'bg-gold-50 text-gold-800 border border-gold-200'
                      : isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gold-600'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-gold-500 text-slate-950' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100 p-2.5 text-xs space-y-2 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super-Admin Whitelist Active</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs">{currentAdmin?.name || 'Master Super-Admin'}</p>
                <span className="text-[10px] text-slate-500 block truncate">{currentAdmin?.email || 'admin@raksham.com'}</span>
              </div>
              <div className="text-[9px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                🔒 2FA Master PIN Protected
              </div>
            </div>

            <div className="p-2 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead Technician Hub</span>
              <p className="font-bold text-slate-900">Rakesh Toraskar</p>
              <span className="text-[11px] text-slate-500 block">📞 +91 90291 14205</span>
            </div>
          </div>

          {/* Main Workspace View */}
          <div className="lg:col-span-9">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}
