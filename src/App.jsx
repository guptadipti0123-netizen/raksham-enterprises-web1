import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import QuoteModal from './components/QuoteModal';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CctvAmcPage from './pages/CctvAmcPage';
import ProjectsPage from './pages/ProjectsPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import LocationDetailPage from './pages/LocationDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ServiceReportPage from './pages/ServiceReportPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import ServiceIntakePage from './pages/ServiceIntakePage';
import NonAmcBookingPage from './pages/NonAmcBookingPage';
import ServiceTrackingPage from './pages/ServiceTrackingPage';

// Customer Portal Pages
import CustomerLayout from './pages/customer/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerServiceReports from './pages/customer/CustomerServiceReports';
import CustomerServiceRequests from './pages/customer/CustomerServiceRequests';
import CustomerAmc from './pages/customer/CustomerAmc';
import CustomerEquipment from './pages/customer/CustomerEquipment';

// Admin Portal Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminServiceReports from './pages/admin/AdminServiceReports';
import AdminCreateReport from './pages/admin/AdminCreateReport';
import AdminServiceRequests from './pages/admin/AdminServiceRequests';
import AdminAmc from './pages/admin/AdminAmc';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuote = () => {
    setIsQuoteModalOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        
        <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-gold-500 selection:text-white">
          
          {/* Navigation Bar */}
          <Navbar onOpenQuote={handleOpenQuote} />

          {/* Main Routing View */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
              <Route path="/about-us" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/services/:id" element={<ServiceDetailPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/cctv-amc-mumbai" element={<CctvAmcPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/cctv-amc" element={<CctvAmcPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/projects" element={<ProjectsPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/service-areas" element={<ServiceAreasPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/service-areas/:areaId" element={<LocationDetailPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/faq" element={<FaqPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/service-report" element={<ServiceReportPage />} />

              {/* Dedicated Service Intake & Complaint Tracking Routes */}
              <Route path="/service-request" element={<ServiceIntakePage onOpenQuote={handleOpenQuote} />} />
              <Route path="/need-service" element={<ServiceIntakePage onOpenQuote={handleOpenQuote} />} />
              <Route path="/service-request/non-amc" element={<NonAmcBookingPage />} />
              <Route path="/book-service/non-amc" element={<NonAmcBookingPage />} />
              <Route path="/track-service" element={<ServiceTrackingPage />} />
              <Route path="/track-service/:complaintNo" element={<ServiceTrackingPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Customer Portal Nested Routes */}
              <Route path="/customer" element={<CustomerLayout />}>
                <Route index element={<Navigate to="/customer/dashboard" replace />} />
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="service-reports" element={<CustomerServiceReports />} />
                <Route path="service-requests" element={<CustomerServiceRequests />} />
                <Route path="amc" element={<CustomerAmc />} />
                <Route path="equipment" element={<CustomerEquipment />} />
              </Route>

              {/* Admin Portal Nested Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="enquiries" element={<AdminEnquiries />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="service-reports" element={<AdminServiceReports />} />
                <Route path="create-report" element={<AdminCreateReport />} />
                <Route path="service-requests" element={<AdminServiceRequests />} />
                <Route path="amc" element={<AdminAmc />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer onOpenQuote={handleOpenQuote} />

          {/* Quick Quote Modal */}
          <QuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
          />

        </div>
      </Router>
    </AuthProvider>
  );
}
