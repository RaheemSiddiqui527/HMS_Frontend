"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FiTrendingUp, FiUsers, FiDollarSign, FiClock, FiDownload, FiArrowUpRight, FiPieChart, FiActivity } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function DoctorReportsPage() {
  const stats = [
    { title: "Net Earnings", value: "$8,450", trend: "+12.5%", icon: FiDollarSign, color: "bg-green-50 text-[#16A34A]" },
    { title: "Consultations", value: "142", trend: "+8.3%", icon: FiActivity, color: "bg-blue-50 text-blue-600" },
    { title: "New Patients", value: "48", trend: "+15.2%", icon: FiUsers, color: "bg-purple-50 text-purple-600" },
    { title: "Avg. Visit", value: "22m", trend: "-2m", icon: FiClock, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="space-y-10 animate-fade-in py-4 pb-20 px-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">Clinical Analytics</h1>
          <p className="text-sm text-slate-400 font-bold mt-1">Detailed performance metrics for your medical practice.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={FiDownload} className="rounded-2xl font-black text-xs uppercase px-8">Export Data</Button>
          <Button icon={FiTrendingUp} className="rounded-2xl font-black text-xs uppercase px-8 shadow-xl shadow-green-900/10">Yearly Review</Button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-8 rounded-[2.5rem] border-none shadow-sm flex flex-col justify-between h-52 transition-all hover:shadow-2xl group">
            <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-2xl shadow-sm border border-black/5 group-hover:scale-110 transition-transform`}>
               <s.icon />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">{s.title}</p>
                 <span className="text-[9px] font-black text-[#16A34A] bg-green-50 px-2 py-0.5 rounded-lg">{s.trend}</span>
               </div>
               <h2 className="text-3xl font-black text-[#111827] leading-none">{s.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Chart Placeholder (Visual Component) */}
        <Card className="lg:col-span-2 rounded-[3.5rem] border-none shadow-sm p-10 space-y-8 bg-white min-h-[450px]">
           <div className="flex justify-between items-center">
             <CardTitle icon={FiTrendingUp}>Revenue Visualization</CardTitle>
             <div className="flex gap-2">
                <span className="px-4 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-slate-100">Monthly breakdown</span>
             </div>
           </div>
           
           <div className="flex-1 flex flex-col justify-end gap-1 px-4 min-h-[300px]">
              <div className="flex items-end justify-between h-64 gap-3 sm:gap-6">
                 {[40, 70, 45, 90, 65, 80, 55, 100, 85, 75, 60, 95].map((h, i) => (
                   <div key={i} className="flex-1 space-y-3 group cursor-pointer">
                      <div 
                        className="w-full bg-slate-50 group-hover:bg-[#16A34A] transition-all rounded-xl relative" 
                        style={{ height: `${h}%` }}
                      >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           ${h * 85}
                         </div>
                      </div>
                      <p className="text-[9px] font-black text-slate-300 uppercase text-center">{['J','F','M','A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</p>
                   </div>
                 ))}
              </div>
           </div>
        </Card>

        {/* Insight Panel */}
        <div className="space-y-8 h-full">
           <Card className="bg-[#111827] p-10 rounded-[3rem] text-white border-none shadow-2xl h-full flex flex-col justify-between">
              <div>
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white text-2xl mb-8">
                    <FiPieChart />
                 </div>
                 <h4 className="text-2xl font-black mb-4 leading-tight">AI Clinical Insight</h4>
                 <p className="text-slate-400 font-bold text-sm leading-relaxed mb-10">Your patient retention rate has increased by <span className="text-[#16A34A] font-black">12.5%</span> this month. Most consultations are for cardiology follow-ups.</p>
              </div>
              <Button variant="ghost" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-black h-14 rounded-2xl" icon={FiArrowUpRight}>Full Report PDF</Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
