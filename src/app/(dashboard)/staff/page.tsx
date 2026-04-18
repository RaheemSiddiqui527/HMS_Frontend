"use client";
import React, { useEffect, useState } from 'react';
import { Building2, Calendar, Users, Clock, Search, Filter, Plus, FileText, CheckCircle } from 'lucide-react';
import { appointmentService } from '../../../services/appointment.service';

export default function StaffDashboardPage() {
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await appointmentService.getAppointments({ limit: 5 });
      setRecentAppointments(data.data || []);
    } catch (error) {
      console.error('Error fetching staff dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center border border-purple-100">
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-extrabold text-slate-800 text-[19px]">Hospital Operations</div>
        </div>
        <div className="flex gap-2">
           <button className="text-[13px] font-extrabold text-slate-700 bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
             Generate Daily Log
           </button>
           <button className="text-[13px] font-extrabold text-white bg-purple-600 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-purple-700 transition-all shadow-md">
             <Plus className="w-4 h-4" /> Register Patient
           </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <OperationalCard title="Pending Check-ins" value="14" icon={<Clock className="text-amber-500"/>} color="border-amber-100" />
            <OperationalCard title="Expected Today" value="48" icon={<Calendar className="text-blue-500"/>} color="border-blue-100" />
            <OperationalCard title="Active In-patients" value="12" icon={<Users className="text-purple-500"/>} color="border-purple-100" />
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
               <div>
                  <h3 className="font-black text-slate-800 text-[16px]">Facility Registry Flow</h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Real-time Appointment Monitoring</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="relative">
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                     <input placeholder="Fast search..." className="pl-9 pr-4 py-2 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:border-purple-300 w-48" />
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                     <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Patient / Type</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Provider</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Time</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {isLoading ? (
                        <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-bold italic">Loading operational queue...</td></tr>
                     ) : recentAppointments.length === 0 ? (
                        <tr><td colSpan={4} className="p-20 text-center text-slate-300 font-black">REGISTRY CLEAR</td></tr>
                     ) : (
                        recentAppointments.map((app: any) => (
                           <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                 <div className="text-[13px] font-black text-slate-900">{app.patient?.firstName} {app.patient?.lastName}</div>
                                 <div className="text-[10px] font-bold text-slate-400 uppercase">{app.appointmentType || 'General'}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="text-[13px] font-bold text-slate-700">Dr. {app.doctor?.firstName} {app.doctor?.lastName}</div>
                                 <div className="text-[10px] font-semibold text-slate-400">{app.doctor?.specialization}</div>
                              </td>
                              <td className="px-6 py-4 text-[12px] font-black text-slate-500">
                                 {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                                    app.status === 'scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                 }`}>
                                    {app.status}
                                 </span>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            <div className="p-4 border-t border-slate-50 text-center">
               <button className="text-[11px] font-black text-purple-600 hover:text-purple-800 transition-colors uppercase tracking-widest">View Full Facility Schedule</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function OperationalCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
   return (
      <div className={`bg-white rounded-2xl border-2 ${color} p-6 shadow-sm flex items-center justify-between`}>
         <div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-2xl font-black text-slate-900">{value}</div>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
            {icon}
         </div>
      </div>
   );
}
