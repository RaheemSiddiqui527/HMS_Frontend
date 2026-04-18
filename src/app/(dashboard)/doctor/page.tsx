"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, Calendar, X } from 'lucide-react';
import { appointmentService } from '../../../services/appointment.service';
import { authService } from '../../../services/auth.service';
import { SearchablePatientSelect } from '../../../components/dashboard/SearchablePatientSelect';

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const user = authService.getCurrentUser();
      if (!user || !user.id) return;

      const response = await appointmentService.getAppointments({ 
        userId: user.id,
        role: 'doctor' 
      });
      
      // Backend returns { success: true, data: { appointments: [], ... } }
      const apps = response.data?.appointments || [];
      setAppointments(apps);
      
      setStats({
         total: apps.length,
         pending: apps.filter((a: any) => a.status === 'scheduled' || a.status === 'pending').length,
         completed: apps.filter((a: any) => a.status === 'completed').length
      });
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
     try {
        await appointmentService.updateStatus(id, status);
        fetchAppointments();
     } catch (error) {
        alert("Failed to update status");
     }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Top ActionBar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <CalendarIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-extrabold text-slate-800 text-[19px]">Clinical Schedule</div>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">Live Sync Active</span>
           </div>
           <button 
             onClick={() => setShowAddModal(true)}
             className="text-[13px] font-extrabold text-white bg-slate-900 border border-slate-900 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-black transition-all shadow-sm"
           >
             <Plus className="w-4 h-4" /> Book Consultation
           </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-slate-200 bg-white shrink-0">
         <div className="p-6 border-r border-slate-100 flex items-center justify-between">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Appointments</div>
            <div className="text-xl font-black text-slate-900">{stats.total}</div>
         </div>
         <div className="p-6 border-r border-slate-100 flex items-center justify-between">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-amber-500">Pending Reviews</div>
            <div className="text-xl font-black text-slate-900">{stats.pending}</div>
         </div>
         <div className="p-6 flex items-center justify-between">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-emerald-500">Completed Sessions</div>
            <div className="text-xl font-black text-slate-900">{stats.completed}</div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
         {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold text-sm">
               Synchronizing clinical data...
            </div>
         ) : appointments.length === 0 ? (
            <div className="max-w-md mx-auto mt-20 text-center">
               <div className="w-20 h-20 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="w-10 h-10 text-slate-200" />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-2">Clear Schedule</h3>
               <p className="text-slate-500 font-medium">You have no upcoming consultations scheduled for today.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-8">
               {appointments.map((app: any) => (
                  <div key={app._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group">
                     <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-lg">
                              {app.patient?.firstName?.[0] || 'P'}
                           </div>
                           <div>
                              <h4 className="text-[15px] font-black text-slate-900">{app.patient?.firstName} {app.patient?.lastName}</h4>
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                 <Clock className="w-3 h-3" /> {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {app.appointmentType || 'Consultation'}
                              </div>
                           </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                           app.status === 'scheduled' ? 'bg-amber-100 text-amber-700' :
                           app.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                           {app.status}
                        </span>
                     </div>
                     
                     <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                        <p className="text-[12px] font-bold text-slate-500 line-clamp-1 italic">
                           Reason: {app.reason || 'Routine check-up'}
                        </p>
                     </div>

                     <div className="flex items-center gap-2">
                        {app.status === 'scheduled' && (
                           <>
                              <button 
                                 onClick={() => handleUpdateStatus(app._id, 'completed')}
                                 className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-black py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                              >
                                 <CheckCircle className="w-4 h-4" /> Complete Session
                              </button>
                              <button 
                                 onClick={() => handleUpdateStatus(app._id, 'canceled')}
                                 className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-[12px] font-black py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                              >
                                 <XCircle className="w-4 h-4" /> Cancel
                              </button>
                           </>
                        )}
                        {app.status === 'completed' && (
                           <button className="w-full bg-slate-900 text-white text-[12px] font-black py-2.5 rounded-xl flex items-center justify-center gap-2">
                              View Case History
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         )}
       {showAddModal && (
          <AddAppointmentModal 
            onClose={() => setShowAddModal(false)} 
            onSuccess={() => {
               setShowAddModal(false);
               fetchAppointments();
            }} 
          />
       )}
      </div>
    </div>
  );
}

function AddAppointmentModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 09:30 AM',
    reason: '',
    appointmentType: 'Routine'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientId) return alert("Please select a patient");

    try {
      setIsSubmitting(true);
      const user = authService.getCurrentUser();
      await appointmentService.createAppointment({
        ...formData,
        doctorId: user.id
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Booking failed. Please check slot availability.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500 max-h-[95vh] flex flex-col">
        <div className="bg-slate-900 px-6 py-8 md:px-8 md:py-10 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
              <X className="w-5 h-5" />
           </button>
           <div className="flex items-center gap-4 mb-2 md:mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                 <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h1 className="text-xl md:text-2xl font-black italic">Admission</h1>
           </div>
           <p className="text-slate-300 font-medium text-[11px] md:text-sm tracking-tight">Register a walk-in appointment or offline consultation.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 md:space-y-6 overflow-y-auto flex-1">
           <SearchablePatientSelect onSelect={(id) => setFormData({...formData, patientId: id})} />

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Date</label>
                 <input 
                   type="date" 
                   required
                   value={formData.date}
                   onChange={(e) => setFormData({...formData, date: e.target.value})}
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-slate-800 focus:bg-white transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time Window</label>
                 <select 
                   value={formData.timeSlot}
                   onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-slate-800 focus:bg-white transition-all appearance-none bg-white"
                 >
                    {['09:00 AM - 09:30 AM', '10:00 AM - 10:30 AM', '11:00 AM - 11:30 AM', '02:00 PM - 02:30 PM', '04:00 PM - 04:30 PM'].map(slot => (
                       <option key={slot} value={slot}>{slot}</option>
                    ))}
                 </select>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Notes / Reason</label>
              <textarea 
                placeholder="Briefly describe the clinical reason for visit..."
                rows={3}
                required
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 text-sm font-medium outline-none focus:border-slate-800 focus:bg-white transition-all resize-none"
              ></textarea>
           </div>

           <div className="pt-4 flex items-center gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all uppercase tracking-widest"
              >
                 Abort
              </button>
              <button 
                disabled={isSubmitting}
                className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white font-black text-[13px] hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50"
              >
                 {isSubmitting ? 'Finalizing Registry...' : 'Confirm Admission'}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
}
