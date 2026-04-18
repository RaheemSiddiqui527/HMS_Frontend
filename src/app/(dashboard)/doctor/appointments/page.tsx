"use client";
import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, Search, Filter, ChevronRight, ChevronLeft, MoreHorizontal, X } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';
import { authService } from '../../../../services/auth.service';
import { SearchablePatientSelect } from '../../../../components/dashboard/SearchablePatientSelect';
import { Calendar, Save, Trash, AlertCircle, Plus } from 'lucide-react';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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
      
      const apps = response.data?.appointments || [];
      setAppointments(filter === 'all' ? apps : apps.filter((a: any) => a.status === filter));
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await appointmentService.updateStatus(id, status);
      fetchAppointments();
    } catch (error) {
      alert("Status update failed");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header Area */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary-600" /> Clinical Schedule
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Manage your consultations and patient sessions.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Live Sync Active
               </div>
               <button 
                 onClick={() => setShowAddModal(true)}
                 className="text-[12px] font-black text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-md flex items-center gap-2"
               >
                  <Plus className="w-4 h-4" /> Book Consultation
               </button>
            </div>
         </div>
      </div>

      {/* Stats Dashboard */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 shrink-0">
         <div className="py-2 md:py-0 md:px-6 flex items-center justify-between md:justify-start md:gap-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Appointments</span>
            <span className="text-2xl font-black text-slate-900">{appointments.length}</span>
         </div>
         <div className="py-2 md:py-0 md:px-10 flex items-center justify-between md:justify-start md:gap-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Reviews</span>
            <span className="text-2xl font-black text-slate-900">{appointments.filter(a => a.status === 'scheduled').length}</span>
         </div>
         <div className="py-2 md:py-0 md:px-10 flex items-center justify-between md:justify-start md:gap-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed Sessions</span>
            <span className="text-2xl font-black text-slate-900">{appointments.filter(a => a.status === 'completed').length}</span>
         </div>
      </div>

      {/* Toolbar Area */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
             <FilterBtn active={filter === 'all'} label="Everything" onClick={() => setFilter('all')} />
             <FilterBtn active={filter === 'scheduled'} label="Upcoming" onClick={() => setFilter('scheduled')} />
             <FilterBtn active={filter === 'completed'} label="Done" onClick={() => setFilter('completed')} />
          </div>

          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input placeholder="Search patient name..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-primary-500 w-48 transition-all focus:w-64 bg-slate-50/50" />
             </div>
             <div className="flex items-center gap-1.5 text-slate-400 border-l pl-4 border-slate-200">
                <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Today, 24 April</span>
                <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 text-slate-400">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
               <p className="text-sm font-bold">Synchronizing with HMS Core...</p>
            </div>
         ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <CalendarIcon className="w-10 h-10 text-slate-200" />
               </div>
               <h3 className="text-lg font-black text-slate-800 mb-2">Registry is Clear</h3>
               <p className="text-slate-500 text-sm font-medium">There are no matching entries found for your professional registry today.</p>
            </div>
         ) : (
            <div className="max-w-6xl mx-auto space-y-4">
               {appointments.map((app: any) => (
                  <AppointmentCard key={app._id} appointment={app} onStatusChange={handleStatusChange} />
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

function FilterBtn({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
   return (
      <button 
         onClick={onClick}
         className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-tight transition-all ${
            active ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
         }`}
      >
         {label}
      </button>
   );
}

function AppointmentCard({ appointment, onStatusChange }: { appointment: any, onStatusChange: (id: string, st: string) => void }) {
   return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition-all group">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-lg md:text-xl overflow-hidden shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {appointment.patient?.firstName?.[0] || 'P'}
               </div>
               <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                     <h4 className="text-[14px] md:text-[15px] font-black text-slate-900 leading-none truncate">{appointment.patient?.firstName} {appointment.patient?.lastName}</h4>
                     <span className={`text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        appointment.status === 'scheduled' ? 'bg-amber-100 text-amber-600' : 
                        appointment.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                     }`}>
                        {appointment.status}
                     </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] md:text-xs font-bold text-slate-400">
                     <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     <span className="flex items-center gap-1.5 whitespace-nowrap"><CalendarIcon className="w-3.5 h-3.5" /> {new Date(appointment.date).toLocaleDateString()}</span>
                     <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 font-black text-[9px] md:text-[10px] uppercase">{appointment.appointmentType || 'Routine'}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
               {appointment.status === 'scheduled' && (
                  <>
                     <button 
                        onClick={() => onStatusChange(appointment._id, 'completed')}
                        className="flex-1 md:flex-none flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-sm"
                        title="Mark Completed"
                     >
                        <CheckCircle className="w-5 h-5" />
                        <span className="md:hidden ml-2 text-[10px] font-black uppercase">Complete</span>
                     </button>
                     <button 
                        onClick={() => onStatusChange(appointment._id, 'canceled')}
                        className="flex-1 md:flex-none flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-all border border-red-100"
                        title="Cancel Session"
                     >
                        <XCircle className="w-5 h-5" />
                        <span className="md:hidden ml-2 text-[10px] font-black uppercase">Cancel</span>
                     </button>
                  </>
               )}
               <button className="bg-slate-50 hover:bg-slate-100 text-slate-400 p-2.5 rounded-xl transition-all border border-slate-200">
                  <MoreHorizontal className="w-5 h-5" />
               </button>
            </div>
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
        <div className="bg-primary-700 px-6 py-8 md:px-8 md:py-10 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
              <X className="w-5 h-5" />
           </button>
           <div className="flex items-center gap-4 mb-2 md:mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                 <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h1 className="text-xl md:text-2xl font-black italic">Admission</h1>
           </div>
           <p className="text-primary-100/70 font-medium text-[11px] md:text-sm">Register a walk-in appointment or offline consultation.</p>
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
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-primary-600 focus:bg-white transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time Window</label>
                 <select 
                   value={formData.timeSlot}
                   onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-primary-600 focus:bg-white transition-all appearance-none"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 text-sm font-medium outline-none focus:border-primary-600 focus:bg-white transition-all resize-none"
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
