import React from 'react';
import { COMPANY_INFO } from '../data/websiteData';

export default function TermsPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service & AMC Policy</h1>
          <p className="text-xs text-slate-500">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Quotations & Site Surveys</h2>
          <p>
            All initial on-site physical surveys across Mumbai and Navi Mumbai are free of obligation. Formal quotations are valid for 30 days from the date of issuance.
          </p>

          <h2 className="text-base font-bold text-slate-900">2. CCTV AMC Contract Terms</h2>
          <p>
            Annual Maintenance Contracts (AMC) encompass 4 scheduled quarterly visits. Non-comprehensive AMCs cover preventive cleaning, alignment, testing, and labor charges for repairs. Spare hardware replacements are quoted separately at genuine OEM rates.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. Hardware Warranty</h2>
          <p>
            All new camera, DVR, NVR, and hard drive hardware carry manufacturer warranties (1 to 3 years depending on brand). Physical tampering, mouse cable cuts, and water ingress caused by non-IP rated housing misuse are not covered under warranty.
          </p>
        </div>
      </section>
    </div>
  );
}
