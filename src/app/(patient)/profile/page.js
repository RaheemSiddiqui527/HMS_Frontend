"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input, { Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FiUser, FiMail, FiPhone, FiCalendar, FiDroplet, FiAlertCircle, FiShield, FiLogOut, FiEdit3, FiActivity, FiLock } from "react-icons/fi";

export default function PatientProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-2 px-4 space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-black text-[#111827] tracking-tight">Patient Profile</h1>
      </div>

      {/* Profile Header Card */}
      <Card className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-none shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div className="w-20 h-20 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
           JD
        </div>
        <div className="text-center md:text-left">
           <h2 className="text-xl font-black text-[#111827] mb-1">Patient Profile</h2>
           <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><FiMail className="text-[#16A34A]" /> patient@medicare.com</span>
              <span className="flex items-center gap-1.5"><FiPhone className="text-[#16A34A]" /> +1 (555) 123-4567</span>
           </div>
        </div>
        <div className="md:ml-auto">
           <Button variant="secondary" icon={FiEdit3} size="sm" className="rounded-xl font-black px-6 border-slate-200">Edit Profile</Button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Personal Info & Account Settings */}
        <div className="space-y-6 flex flex-col">
          <Card className="rounded-[2rem] border-none shadow-sm flex-1">
            <CardHeader className="px-6 pt-6">
              <CardTitle icon={FiUser} className="text-sm">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-4">
              <Input label="Full Name" defaultValue="John Doe" icon={FiUser} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email Address" defaultValue="john.doe@example.com" icon={FiMail} />
                <Input label="Phone Number" defaultValue="+1 (555) 123-4567" icon={FiPhone} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Gender" options={[{value: "m", label: "Male"}, {value: "f", label: "Female"}]} />
                <Input label="Date of Birth" type="date" defaultValue="1990-05-15" icon={FiCalendar} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader className="px-6 pt-6">
              <CardTitle icon={FiShield} className="text-sm">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-3">
               <div className="p-5 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-[#111827]">Password & Security</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Manage your account protection</p>
                  </div>
                  <Button variant="secondary" size="sm" className="font-black h-9 px-4 rounded-lg bg-white border-slate-200">Change</Button>
               </div>
               <div className="p-5 bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500"><FiActivity size={16}/></div>
                    <div>
                      <p className="text-xs font-black text-[#111827]">Active Sessions</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Login activity on this device</p>
                    </div>
                  </div>
                  <button onClick={logout} className="text-[11px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest px-2">Logout</button>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Medical Info */}
        <Card className="rounded-[2rem] border-none shadow-sm flex flex-col h-full">
          <CardHeader className="px-6 pt-6">
            <CardTitle icon={FiActivity} className="text-sm text-[#16A34A]">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6 flex-1">
             <div className="grid grid-cols-2 gap-4">
                <Select label="Blood Group" options={[{value: "o", label: "O Positive (O+)"}]} icon={FiDroplet} />
                <Input label="Emergency Contact" defaultValue="+1 (555) 987-6543" icon={FiPhone} />
             </div>
             <Input label="Allergies" defaultValue="Penicillin, Peanuts" icon={FiAlertCircle} />
             <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Existing Diseases / Conditions</label>
                <textarea 
                  className="flex-1 w-full min-h-[220px] p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm text-[#111827] font-bold leading-relaxed focus:bg-white focus:ring-4 focus:ring-green-100/30 focus:border-[#16A34A] focus:outline-none transition-all resize-none shadow-inner"
                  defaultValue="Mild Asthma, Hypertension (diagnosed 2021). Currently taking Lisinopril."
                />
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Branding Area */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-8 border-t border-slate-100 mt-4 h-fit">
         <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Record ID: #MC-9291</p>
         <div className="flex gap-3">
            <Button variant="secondary" className="px-8 rounded-xl font-black bg-white">Cancel</Button>
            <Button className="px-8 rounded-xl font-black shadow-lg shadow-green-900/10">Save Changes</Button>
         </div>
      </div>
    </div>
  );
}
