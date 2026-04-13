"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiUsers, FiSearch, FiFileText, FiPlus, FiFilter, FiUser, FiActivity } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function AdminPatientRegistry() {
  const patients = [
    { id: "PT-8472", name: "Emma Watson", phone: "+1 (555) 123-4567", joinDate: "Oct 12, 2023", status: "Active" },
    { id: "PT-5931", name: "Michael Chen", phone: "+1 (987) 654-3210", joinDate: "Oct 10, 2023", status: "Pending" },
    { id: "PT-3309", name: "David Miller", phone: "+1 (555) 987-1234", joinDate: "Sep 28, 2023", status: "Inactive" },
  ];

  const columns = [
    { key: "name", label: "Patient Entity", render: (v, row) => (
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">{v[0]}</div>
         <div>
            <p className="font-bold text-[#111827] text-sm leading-none mb-1">{v}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{row.id}</p>
         </div>
      </div>
    )},
    { key: "phone", label: "Contact No.", render: (v) => <span className="text-xs font-bold text-slate-500">{v}</span> },
    { key: "joinDate", label: "Registration Date", render: (v) => <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{v}</span> },
    { key: "status", label: "Account State", render: (v) => (
       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest 
          ${v === 'Active' ? 'bg-green-50 text-[#16A34A]' : v === 'Pending' ? 'bg-orange-50 text-orange-400' : 'bg-slate-50 text-slate-400'}`}>
          {v}
       </span>
    )},
    { key: "actions", label: "Actions", render: () => (
      <Button variant="ghost" size="sm" className="text-slate-400 font-black text-[10px] uppercase hover:text-[#16A34A]">Manage</Button>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Main Patient Database</h1>
          <p className="text-slate-400 font-bold text-[13px]">Master record of all hospital-registered patients</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group w-64">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#16A34A] transition-colors" />
              <input type="text" placeholder="Search master records..." className="bg-white border border-slate-100 rounded-2xl pl-10 pr-4 h-10 text-xs font-bold outline-none focus:border-[#16A34A] transition-all" />
           </div>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden min-h-[500px]">
        <Table columns={columns} data={patients} />
      </Card>
    </div>
  );
}
