"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input, { Select } from "@/components/ui/Input";
import { FiUsers, FiCalendar, FiCheckCircle, FiClock, FiPlus, FiLink, FiActivity, FiPieChart, FiCoffee, FiMail, FiPhone } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const router = useRouter();
  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const stats = [
    { title: "Total Patients", value: "1,482", sub: "+12% from last month", icon: FiUsers, color: "bg-slate-50 text-slate-500" },
    { title: "Today's Appointments", value: "14", sub: "4 completed so far", icon: FiCheckCircle, color: "bg-slate-50 text-slate-500" },
    { title: "Upcoming Appointments", value: "38", sub: "For the next 7 days", icon: FiCalendar, color: "bg-slate-50 text-slate-500" },
  ];

  const schedule = [
    { time: "09:00 AM", duration: "30 min", patient: "Emma Thompson", reason: "Routine Checkup", status: "Completed", type: "patient" },
    { time: "09:30 AM", duration: "30 min", patient: "James Wilson", reason: "Blood Test Results", status: "Completed", type: "patient" },
    { time: "10:00 AM", duration: "30 min", patient: "Maria Garcia", reason: "ECG Consultation", status: "In Progress", type: "patient" },
    { time: "10:30 AM", duration: "30 min", patient: "Break", reason: "Doctor unavailable", status: "Break", type: "break" },
    { time: "11:00 AM", duration: "30 min", patient: "Robert Chen", reason: "Follow-up", status: "Upcoming", type: "patient" },
  ];

  const quickActions = [
    { title: "New Appointment", sub: "Schedule a new patient visit", icon: FiPlus, color: "bg-[#16A34A] text-white", action: () => setIsApptModalOpen(true) },
    { title: "Add Prescription", sub: "Write a new digital prescription", icon: FiLink, color: "bg-blue-50 text-blue-600", action: () => router.push('/doctor/prescriptions') },
    { title: "View Patients", sub: "Browse patient directory & records", icon: FiUsers, color: "bg-emerald-50 text-emerald-600", action: () => router.push('/doctor/patients') },
    { title: "Generate Report", sub: "Weekly overview and analytics", icon: FiPieChart, color: "bg-green-50 text-[#16A34A]", action: () => router.push('/doctor/reports') },
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="px-1">
        <h1 className="text-3xl font-black text-[#111827] tracking-tight">Overview</h1>
        <p className="text-sm text-slate-400 font-bold mt-1">Welcome back, Dr. Sarah. Here is your schedule for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-8 rounded-[2rem] border-none shadow-sm flex flex-col justify-between h-44 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">{s.title}</p>
               <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl`}>
                  <s.icon />
               </div>
            </div>
            <div>
               <h2 className="text-4xl font-black text-[#111827] mb-1">{s.value}</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-fit">
        {/* Today's Schedule */}
        <div className="lg:col-span-8 space-y-6">
           <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden h-fit">
              <CardHeader className="p-8 pb-4 flex justify-between items-center bg-slate-50/20">
                 <CardTitle className="text-base">Today's Schedule</CardTitle>
                 <button onClick={() => router.push('/doctor/appointments')} className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest hover:underline">View Calendar</button>
              </CardHeader>
              <CardContent className="px-0 pb-4">
                 <div className="divide-y divide-slate-50">
                    {schedule.map((item, i) => (
                      <div key={i} className={`flex items-center justify-between p-6 px-8 transition-colors ${item.status === 'In Progress' ? 'bg-orange-50/30' : 'hover:bg-slate-50/50'}`}>
                         <div className="flex items-center gap-8">
                            <div className="w-20">
                               <p className="text-xs font-black text-[#111827] leading-none mb-1">{item.time}</p>
                               <p className="text-[10px] font-bold text-slate-300 uppercase leading-none">{item.duration}</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 border-white shadow-sm overflow-hidden ${item.type === 'break' ? 'bg-slate-100 text-slate-400' : 'bg-slate-200 text-[#16A34A]'}`}>
                                  {item.type === 'break' ? <FiCoffee /> : item.patient[0]}
                                </div>
                               <div>
                                  <p className={`text-sm font-black leading-none mb-1 ${item.type === 'break' ? 'text-slate-400' : 'text-[#111827]'}`}>{item.patient}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none">{item.reason}</p>
                               </div>
                            </div>
                         </div>
                         <div>
                            <Badge 
                              variant={item.status === 'Completed' ? 'success' : item.status === 'In Progress' ? 'warning' : item.status === 'Break' ? 'secondary' : 'info'}
                              className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                            >
                               {item.status}
                            </Badge>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Quick Actions Column */}
        <div className="lg:col-span-4 space-y-8 h-fit">
           <Card className="rounded-[2.5rem] border-none shadow-sm h-full flex flex-col pb-8">
              <CardHeader className="p-8 pb-4 border-b border-slate-50">
                 <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pt-6 space-y-4">
                 {quickActions.map((action, i) => (
                   <button 
                    key={i} 
                    onClick={action.action}
                    className="w-full group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-[1.8rem] text-left hover:border-[#16A34A] hover:shadow-xl hover:shadow-green-900/5 transition-all active:scale-95"
                  >
                      <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 shadow-sm border border-black/5`}>
                         <action.icon />
                      </div>
                      <div className="overflow-hidden">
                         <p className="text-xs font-black text-[#111827] leading-tight mb-1 truncate">{action.title}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-relaxed">{action.sub}</p>
                      </div>
                   </button>
                 ))}
              </CardContent>
           </Card>
        </div>
      </div>

      {/* Shared Appointment Modal for Fast Entry */}
      <Modal
        isOpen={isApptModalOpen}
        onClose={() => setIsApptModalOpen(false)}
        title="Quick Registration"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-10">
            <Button variant="secondary" className="flex-1" onClick={() => setIsApptModalOpen(false)}>Dismiss</Button>
            <Button className="flex-1 shadow-lg shadow-green-900/10" isLoading={loading} onClick={() => {setLoading(true); setTimeout(() => {setLoading(false); setIsApptModalOpen(false)}, 1200)}}>Confirm Booking</Button>
          </div>
        }
      >
        <div className="space-y-6">
           <Input label="Patient Identifier" placeholder="Search by Name or ID" icon={FiUsers} />
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Date" type="date" icon={FiCalendar} />
              <Input label="Arrival" type="time" icon={FiClock} />
           </div>
           <Select label="Priority Level" options={[
             {value: "low", label: "Normal Visit"},
             {value: "high", label: "Urgent Care"}
           ]} />
        </div>
      </Modal>
    </div>
  );
}
