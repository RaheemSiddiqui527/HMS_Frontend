"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiUsers, FiClock, FiCheckCircle, FiPlus, FiSearch, FiActivity, FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function StaffDashboard() {
  const stats = [
    { title: "Waiting Room", value: "12", sub: "Avg. wait 18m", icon: FiClock, color: "bg-orange-50 text-orange-600" },
    { title: "New Registers", value: "24", sub: "Today so far", icon: FiUsers, color: "bg-blue-50 text-blue-600" },
    { title: "Checked In", value: "48", sub: "89% completed", icon: FiCheckCircle, color: "bg-[#16A34A] text-[#16A34A]" },
  ];

  const currentQueue = [
    { id: "Q-101", patient: "Maria Garcia", doctor: "Dr. Jenkins", time: "10:00 AM", status: "Waiting" },
    { id: "Q-102", patient: "Robert Chen", doctor: "Dr. Robert", time: "10:15 AM", status: "Processing" },
    { id: "Q-103", patient: "Esther Howard", doctor: "Dr. Sarah", time: "10:30 AM", status: "Awaiting Docs" },
  ];

  const columns = [
    { key: "id", label: "Token ID", render: (v) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v}</span> },
    { key: "patient", label: "Patient", render: (v) => <span className="font-bold text-[#111827]">{v}</span> },
    { key: "doctor", label: "Assigned Dr.", render: (v) => <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{v}</span> },
    { key: "time", label: "Est. Time", render: (v) => <span className="text-xs font-bold text-slate-500">{v}</span> },
    { key: "status", label: "Status", render: (v) => (
      <Badge variant={v === "Waiting" ? "warning" : v === "Processing" ? "info" : "secondary"}>
        {v}
      </Badge>
    )},
    { key: "actions", label: "", render: () => <Button size="sm" variant="ghost" className="text-[#16A34A]"><FiArrowRight /></Button> }
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">Staff Overview</h1>
          <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest leading-none">Live Queue & Front-Desk Monitoring</p>
        </div>
        <div className="flex gap-3">
          <div className="hidden md:flex items-center bg-white rounded-xl border border-slate-200 px-4 h-11 shadow-sm">
             <FiSearch className="text-slate-300" />
             <input className="bg-transparent border-none outline-none px-3 text-xs font-bold text-slate-600 placeholder:text-slate-300 w-44" placeholder="Find Token / Patient" />
          </div>
          <Button icon={FiPlus} size="sm" className="shadow-lg shadow-green-900/10 h-11">Fast Intake</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-8 rounded-[2rem] border-none shadow-sm flex flex-col justify-between h-40 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
            <div className="flex justify-between items-start">
               <div className={`p-3 rounded-2xl ${s.color.split(' ')[0]} ${s.color.split(' ')[1]} shadow-sm transition-transform group-hover:scale-110`}>
                  <s.icon size={20} />
               </div>
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{s.title}</p>
            </div>
            <div>
               <h2 className="text-3xl font-black text-[#111827] leading-none mb-1">{s.value}</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Queue Table */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden min-h-[400px]">
        <CardHeader className="p-8 pb-4 flex justify-between items-center bg-slate-50/30 border-b border-slate-50">
           <CardTitle icon={FiActivity}>Active Patient Queue</CardTitle>
           <button className="text-[10px] font-black text-slate-400 hover:text-[#16A34A] uppercase tracking-[0.2em] transition-colors">Refresh Queue</button>
        </CardHeader>
        <CardContent className="px-2">
           <Table columns={columns} data={currentQueue} />
        </CardContent>
      </Card>
    </div>
  );
}
