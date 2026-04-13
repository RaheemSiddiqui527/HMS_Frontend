"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiUserPlus, FiUsers, FiMail, FiPhone, FiPlus, FiSettings, FiUser, FiBriefcase, FiLock } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input, { Select } from "@/components/ui/Input";

export default function AdminStaffRegistry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const staff = [
    { id: "STF-201", name: "Jane Cooper", role: "Head Receptionist", email: "jane.c@medicare.com", status: "Active" },
    { id: "STF-202", name: "Cody Fisher", role: "Lab Technician", email: "cody.f@medicare.com", status: "Active" },
    { id: "STF-203", name: "Esther Howard", role: "Nursing Staff", email: "esther.h@medicare.com", status: "On Leave" },
  ];

  const columns = [
    { key: "name", label: "Staff Member", render: (v) => (
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">{v[0]}</div>
         <span className="font-bold text-[#111827]">{v}</span>
      </div>
    )},
    { key: "role", label: "Designation", render: (v) => <span className="text-xs font-bold text-slate-500">{v}</span> },
    { key: "email", label: "Email Address", render: (v) => <span className="text-xs font-medium text-slate-400">{v}</span> },
    { key: "status", label: "Status", render: (v) => <span className={`text-[9px] font-black uppercase tracking-widest ${v === 'Active' ? 'text-[#16A34A]' : 'text-orange-400'}`}>● {v}</span> },
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Support Staff Registry</h1>
          <p className="text-slate-400 font-bold text-[13px]">Manage hospital operational and technical staff</p>
        </div>
        <Button icon={FiUserPlus} className="bg-emerald-600 text-white" onClick={() => setIsModalOpen(true)}>Add New Staff</Button>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden min-h-[500px]">
        <Table columns={columns} data={staff} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Support Staff"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="secondary" className="flex-1 order-2 sm:order-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1 order-1 sm:order-2 shadow-lg shadow-emerald-900/10 bg-emerald-600 text-white" isLoading={loading} onClick={() => {setLoading(true); setTimeout(() => {setLoading(false); setIsModalOpen(false)}, 1200)}}>Confirm & Register</Button>
          </div>
        }
      >
        <div className="space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Full Member Name" placeholder="e.g. Jane Doe" icon={FiUser} />
              <Select label="Designation" options={[
                {value: "recept", label: "Receptionist"},
                {value: "lab", label: "Lab Technician"},
                {value: "nurse", label: "Nursing Staff"},
                {value: "admin", label: "Admin Assistant"}
              ]} icon={FiBriefcase} />
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Official Email" type="email" placeholder="staff@medicare.com" icon={FiMail} />
              <Input label="Contact Number" placeholder="+1 (555) 000-0000" icon={FiPhone} />
           </div>

           <Input label="System Access Password" type="password" placeholder="••••••••" icon={FiLock} />

           <div className="p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200"><FiSettings /></div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-loose mb-1">Access Levels</p>
                <p className="text-[10px] font-bold text-emerald-400 leading-relaxed uppercase">New staff accounts are granted restricted access by default. Privileges can be updated in System Settings.</p>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
}
