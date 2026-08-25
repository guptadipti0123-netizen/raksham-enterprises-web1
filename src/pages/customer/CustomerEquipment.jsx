import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { HardDrive, ShieldCheck, Cpu, Radio, Server } from 'lucide-react';

export default function CustomerEquipment() {
  const { activeCustomer, equipment } = useAuth();
  const customerEquip = equipment.filter(e => e.customerNo === activeCustomer?.customerNo);

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Installed Security Equipment Inventory</h2>
        <p className="text-xs text-slate-500">
          Hardware components logged and maintained under your AMC contract at {activeCustomer?.name}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Equipment Type</th>
                <th className="p-4">Brand & Model</th>
                <th className="p-4">Quantity / Serial</th>
                <th className="p-4">Premises Location</th>
                <th className="p-4">Diagnostic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customerEquip.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900 flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-gold-600" />
                    <span>{item.type}</span>
                  </td>
                  <td className="p-4 text-slate-800 font-semibold">{item.brand} ({item.model})</td>
                  <td className="p-4 font-mono text-slate-600">{item.count || item.serial || '1 Unit'}</td>
                  <td className="p-4 text-slate-600">{item.location}</td>
                  <td className="p-4">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      ✓ {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
