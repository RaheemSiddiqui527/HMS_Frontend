"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiCalendar, FiFileText, FiLink, FiClock, FiVideo, FiArrowRight, FiBell } from "react-icons/fi";
import Link from "next/link";

export default function PatientDashboard() {
  const quickActions = [
    { title: "Book Appointment", sub: "Schedule a new visit", icon: FiCalendar, color: "bg-emerald-50 text-emerald-600", href: "/book-appointment" },
    { title: "Medical History", sub: "View past records", icon: FiFileText, color: "bg-blue-50 text-blue-600", href: "/history" },
    { title: "Prescriptions", sub: "Active medications", icon: FiLink, color: "bg-purple-50 text-purple-600", href: "/prescriptions" },
  ];

  return (
    <div className="space-y-10 animate-fade-in py-2">
      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, i) => (
          <Link key={i} href={action.href} className="group">
            <Card className="p-8 pb-10 rounded-[2.5rem] border-none shadow-sm group-hover:shadow-xl group-hover:shadow-green-900/5 transition-all duration-500 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center text-xl mb-6 shadow-sm`}>
                <action.icon />
              </div>
              <h3 className="text-sm font-black text-[#111827] mb-1 leading-none">{action.title}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{action.sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Upcoming Appointment */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-1">Upcoming Appointment</h4>
        <Card className="bg-white p-6 sm:p-10 rounded-[2.5rem] border-none shadow-sm overflow-hidden relative group">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 border-2 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
                    <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=16A34A&color=fff" alt="Doctor" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h5 className="text-lg font-black text-[#111827]">Dr. Sarah Jenkins</h5>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Cardiology + General Checkup</p>
                 </div>
              </div>
              
              <div className="h-12 w-px bg-slate-100 hidden lg:block" />

              <div className="text-center lg:text-left">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Tomorrow, Oct 24, 2023</p>
                  <p className="text-sm font-black text-[#16A34A] flex items-center justify-center lg:justify-start gap-2">
                     <FiClock className="animate-pulse" /> 10:00 AM - 10:30 AM
                  </p>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                 <Button variant="secondary" className="flex-1 lg:flex-none px-8 rounded-xl font-black bg-white border-slate-200">Reschedule</Button>
                 <Button icon={FiVideo} className="flex-1 lg:flex-none px-10 rounded-xl font-black shadow-lg shadow-green-900/10">Join Call</Button>
              </div>
           </div>
           {/* Backdrop elements */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        {/* Recent Prescriptions */}
        <Card className="rounded-[2.5rem] border-none shadow-sm h-fit">
          <CardHeader className="p-8 pb-4">
             <CardTitle className="text-sm">Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-4">
             {[
               { name: "Amoxicillin 500mg", doc: "Dr. Michael Chang", time: "2 days ago" },
               { name: "Lisinopril 10mg", doc: "Dr. Sarah Jenkins", time: "1 week ago" }
             ].map((p, i) => (
               <div key={i} className="flex items-center justify-between group cursor-pointer p-1">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:text-[#16A34A] group-hover:bg-green-50 transition-all border border-slate-50">
                        <FiLink size={18} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-[#111827] leading-none mb-1">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none">{p.doc}</p>
                     </div>
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">{p.time}</span>
               </div>
             ))}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="rounded-[2.5rem] border-none shadow-sm h-fit">
          <CardHeader className="p-8 pb-4">
             <CardTitle className="text-sm">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
             {[
               { title: "Appointment Reminder", msg: "Your appointment is tomorrow at 10:00 AM.", unread: true },
               { title: "Prescription Ready", msg: "Your prescription from Dr. Chang is available.", unread: false }
             ].map((n, i) => (
               <div key={i} className="flex items-start gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${n.unread ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-slate-200"}`} />
                  <div>
                    <p className="text-xs font-black text-[#111827] leading-none mb-1">{n.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-tight leading-relaxed">{n.msg}</p>
                  </div>
               </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
