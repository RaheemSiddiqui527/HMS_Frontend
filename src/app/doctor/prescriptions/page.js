"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { FiPlus, FiTrash2, FiUser, FiSearch, FiFileText, FiRefreshCw, FiArrowRight } from "react-icons/fi";

export default function DoctorPrescriptionPage() {
  const [prescribedMeds, setPrescribedMeds] = useState([
    { id: 1, name: "Albuterol Inhaler", dosage: "As needed", duration: "Continue" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    duration: ""
  });

  const columns = [
    { key: "name", label: "Medicine Name", render: (v) => <span className="font-bold text-[#111827]">{v}</span> },
    { key: "dosage", label: "Dosage", render: (v) => <span className="text-xs font-bold text-slate-500 uppercase">{v}</span> },
    { key: "duration", label: "Duration", render: (v) => <span className="text-xs font-black text-[#16A34A] uppercase tracking-tighter">{v}</span> },
    { key: "actions", label: "", render: (_, row) => (
      <button 
        onClick={() => setPrescribedMeds(prescribedMeds.filter(m => m.id !== row.id))}
        className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
      >
        <FiTrash2 size={18} />
      </button>
    )},
  ];

  const handleAddMedicine = () => {
    if (!formData.name || !formData.dosage) {
        alert("Please enter medicine name and dosage!");
        return;
    }
    
    const newMed = {
        id: Date.now(),
        name: formData.name,
        dosage: formData.dosage,
        duration: formData.duration || "As needed"
    };

    setPrescribedMeds([...prescribedMeds, newMed]);
    setFormData({ name: "", dosage: "", duration: "" }); // Reset form
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in py-2 pb-20 px-4 focus-visible:outline-none">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-black text-[#111827]">Create Prescription</h1>
        <Button variant="ghost" icon={FiFileText} className="text-slate-400 font-bold text-xs uppercase underline">View Full History</Button>
      </div>

      {/* Patient Information Context Card */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Patient Information</h4>
        <Card className="bg-green-50/30 p-6 sm:p-8 rounded-[2.5rem] border-none shadow-sm flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden group border border-green-100">
          <div className="w-16 h-16 rounded-2xl bg-[#16A34A] p-0.5 shadow-xl shadow-green-900/10 shrink-0">
            <img 
               src="https://ui-avatars.com/api/?name=Emma+Watson&background=16A34A&color=fff" 
               className="w-full h-full object-cover rounded-[1.2rem]" 
               alt="Avatar" 
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-black text-[#111827] mb-1">Emma Watson</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
               Patient ID: #PT-8472 • 28 Years, Female • Blood Group: O+
            </p>
          </div>
          <div className="sm:ml-auto">
             <Button variant="secondary" size="sm" className="bg-white rounded-xl font-black border-slate-200">Change Patient</Button>
          </div>
        </Card>
      </section>

      {/* Add Medication Form */}
      <Card className="rounded-[3rem] border-none shadow-sm overflow-hidden p-8 sm:p-12 space-y-10 bg-white">
        <div className="space-y-6">
           <h4 className="text-sm font-black text-[#111827] tracking-tight flex items-center gap-3">
              <FiPlus className="text-[#16A34A] bg-green-50 rounded-lg p-1 w-7 h-7" /> Add Medication
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input 
                label="Medicine Name" 
                placeholder="Search name..." 
                icon={FiSearch} 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Dosage" 
                placeholder="e.g. 1-0-1" 
                value={formData.dosage}
                onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              />
              <Input 
                label="Duration" 
                placeholder="e.g. 5 Days" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
           </div>
           <div className="flex justify-end pt-2">
              <Button 
                onClick={handleAddMedicine}
                icon={FiPlus} 
                variant="secondary" 
                className="px-8 rounded-xl font-black bg-green-50 text-[#16A34A] border-green-100 hover:bg-[#16A34A] hover:text-white transition-all shadow-sm"
              >
                Add Medicine
              </Button>
           </div>
        </div>

        <div className="h-px bg-slate-50" />

        {/* Prescribed Medicines List */}
        <div className="space-y-6">
           <h4 className="text-sm font-black text-[#111827] tracking-tight flex items-center gap-3">
              <FiFileText className="text-blue-500 bg-blue-50 rounded-lg p-1 w-7 h-7" /> Prescribed Medicines
           </h4>
           <div className="border border-slate-50 rounded-[2rem] overflow-hidden">
              <Table columns={columns} data={prescribedMeds} />
           </div>
           {prescribedMeds.length === 0 && (
             <p className="text-center py-10 text-xs font-bold text-slate-300 uppercase tracking-widest">No medicines added yet</p>
           )}
        </div>
      </Card>

      {/* Final Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-1 pt-4 pb-20">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-400 text-sm">✨</div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Prescription will be digitally signed <br /> and sent to the patient portal.</p>
         </div>
         <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="secondary" className="px-10 rounded-2xl font-black">Save Draft</Button>
            <Button className="px-12 rounded-2xl font-black shadow-xl shadow-green-900/10" icon={FiArrowRight}>Finalize & Print</Button>
         </div>
      </div>
    </div>
  );
}
