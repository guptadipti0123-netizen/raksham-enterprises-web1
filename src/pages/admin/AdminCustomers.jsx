import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Phone, Mail, MapPin, ShieldCheck, Building } from 'lucide-react';

export default function AdminCustomers() {
  const { customers } = useAuth();

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Customers & Societies Directory</h2>
          <p className="text-xs text-slate-500">
            Registered housing societies, corporate offices, and commercial properties under maintenance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((cust) => (
          <div
            key={cust.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <span className="font-mono text-[10px] font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                  {cust.customerNo}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{cust.name}</h3>
                <span className="text-[11px] text-slate-500">{cust.type}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ● Active AMC
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <p><span className="text-slate-400">Site Address:</span> {cust.address}</p>
              <p><span className="text-slate-400">Contact Person:</span> <strong className="text-slate-800">{cust.contactPerson}</strong></p>
              <p><span className="text-slate-400">Phone:</span> <a href={`tel:${cust.contactPhone}`} className="text-gold-700 font-bold">{cust.contactPhone}</a></p>
              <p><span className="text-slate-400">Cameras / System:</span> <span className="font-bold text-slate-800">{cust.cameraCount} Cams • {cust.systemType}</span></p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
