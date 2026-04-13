"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiUsers, FiSearch, FiFilePlus, FiUser, FiInfo, FiActivity } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function StaffPatientManagement() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  
  const patients = [
    { id: "PT-8472", name: "Emma Watson", room: "Ward A - 202", status: "In Treatment" },
    { id: "PT-5931", name: "Michael Chen", room: "Waiting Area", status: "Arrived" },
    { id: "PT-3309", name: "David Miller", room: "Emergency - 04", status: "Urgent" },
  ];

  const columns = [
    { key: "name", label: "Patient", render: (v, row) => (
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">{v[0]}</div>
         <span className="font-bold text-[#111827]">{v}</span>
      </div>
    )},
    { key: "room", label: "Current Location", render: (v) => <span className="text-xs font-bold text-slate-500">{v}</span> },
    { key: "status", label: "State", render: (v) => (
       <Badge variant={v === 'Urgent' ? 'warning' : 'info'} className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
          {v}
       </Badge>
    )},
    { key: "actions", label: "Operations", render: () => (
      <Button variant="secondary" size="sm" className="px-5 rounded-xl text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 border-indigo-100">Intake Process</Button>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Patient intake Center</h1>
          <p className="text-slate-400 font-bold text-[13px]">Manage active patient arrivals and triage status</p>
        </div>
        <Button icon={FiFilePlus} className="bg-indigo-600 text-white" onClick={() => setIsIntakeOpen(true)}>New Arrival (Intake)</Button>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden min-h-[500px]">
        <Table columns={columns} data={patients} />
      </Card>

      <Modal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        title="Patient Intake Form"
        footer={
          <div className="flex gap-4 w-full"><Button variant="secondary" className="flex-1" onClick={() => setIsIntakeOpen(false)}>Cancel</Button><Button className="flex-1 bg-indigo-600 text-white" onClick={() => setIsIntakeOpen(false)}>Complete Intake</Button></div>
        }
      >
        <div className="space-y-6">
           <Input label="Search Registered Patient" placeholder="Patient Name or ID..." icon={FiSearch} />
           <div className="p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 text-xl shadow-lg shadow-indigo-200"><FiInfo /></div>
              <div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-loose mb-1">Triage Protocol</p>
                <p className="text-[10px] font-bold text-indigo-400 leading-relaxed uppercase">Verify primary vitals and allergies before assigning the patient to a consultation queue.</p>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
}

// Inline Badge component for quick use
function Badge({ children, variant }) {
  const styles = {
    info: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-[#16A34A]",
    warning: "bg-orange-50 text-orange-400",
  };
  return <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${styles[variant] || styles.info}`}>{children}</span>;
}
