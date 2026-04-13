"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FiUser, FiGlobe, FiPhone } from "react-icons/fi";

export default function StaffProfilePage() {
  return (
    <div className="max-w-3xl space-y-8 animate-fade-in mb-10">
      <h1 className="text-2xl font-black text-[#111827]">Account Settings</h1>
      
      <Card className="p-10">
        <div className="flex items-center gap-8 mb-10 pb-10 border-b border-slate-50">
          <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-3xl font-black text-[#16A34A]">
            JC
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#111827]">Jane Cooper</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ops Staff • EMP-8842</p>
            <div className="flex gap-4 mt-4">
              <Button size="sm">Upload Avatar</Button>
              <Button variant="ghost" size="sm" className="text-slate-400">Remove</Button>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Input label="Email Address" defaultValue="jane.cooper@medicare.com" icon={FiGlobe} />
            <Input label="Phone Number" defaultValue="+1 902 555 9934" icon={FiPhone} />
            <Input label="Department" defaultValue="Front Desk" />
            <Input label="Position" defaultValue="Senior Receptionist" />
          </div>
          <Button className="w-full" size="lg">Update Profile Information</Button>
        </form>
      </Card>
    </div>
  );
}
