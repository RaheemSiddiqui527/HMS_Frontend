"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input, { Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FiCalendar, FiPlus, FiUser, FiSearch, FiClock } from "react-icons/fi";

export default function StaffAppointmentsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#111827]">Patient Check-in</h1>
        <Button variant="secondary" icon={FiSearch} size="sm">Existing Records</Button>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle icon={FiPlus}>New Appointment Intake</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h4 className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest pl-1">Identification</h4>
              <Input label="Search Patient" placeholder="Name, ID or Mobile..." icon={FiSearch} />
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#16A34A] font-black text-xs">GH</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111827]">Guy Hawkins</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PATIENT-ID: CMS-102</p>
                </div>
                <FiUser className="text-slate-300" />
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest pl-1">Consultation</h4>
              <Select label="Physician" options={[{value: "1", label: "Dr. Sarah Johnson (Neurology)"}, {value: "2", label: "Dr. Robert Fox (Cardiology)"}]} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Date" type="date" icon={FiCalendar} />
                <Select label="Slot Time" options={[{value: "1", label: "10:30 AM"}, {value: "2", label: "11:00 AM"}]} />
              </div>
            </div>
          </div>

          <Textarea label="Intake Notes / Symptoms" placeholder="Describe the reason for visit..." />

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <Button className="flex-1" size="lg">Confirm Booking</Button>
            <Button variant="secondary" className="flex-1" size="lg" icon={FiClock}>Waitlist Patient</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
