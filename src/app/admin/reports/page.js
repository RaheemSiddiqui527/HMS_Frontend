"use client";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FiPieChart, FiTrendingUp, FiActivity, FiDollarSign, FiDownload, FiFilter, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function AdminReportsPage() {
  const reports = [
    { title: "Monthly Revenue", value: "$128,450", trend: "+14.2%", type: "up", icon: FiDollarSign, color: "bg-green-50 text-[#16A34A]" },
    { title: "New Registrations", value: "842", trend: "+8.1%", type: "up", icon: FiActivity, color: "bg-blue-50 text-blue-600" },
    { title: "Avg. Wait Time", value: "22m", trend: "-4.5%", type: "down", icon: FiPieChart, color: "bg-purple-50 text-purple-600" },
  ];

  const financialStats = [
    { label: "IPD Revenue", value: "$45,200", percent: 75 },
    { label: "OPD Revenue", value: "$32,150", percent: 65 },
    { label: "Pharmacy Sales", value: "$51,100", percent: 85 },
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2">
      <div className="flex justify-between items-center px-1">
        <div>
           <h1 className="text-3xl font-black text-[#111827] tracking-tight">System Reports</h1>
           <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest leading-none">Global Performance & Financial Analytics</p>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary" icon={FiFilter} size="sm">Filters</Button>
           <Button icon={FiDownload} size="sm" className="shadow-lg shadow-green-900/10">Export PDF</Button>
        </div>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <Card key={i} className="p-8 rounded-[2.5rem] border-none shadow-sm flex flex-col justify-between h-48 relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
               <div className={`w-14 h-14 rounded-2xl ${r.color} flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:rotate-12`}>
                  <r.icon />
               </div>
               <span className={`flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full ${r.type === 'up' ? 'bg-green-50 text-[#16A34A]' : 'bg-red-50 text-red-500'}`}>
                  {r.trend} {r.type === 'up' ? <FiArrowUpRight /> : <FiArrowDownLeft />}
               </span>
            </div>
            <div className="relative z-10">
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{r.title}</p>
               <h2 className="text-4xl font-black text-[#111827]">{r.value}</h2>
            </div>
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${r.color.split(' ')[0]} opacity-30 rounded-full blur-3xl`} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Breakdown */}
        <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-8">
           <CardTitle icon={FiTrendingUp}>Revenue Breakdown</CardTitle>
           <div className="space-y-8">
              {financialStats.map((stat, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-end">
                      <p className="text-sm font-black text-[#111827] tracking-tight">{stat.label}</p>
                      <p className="text-xs font-black text-[#16A34A]">{stat.value}</p>
                   </div>
                   <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#16A34A] rounded-full transition-all duration-1000" style={{ width: `${stat.percent}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </Card>

        {/* Insight Box */}
        <div className="space-y-6">
           <Card className="bg-[#111827] p-10 rounded-[2.5rem] text-white border-none shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="relative z-10 space-y-6">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl text-[#10B981]">💡</div>
                 <h3 className="text-2xl font-black leading-tight">Automation Impact</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">System-wide AI scheduling has reduced doctor workload by <strong>18%</strong> this month. Revenue is projected to grow by <strong>$12k</strong> in Q3.</p>
                 <Button className="w-full bg-[#16A34A] text-white h-14 rounded-2xl font-black shadow-xl shadow-green-950/20" icon={FiArrowUpRight}>
                    Review Analytics
                 </Button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
           </Card>
        </div>
      </div>
    </div>
  );
}
