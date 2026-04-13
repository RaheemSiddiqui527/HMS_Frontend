"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FiUser, FiCamera, FiMail, FiPhone, FiActivity, FiLogOut, FiSave, FiClock } from "react-icons/fi";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DoctorProfilePage() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in py-2 pb-32">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-black text-[#111827]">Doctor Profile</h1>
      </div>

      {/* Personal Information */}
      <Card className="rounded-[3rem] border-none shadow-sm p-8 sm:p-12 space-y-10 bg-white">
        <div className="space-y-6">
           <CardTitle>Personal Information</CardTitle>
           <p className="text-xs text-slate-400 font-bold leading-none -mt-4">Update your photo and personal details here.</p>
           
           <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
              <div className="relative group">
                 <div className="w-24 h-24 rounded-3xl bg-[#16A34A] p-0.5 shadow-2xl shadow-green-900/10">
                    <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=16A34A&color=fff" className="w-full h-full object-cover rounded-[1.4rem]" alt="Avatar" />
                 </div>
                 <button className="absolute -bottom-2 -right-2 p-2.5 bg-white rounded-xl shadow-xl border border-slate-50 text-[#16A34A] hover:scale-110 transition-transform">
                    <FiCamera size={16} />
                 </button>
              </div>
              <Button variant="secondary" size="sm" className="bg-white rounded-xl font-black border-slate-200" icon={FiCamera}>Upload New Photo</Button>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest hidden sm:block">JPG, GIF or PNG. Max size of 800K</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Full Name" defaultValue="Dr. Sarah Jenkins" icon={FiUser} />
              <Input label="Specialization" defaultValue="Cardiologist" icon={FiActivity} />
              <Input label="Email Address" defaultValue="sarah.jenkins@medicare.com" icon={FiMail} />
              <Input label="Phone Number" defaultValue="+1 (555) 123-4567" icon={FiPhone} />
           </div>
        </div>
      </Card>

      {/* Practice Settings - Availability */}
      <Card className="rounded-[3rem] border-none shadow-sm p-8 sm:p-12 space-y-10 bg-white">
        <div className="space-y-8">
           <CardTitle>Practice Settings</CardTitle>
           <p className="text-xs text-slate-400 font-bold leading-none -mt-4">Define your weekly availability and office hours.</p>
           
           <div className="space-y-4">
              {days.map((day, i) => (
                <div key={day} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-[2rem] border border-slate-50 bg-slate-50/20 group hover:border-green-100 transition-all gap-4">
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i < 5} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                      </label>
                      <span className="text-sm font-black text-[#111827]">{day}</span>
                   </div>
                   
                   <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative">
                         <input type="text" defaultValue={i < 5 ? "09:00 AM" : "--:-- --"} className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-black w-28 text-center" />
                         <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase">to</span>
                      <div className="relative">
                         <input type="text" defaultValue={i < 5 ? "05:00 PM" : "--:-- --"} className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-black w-28 text-center" />
                         <FiClock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </Card>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
         <Button 
           onClick={logout}
           variant="secondary" 
           className="w-full sm:w-auto px-10 rounded-2xl font-black text-red-500 bg-red-50 border-red-100 hover:bg-red-500 hover:text-white" 
           icon={FiLogOut}
         >
            Logout Securely
         </Button>
         <Button 
           onClick={() => {setLoading(true); setTimeout(() => setLoading(false), 1000)}}
           isLoading={loading}
           className="w-full sm:w-auto px-12 rounded-2xl font-black shadow-xl shadow-green-900/10" 
           icon={FiSave}
         >
            Save Profile Changes
         </Button>
      </div>
    </div>
  );
}
