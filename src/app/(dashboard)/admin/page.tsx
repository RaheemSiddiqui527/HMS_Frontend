"use client";
import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Activity, Database, TrendingUp, AlertTriangle, AreaChart } from 'lucide-react';
import { adminService } from '../../../services/admin.service';
import { LineChart } from '../../../components/dashboard/LineChart';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-auto">
      <div className="mb-6">
         <h1 className="text-2xl font-black text-slate-800">Admin Overview</h1>
         <p className="text-slate-500 font-medium text-sm">System statistics and summary metrics connected to HMS Core.</p>
      </div>

      {!isLoadingStats && stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
             title="Total Patients"
             value={stats.totalPatients}
             icon={<Users className="w-5 h-5 text-blue-600" />}
             bgColor="bg-blue-50"
             borderColor="border-blue-100"
          />
          <StatsCard
             title="Active Doctors"
             value={stats.totalDoctors}
             icon={<Activity className="w-5 h-5 text-emerald-600" />}
             bgColor="bg-emerald-50"
             borderColor="border-emerald-100"
          />
          <StatsCard
             title="Hospital Staff"
             value={stats.totalStaff}
             icon={<UserPlus className="w-5 h-5 text-purple-600" />}
             bgColor="bg-purple-50"
             borderColor="border-purple-100"
          />
          <StatsCard
             title="System Users"
             value={stats.totalUsers}
             icon={<Database className="w-5 h-5 text-slate-600" />}
             bgColor="bg-slate-50"
             borderColor="border-slate-100"
          />
        </div>
      ) : (
         <div className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin"></div>
            Loading backend statistics...
         </div>
      )}

      {/* Placeholders for upcoming chart components */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-[320px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /> Patient Analytics</h3>
                <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded">Last 5 Days</span>
             </div>
             <LineChart 
               data={[
                 { label: 'MON', value: 12 },
                 { label: 'TUE', value: 19 },
                 { label: 'WED', value: 15 },
                 { label: 'THU', value: 25 },
                 { label: 'FRI', value: stats?.totalPatients || 20 }
               ]} 
               color="#2563eb" 
             />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-[320px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-600" /> System Activity</h3>
                <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded">Real-time</span>
             </div>
             <LineChart 
               data={[
                 { label: '08:00', value: 5 },
                 { label: '10:00', value: 25 },
                 { label: '12:00', value: 45 },
                 { label: '14:00', value: 30 },
                 { label: '16:00', value: 55 }
               ]} 
               color="#10b981" 
             />
          </div>
       </div>
    </div>
  );
}

function StatsCard({ title, value, icon, bgColor, borderColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string, borderColor: string }) {
  return (
    <div className={`p-5 rounded-2xl border ${borderColor} ${bgColor} flex items-center gap-4 transition-all shadow-sm`}>
       <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs border border-white/50 shrink-0">
          {icon}
       </div>
       <div>
          <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">{title}</div>
          <div className="text-3xl font-black text-slate-900 leading-none">{value}</div>
       </div>
    </div>
  );
}
