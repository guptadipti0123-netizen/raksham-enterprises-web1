import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileCheck, Plus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/websiteData';

export default function AdminCreateReport() {
  const { customers, addServiceReport } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerNo: 'ULV2601',
    customerName: 'Silver springs recidency',
    siteAddress: 'Plot no.165, sector 24,ulve,new Mumbai, Maharashtra 410206',
    contactPerson: 'Siddhesh Purarkar',
    contactNumber: '+91 90291 14205',
    reportNo: `RE-${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear().toString().slice(-2)}-${Math.floor(1 + Math.random() * 9)}`,
    date: `${new Date().getDate()} / 0${new Date().getMonth() + 1} / ${new Date().getFullYear()}`,
    technicianName: 'Rakesh Toraskar',
    serviceRequestType: 'Routine Quarterly AMC Service Inspection & Lens Cleaning',
    system: 'NVR',
    brand: 'Hikvision',
    model: 'DS-7616NI-Q2',
    serialNo: 'HIK-9920148',
    noOfCameras: '14',
    otherEquipment: '8-Port PoE Switch, 6U Rack, WD Purple 4TB HDD',
    problemObserved: 'External camera lenses accumulated dust and cobwebs; routine AMC audit.',
    workCarriedOut: 'All accessible CCTV camera lenses installed on the floors were cleaned and inspected. Firmware and network ping verified.',
    partsUsed: [
      { srNo: '1', description: 'Lens Cleaning Solution & Microfiber', qty: '1 Kit', remarks: 'Completed' },
      { srNo: '2', description: 'RJ45 Connectors & Boot Caps', qty: '2 Pcs', remarks: 'Replaced' }
    ],
    hddStatus: 'OK',
    firmwareStatus: 'OK',
    networkStatus: 'OK',
    technicianRemarks: 'All accessible CCTV camera lenses installed on the floors were cleaned and inspected.',
    serviceDeclaration: 'The above service work and system checks have been completed to the best of our ability. The external CCTV cameras remain pending for lens cleaning due to the unavailability of a suitable ladder.',
    customerRemarks: 'Service completed satisfactorily.'
  });

  const handleCustomerSelect = (e) => {
    const selectedCustNo = e.target.value;
    const cust = customers.find(c => c.customerNo === selectedCustNo);
    if (cust) {
      setFormData(prev => ({
        ...prev,
        customerNo: cust.customerNo,
        customerName: cust.name,
        siteAddress: cust.address,
        contactPerson: cust.contactPerson,
        contactNumber: cust.contactPhone,
        noOfCameras: cust.cameraCount ? String(cust.cameraCount) : '14'
      }));
    }
  };

  const handleAddPart = () => {
    setFormData(prev => ({
      ...prev,
      partsUsed: [
        ...prev.partsUsed,
        { srNo: String(prev.partsUsed.length + 1), description: '', qty: '1', remarks: '' }
      ]
    }));
  };

  const handleRemovePart = (idx) => {
    setFormData(prev => ({
      ...prev,
      partsUsed: prev.partsUsed.filter((_, i) => i !== idx)
    }));
  };

  const handlePartChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.partsUsed];
      updated[idx][field] = value;
      return { ...prev, partsUsed: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRep = addServiceReport(formData);
    alert(`Service Report ${newRep.reportNo} generated successfully!`);
    navigate('/admin/service-reports');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft space-y-6">
      
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Digital CCTV Service Report Generator (PDF 1)</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate an official CCTV Service Report with system inspection status and technician declaration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Section 1: Customer Details */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 uppercase text-xs">1. Customer Details</h3>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-500">Auto-fill from:</span>
              <select
                onChange={handleCustomerSelect}
                value={formData.customerNo}
                className="px-2.5 py-1 rounded bg-white border border-slate-300 font-bold"
              >
                {customers.map(c => (
                  <option key={c.customerNo} value={c.customerNo}>{c.name} ({c.customerNo})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Customer Number / Site ID</label>
              <input
                type="text"
                required
                value={formData.customerNo}
                onChange={(e) => setFormData({ ...formData, customerNo: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Site Address</label>
              <input
                type="text"
                required
                value={formData.siteAddress}
                onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Service & Equipment Details */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 uppercase text-xs">2. Service & Equipment Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Service Report No.</label>
              <input
                type="text"
                required
                value={formData.reportNo}
                onChange={(e) => setFormData({ ...formData, reportNo: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Service Date</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Technician Name</label>
              <input
                type="text"
                required
                value={formData.technicianName}
                onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">System Type</label>
              <input
                type="text"
                value={formData.system}
                onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Model No.</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">No. of Cameras</label>
              <input
                type="text"
                value={formData.noOfCameras}
                onChange={(e) => setFormData({ ...formData, noOfCameras: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">HDD Diagnostic Check</label>
              <select
                value={formData.hddStatus}
                onChange={(e) => setFormData({ ...formData, hddStatus: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-bold text-emerald-700"
              >
                <option value="OK">OK</option>
                <option value="Warning">Warning</option>
                <option value="Replacement Needed">Replacement Needed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Problem & Work Carried Out */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 uppercase text-xs">3. Problem & Action</h3>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Problem Observed</label>
            <textarea
              rows="2"
              value={formData.problemObserved}
              onChange={(e) => setFormData({ ...formData, problemObserved: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
            ></textarea>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Work Carried Out</label>
            <textarea
              rows="2"
              value={formData.workCarriedOut}
              onChange={(e) => setFormData({ ...formData, workCarriedOut: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
            ></textarea>
          </div>
        </div>

        {/* Section 4: Parts Used Table */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 uppercase text-xs">4. Parts / Materials Used</h3>
            <button
              type="button"
              onClick={handleAddPart}
              className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[11px] flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add Row</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.partsUsed.map((p, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 text-center font-bold">{idx + 1}</div>
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder="Description of material / service kit"
                    value={p.description}
                    onChange={(e) => handlePartChange(idx, 'description', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Qty"
                    value={p.qty}
                    onChange={(e) => handlePartChange(idx, 'qty', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Remarks"
                    value={p.remarks}
                    onChange={(e) => handlePartChange(idx, 'remarks', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemovePart(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Remarks & Service Declaration */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 uppercase text-xs">5. Technician Remarks & Declaration</h3>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Technician Remarks</label>
            <input
              type="text"
              value={formData.technicianRemarks}
              onChange={(e) => setFormData({ ...formData, technicianRemarks: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Service Declaration</label>
            <input
              type="text"
              value={formData.serviceDeclaration}
              onChange={(e) => setFormData({ ...formData, serviceDeclaration: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-amber-900 bg-amber-50"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/service-reports')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-gold-soft flex items-center space-x-1.5"
          >
            <FileCheck className="w-4 h-4" />
            <span>Generate & Save Digital Report</span>
          </button>
        </div>

      </form>

    </div>
  );
}
