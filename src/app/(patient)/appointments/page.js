"use client";

import { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { FiCalendar, FiClock, FiX, FiCheckCircle, FiPlus } from "react-icons/fi";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const appointments = [
    { 
      id: "A-901", 
      doctor: "Dr. Sarah Jenkins", 
      specialty: "Cardiology",
      date: "Mon, Oct 30, 2023", 
      time: "10:00 AM", 
      status: "Pending" 
    },
    { 
      id: "A-850", 
      doctor: "Dr. Michael Chen", 
      specialty: "General Medicine",
      date: "Wed, Nov 01, 2023", 
      time: "02:30 PM", 
      status: "Confirmed" 
    },
    { 
      id: "A-720", 
      doctor: "Dr. Emily Carter", 
      specialty: "Dentistry",
      date: "Fri, Oct 13, 2023", 
      time: "09:00 AM", 
      status: "Completed" 
    },
    { 
      id: "A-610", 
      doctor: "Dr. Robert Fox", 
      specialty: "Orthopedics",
      date: "Tue, Oct 10, 2023", 
      time: "11:30 AM", 
      status: "Completed" 
    },
  ];

  const columns = [
    { 
      key: "date", 
      label: "DATE & TIME", 
      render: (_, row) => (
        <div className="space-y-1 py-1">
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
             <FiCalendar className="text-slate-400" /> {row.date}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
             <FiClock className="text-slate-300" /> {row.time}
          </div>
        </div>
      )
    },
    { 
      key: "doctor", 
      label: "DOCTOR DETAILS", 
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#16A34A] border-2 border-white shadow-sm overflow-hidden">
             {row.doctor[4]}
          </div>
          <div>
            <p className="text-sm font-black text-[#111827] leading-none mb-1">{row.doctor}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{row.specialty}</p>
          </div>
        </div>
      )
    },
    { 
      key: "status", 
      label: "STATUS", 
      render: (v) => (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
          ${v === "Pending" ? "bg-orange-50 text-orange-600 border-orange-100" : 
            v === "Confirmed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
            "bg-slate-50 text-slate-400 border-slate-100"}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${v === "Pending" ? "bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]" : v === "Confirmed" ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" : "bg-slate-300"}`} />
          {v}
        </span>
      )
    },
    { 
      key: "actions", 
      label: "ACTION", 
      render: (_, row) => (
        row.status === "Pending" ? (
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[11px] font-black border border-red-100">
            <FiX size={14} /> Cancel
          </button>
        ) : null
      )
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">My Appointments</h1>
          <p className="text-sm text-slate-400 font-bold mt-1">View and manage your upcoming and past medical appointments.</p>
        </div>
        <Link href="/book-appointment">
           <Button icon={FiPlus} size="sm" className="px-6 shadow-lg shadow-green-100">Book Appointment</Button>
        </Link>
      </div>

      <div className="flex items-center gap-8 border-b border-slate-100">
        {["all", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-black uppercase tracking-widest transition-all relative
              ${activeTab === tab ? 'text-[#16A34A]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab === "all" ? "All Appointments" : tab === "upcoming" ? "Upcoming" : "Past"}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#16A34A] animate-slide-in" />}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-sm bg-white">
        <CardContent>
          <Table 
            columns={columns} 
            data={activeTab === "all" ? appointments : appointments.filter(a => a.status.toLowerCase() === activeTab)} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
