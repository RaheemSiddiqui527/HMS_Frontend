"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Calendar as CalendarIcon, User, Clock, Shield, Pill, FileText, Heart, Activity } from 'lucide-react';
import { appointmentService } from '../../../services/appointment.service';
import { medicalService } from '../../../services/medical.service';

export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [appData, prescData] = await Promise.all([
        appointmentService.getAppointments({ role: 'patient' }),
        medicalService.getPrescriptions({ limit: 3 })
      ]);
      setAppointments(appData.data || []);
      setPrescriptions(prescData.data || []);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nextAppointment = appointments.find(a => a.status === 'scheduled');

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-extrabold text-slate-800 text-[19px]">Patient Health Portal</div>
        </div>
        <button className="text-[13px] font-extrabold text-white bg-blue-600 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-blue-700 transition-all shadow-md">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
         {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold text-sm italic">
               Retrieving personal medical records...
            </div>
         ) : (
            <div className="max-w-6xl mx-auto space-y-6">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Status Card & Hero */}
                  <div className="lg:col-span-2 space-y-6">
                     <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5" />
                        <div className="relative z-10 flex flex-col h-full">
                           <div className="mb-8">
                              <h2 className="text-3xl font-black mb-2">Good Day, Patient</h2>
                              <p className="text-slate-400 font-medium">Your medical profile is 100% up to date. Stay healthy!</p>
                           </div>
                           
                           <div className="mt-auto grid grid-cols-3 gap-4">
                              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                 <div className="text-[10px] font-black uppercase text-white/60 mb-1">Blood Type</div>
                                 <div className="text-lg font-black italic">O Positive</div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                 <div className="text-[10px] font-black uppercase text-white/60 mb-1">Height</div>
                                 <div className="text-lg font-black">182 cm</div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                 <div className="text-[10px] font-black uppercase text-white/60 mb-1">Weight</div>
                                 <div className="text-lg font-black">78 kg</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                           <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4">
                              <CalendarIcon className="w-5 h-5 text-blue-600" /> Upcoming Appointment
                           </h3>
                           {nextAppointment ? (
                              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                 <div>
                                    <div className="font-black text-slate-900 text-sm">Dr. {nextAppointment.doctor?.firstName}</div>
                                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-1">
                                       <Clock className="w-3 h-3" /> {new Date(nextAppointment.date).toLocaleDateString()}
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div className="bg-white px-2 py-1 rounded-lg text-[10px] font-black text-blue-600 shadow-xs border border-blue-50">CONFIRMED</div>
                                 </div>
                              </div>
                           ) : (
                              <p className="text-slate-400 font-bold text-sm py-4">No scheduled visits in your schedule.</p>
                           )}
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                           <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4">
                              <Pill className="w-5 h-5 text-purple-600" /> Active Prescriptions
                           </h3>
                           <div className="space-y-3">
                              {prescriptions.length > 0 ? (
                                 prescriptions.map((pr, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                          <Shield className="w-4 h-4 text-purple-600" />
                                       </div>
                                       <div className="min-w-0">
                                          <div className="text-[13px] font-black text-slate-900 truncate">Generic Med {i+1}</div>
                                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">1 Capsule • Daily</div>
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <p className="text-slate-400 font-bold text-sm py-4">No active prescriptions found.</p>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Sidebar Components */}
                  <div className="space-y-6">
                     <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-black text-slate-900 text-sm mb-4 uppercase tracking-widest">Medical Hub</h3>
                        <div className="space-y-2">
                           <HubItem icon={<FileText className="w-4 h-4"/>} label="Health History" color="text-indigo-600" />
                           <HubItem icon={<Heart className="w-4 h-4"/>} label="Vitals & Logs" color="text-red-500" />
                           <HubItem icon={<Activity className="w-4 h-4"/>} label="Lab Results" color="text-emerald-600" />
                        </div>
                     </div>

                     <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl">
                        <h4 className="font-black text-lg mb-2">Emergency Access</h4>
                        <p className="text-blue-100 text-xs font-medium mb-4 leading-relaxed">Share your medical profile with emergency responders instantly.</p>
                        <button className="w-full bg-white/20 hover:bg-white/30 text-white rounded-xl py-2.5 text-[12px] font-black transition-colors backdrop-blur-md border border-white/20">
                           Generate SOS QR Code
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

function HubItem({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
   return (
      <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
         <div className="flex items-center gap-3">
            <span className={color}>{icon}</span>
            <span className="text-[13px] font-bold text-slate-700">{label}</span>
         </div>
         <Plus className="w-3 h-3 text-slate-300 group-hover:text-slate-800 transition-colors" />
      </button>
   );
}
