"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FiSettings, FiShield, FiGlobe, FiClock } from "react-icons/fi";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in mb-10">
      <h1 className="text-2xl font-black text-[#111827]">System Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle icon={FiSettings}>General Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Hospital Name" defaultValue="MediCare Multi-Speciality" />
            <Input label="System TZ" defaultValue="UTC -5 (EST)" icon={FiClock} />
            <Select label="Default Language" options={[{value: "en", label: "English"}, {value: "es", label: "Spanish"}]} />
            <Input label="Contact email" defaultValue="admin@medicare.com" icon={FiGlobe} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle icon={FiShield}>Security & Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Two-Factor Auth", desc: "Require a code for all staff logins", active: true },
            { label: "IP Restriction", desc: "Limit access to hospital network IP range", active: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-[#111827] text-sm">{s.label}</p>
                <p className="text-xs text-slate-500 font-medium">{s.desc}</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${s.active ? "bg-[#16A34A]" : "bg-slate-200"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.active ? "right-1" : "left-1"}`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" size="lg">Discard Changes</Button>
        <Button size="lg" className="px-10">Save Configuration</Button>
      </div>
    </div>
  );
}
