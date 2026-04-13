"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiUsers, FiActivity, FiTrendingUp, FiDollarSign, FiPlus, FiDownload, FiArrowUpRight, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input, { Select } from "@/components/ui/Input";

export default function AdminDashboard() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ... (Stats and Data remain same)
  const stats = [
    { title: "Total Patients", value: "12,482", trend: "+12.5%", icon: FiUsers, color: "bg-blue-50 text-blue-600" },
    { title: "Active Doctors", value: "84", trend: "+2", icon: FiActivity, color: "bg-[#16A34A] text-[#16A34A]" },
    { title: "Appointments Today", value: "156", trend: "+24.2%", icon: FiTrendingUp, color: "bg-orange-50 text-orange-600" },
    { title: "Revenue (MTD)", value: "$42,850", trend: "+8.3%", icon: FiDollarSign, color: "bg-purple-50 text-purple-600" },
  ];

  const recentActivity = [
    { id: 1, name: "Dr. Robert Fox", action: "Authorized Lab Report", time: "10m ago", status: "Completed" },
    { id: 2, name: "Staff Jane Cooper", action: "Registered New Patient", time: "25m ago", status: "In Progress" },
  ];

  const columns = [
    { key: "name", label: "User", render: (v) => <span className="font-bold text-slate-700">{v}</span> },
    { key: "action", label: "Task", render: (v) => <span className="text-slate-500 font-medium">{v}</span> },
    { key: "status", label: "State", render: (v) => <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-[#16A34A]">{v}</span> },
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Main Dashboard</h1>
          <p className="text-slate-400 font-bold text-[13px]">Summary & System Monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Button icon={FiPlus} size="sm" onClick={() => setIsRegisterOpen(true)}>Register User</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-8 rounded-[2rem] border-none shadow-sm flex flex-col justify-between h-44 transition-all hover:shadow-xl">
            <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-2xl shadow-sm`}>
               <s.icon />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{s.title}</p>
               <h2 className="text-2xl font-black text-[#111827]">{s.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      {/* Responsive Registration Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register New Portal User"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="secondary" className="flex-1 order-2 sm:order-1" onClick={() => setIsRegisterOpen(false)}>Cancel</Button>
            <Button className="flex-1 order-1 sm:order-2 shadow-lg shadow-green-900/10" isLoading={loading} onClick={() => {setLoading(true); setTimeout(() => {setLoading(false); setIsRegisterOpen(false)}, 1000)}}>Confirm Registration</Button>
          </div>
        }
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Full Name" placeholder="e.g. John Doe" icon={FiUser} />
            <Input label="Mobile No." placeholder="+1 234..." icon={FiPhone} />
          </div>
          <Input label="Email Identifier" type="email" placeholder="john@medicare.com" icon={FiMail} />
          <Select label="System Access Role" options={[
            {value: "patient", label: "Patient Account"}, 
            {value: "doctor", label: "Doctor Profile"}, 
            {value: "staff", label: "Operations Staff"}
          ]} />
          <Input label="Security Password" type="password" placeholder="••••••••" icon={FiLock} />
          <div className="p-5 bg-green-50/50 rounded-3xl border border-green-100/50 flex items-center gap-4">
             <div className="w-10 h-10 rounded-2xl bg-[#16A34A] flex items-center justify-center text-white shrink-0 text-xl shadow-lg shadow-green-200">✨</div>
            <p className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest leading-loose">Account credentials will be dispatched to the provided email address.</p>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-0 overflow-hidden border-none shadow-sm h-fit">
          <CardHeader className="p-8 pb-2 border-b border-slate-50">
            <CardTitle icon={FiActivity}>System-wide Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <Table columns={columns} data={recentActivity} />
          </CardContent>
        </Card>

        <div className="hidden lg:block space-y-6">
          <Card className="bg-[#111827] p-10 rounded-[2.5rem] text-white border-none shadow-xl h-full flex flex-col justify-center">
             <h4 className="text-2xl font-black mb-4 leading-tight">System Performance</h4>
             <p className="text-slate-400 font-medium mb-8 leading-relaxed">Infrastructure is operating at peak efficiency. No critical reports pending.</p>
             <Button variant="ghost" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-black" icon={FiArrowUpRight}>Global Analytics</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
