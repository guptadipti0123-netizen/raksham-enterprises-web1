import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAmc() {
  const { customers } = useAuth();

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">AMC Contracts & Society Maintenance Plans</h2>
          <p className="text-xs text-slate-500">
            Overview of active annual maintenance agreements, renewal schedules, and quarterly inspection cycles.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Customer & Site</th>
              <th className="p-4">AMC Plan Type</th>
              <th className="p-4">Camera Scale</th>
              <th className="p-4">Contract Expiry</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <strong className="text-slate-900 block">{cust.name}</strong>
                  <span className="text-[11px] text-slate-500">{cust.address}</span>
                </td>
                <td className="p-4 text-slate-800 font-semibold">{cust.amcPlan}</td>
                <td className="p-4 font-mono">{cust.cameraCount} Cameras</td>
                <td className="p-4 font-mono font-bold text-slate-700">{cust.amcExpiry}</td>
                <td className="p-4">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
