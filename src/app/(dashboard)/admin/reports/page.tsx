"use client";
import React, { useEffect, useState } from 'react';
import { FileText, Download, TrendingUp, Users, CheckCircle, CreditCard, Activity } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';

export default function AdminReportsPage() {
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getReports();
        setReportData(data.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
           <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
           <p className="text-slate-400 font-bold text-sm">Generating System Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
         <div>
            <h1 className="text-2xl font-black text-slate-800">System Reports</h1>
            <p className="text-slate-500 font-medium text-sm">Real-time data analytics and operational performance metrics.</p>
         </div>
         <button className="text-[13px] font-extrabold text-white bg-[#185d51] px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#124a40] transition-all shadow-lg shadow-primary-900/10 active:scale-95">
            <Download className="w-4 h-4" /> Export Full Report (PDF)
         </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCard 
            title="Total Revenue" 
            value={`₹${reportData?.financial?.totalRevenue?.toLocaleString() || 0}`} 
            icon={<CreditCard className="w-5 h-5" />} 
            color="emerald" 
            subtitle="Confirmed Payments"
         />
         <StatCard 
            title="Avg. Consultation" 
            value={`₹${Math.round(reportData?.financial?.avgFee || 0)}`} 
            icon={<TrendingUp className="w-5 h-5" />} 
            color="blue" 
            subtitle="Revenue Per Patient"
         />
         <StatCard 
            title="Active Appointments" 
            value={reportData?.clinical?.total || 0} 
            icon={<Activity className="w-5 h-5" />} 
            color="indigo" 
            subtitle="Total Registered"
         />
         <StatCard 
            title="Completion Rate" 
            value={`${Math.round((reportData?.clinical?.completionRate || 0) * 100)}%`} 
            icon={<CheckCircle className="w-5 h-5" />} 
            color="purple" 
            subtitle="Fulfilled Sessions"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
         {/* Financial Breakdown */}
         <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
               <CreditCard className="w-32 h-32 text-emerald-600" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-extrabold text-slate-800 text-lg">Revenue Distribution</h3>
                  <p className="text-xs font-bold text-slate-400">Monthly financial performance tracking</p>
               </div>
            </div>

            <div className="flex-1 space-y-6">
               {reportData?.monthlyRevenue?.length > 0 ? (
                 reportData.monthlyRevenue.map((item: any, idx: number) => (
                   <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <span className="text-[13px] font-black text-slate-700">Month {item._id.month}/{item._id.year}</span>
                         <span className="text-[13px] font-black text-emerald-600">₹{item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-emerald-500 rounded-full" 
                           style={{ width: `${(item.revenue / reportData.financial.totalRevenue) * 100}%` }}
                         ></div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">No transaction history found</p>
                 </div>
               )}
            </div>
         </div>

         {/* Clinical Performance */}
         <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
               <Users className="w-32 h-32 text-blue-600" />
            </div>

            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-extrabold text-slate-800 text-lg">Top Performing Doctors</h3>
                  <p className="text-xs font-bold text-slate-400">Based on completed appointment volume</p>
               </div>
            </div>

            <div className="flex-1 space-y-5">
               {reportData?.topDoctors?.length > 0 ? (
                 reportData.topDoctors.map((doc: any, idx: number) => (
                   <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all hover:translate-x-1 cursor-default">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[13px] font-black text-blue-600 shadow-sm">
                            {idx + 1}
                         </div>
                         <div>
                            <div className="text-[13px] font-black text-slate-800">{doc.name}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Revenue Generated</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[13px] font-black text-slate-800">{doc.count} Appts</div>
                         <div className="text-[11px] font-bold text-blue-600">₹{doc.revenue.toLocaleString()}</div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">No clinical data available</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, subtitle }: any) {
  const colors: any = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
       <div className={`w-10 h-10 ${colors[color]} rounded-2xl flex items-center justify-center mb-4`}>
          {icon}
       </div>
       <div className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">{title}</div>
       <div className="text-2xl font-black text-slate-800 mt-1 mb-1">{value}</div>
       <div className="text-[11px] font-extrabold text-slate-400">{subtitle}</div>
    </div>
  );
}
