"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiSearch, FiCheck, FiX, FiCheckCircle, FiChevronRight, FiFilter, FiUser } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DoctorAppointmentsListPage() {
  const [activeTab, setActiveTab] = useState("All Appointments");

  const tabs = ["All Appointments", "Pending", "Confirmed", "Completed"];

  const appointments = [
    { name: "Emma Watson", reason: "Follow-up Visit", date: "Oct 12, 2023", time: "09:00 AM - 09:30 AM", status: "Pending", avatar: "EW" },
    { name: "Michael Chen", reason: "General Checkup", date: "Oct 12, 2023", time: "10:00 AM - 10:30 AM", status: "Confirmed", avatar: "MC" },
    { name: "David Miller", reason: "Cardiology Consult", date: "Oct 12, 2023", time: "11:30 AM - 12:00 PM", status: "Pending", avatar: "DM" },
    { name: "Sarah Parker", reason: "Blood Test Results", date: "Oct 11, 2023", time: "02:00 PM - 02:30 PM", status: "Completed", avatar: "SP" },
    { name: "James Wilson", reason: "Routine Exam", date: "Oct 13, 2023", time: "09:00 AM - 09:30 AM", status: "Confirmed", avatar: "JW" },
  ];

  const columns = [
    { key: "name", label: "Patient Name", render: (v, row) => (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#16A34A] font-black border-2 border-white shadow-sm overflow-hidden">
           <img src={`https://ui-avatars.com/api/?name=${v}&background=f1f5f9&color=16A34A`} alt={v} />
        </div>
        <div>
          <p className="font-bold text-[#111827] leading-none mb-1">{v}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.reason}</p>
        </div>
      </div>
    )},
    { key: "date", label: "Date", render: (v) => <span className="text-xs font-bold text-slate-600">{v}</span> },
    { key: "time", label: "Time Slot", render: (v) => <span className="text-xs font-black text-[#111827] uppercase tracking-tighter">{v}</span> },
    { key: "status", label: "Status", render: (v) => (
      <Badge variant={v === "Confirmed" ? "success" : v === "Pending" ? "warning" : "info"} className="px-5 py-2 rounded-xl text-[9px] font-black tracking-[0.1em]">
        {v}
      </Badge>
    )},
    { key: "actions", label: "Actions", render: (v, row) => (
      <div className="flex items-center gap-2">
        {row.status === "Pending" ? (
          <>
            <Button size="sm" icon={FiCheck} className="rounded-xl px-4 py-3 bg-[#16A34A] text-white font-black text-[10px] uppercase">Accept</Button>
            <Button size="sm" icon={FiX} className="rounded-xl px-4 py-3 bg-red-600 text-white font-black text-[10px] uppercase">Reject</Button>
          </>
        ) : row.status === "Confirmed" ? (
          <Button size="sm" variant="secondary" icon={FiCheckCircle} className="rounded-xl px-6 py-3 border-[#16A34A] text-[#16A34A] font-black text-[10px] uppercase hover:bg-green-50 transition-all">Mark Completed</Button>
        ) : (
          <Button size="sm" variant="ghost" className="rounded-xl px-6 py-3 border-slate-100 text-slate-400 font-bold text-[10px] uppercase">View Details</Button>
        )}
      </div>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2 pb-20">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-black text-[#111827]">Appointments Management</h1>
      </div>

      {/* Modern Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar-hidden">
           {tabs.map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                 ${activeTab === tab 
                   ? "bg-green-100/50 text-[#16A34A] shadow-sm shadow-green-900/5" 
                   : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                 }`}
             >
               {tab}
             </button>
           ))}
        </div>
        
        <div className="relative group min-w-0 lg:w-80">
           <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#16A34A] transition-colors" />
           <input 
             type="text" 
             placeholder="Search patients..." 
             className="w-full h-12 bg-white border border-slate-100 rounded-2xl pl-12 pr-4 text-xs font-bold text-[#111827] outline-none focus:border-[#16A34A] focus:ring-4 focus:ring-green-50 transition-all shadow-sm"
           />
        </div>
      </div>

      {/* Main Appointments Table */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden min-h-[500px]">
        <Table 
          columns={columns} 
          data={appointments.filter(a => activeTab === "All Appointments" || a.status === activeTab)} 
        />
      </Card>
    </div>
  );
}
