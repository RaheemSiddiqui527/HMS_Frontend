"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiClock, FiCalendar, FiUser } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";

export default function StaffSchedulePage() {
  const schedule = [
    { doctor: "Dr. Robert Fox", specialty: "Cardiology", room: "302", shift: "08:00 AM - 04:00 PM", status: "Active" },
    { doctor: "Dr. Sarah Johnson", specialty: "Neurology", room: "204", shift: "09:00 AM - 05:00 PM", status: "On Lunch" },
    { doctor: "Dr. Michael Chen", specialty: "Pediatrics", room: "105", shift: "10:00 AM - 06:00 PM", status: "Expected" },
  ];

  const columns = [
    { key: "doctor", label: "Medical Officer", render: (v) => <span className="font-bold text-[#111827]">{v}</span> },
    { key: "specialty", label: "Department", render: (v) => <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{v}</span> },
    { key: "room", label: "Room", render: (v) => <span className="font-mono text-slate-500 text-xs">{v}</span> },
    { key: "shift", label: "Duty Hours", render: (v) => <span className="text-xs font-medium text-slate-500">{v}</span> },
    { key: "status", label: "Availability", render: (v) => (
      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
        ${v === "Active" ? "bg-green-50 text-[#16A34A]" : v === "On Lunch" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"}`}>
        {v}
      </span>
    )}
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-black text-[#111827]">Physician Schedule</h1>
      <Card className="p-0 overflow-hidden border-none shadow-sm">
        <CardContent>
          <Table columns={columns} data={schedule} />
        </CardContent>
      </Card>
    </div>
  );
}
