import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            At <strong>Raksham Enterprises</strong>, we are committed to protecting the privacy and confidentiality of our clients, housing society members, and website visitors across Mumbai and Navi Mumbai.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h2>
          <p>
            When you request a CCTV survey, quotation, or service report verification on our website, we collect your Name, Phone Number, Email Address, and Site Location. We do not sell or share this data with third-party advertising brokers.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">2. Surveillance Footage & Security Privacy</h2>
          <p>
            Our technicians adhere to strict non-disclosure policies regarding client CCTV recordings, camera IP credentials, and NVR passwords. Client passwords are encrypted and never stored on public networks.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">3. Contact & Inquiries</h2>
          <p>
            For privacy-related questions, please contact our support desk at <a href={`mailto:${COMPANY_INFO.email}`} className="text-gold-700 font-semibold underline">{COMPANY_INFO.email}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
