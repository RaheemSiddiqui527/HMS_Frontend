"use client";
import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, Search, Filter, ChevronRight, ChevronLeft, MoreHorizontal, X, DollarSign, Stethoscope } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';
import { toast } from 'react-hot-toast';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, pages: 1, total: 0, limit: 10 });

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await appointmentService.getAppointments({ 
         status: filter === 'all' ? undefined : filter,
         page,
         limit: 10
      });
      
      setAppointments(response.data?.appointments || []);
      setPagination(response.data?.pagination || { currentPage: 1, pages: 1, total: 0, limit: 10 });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filter, page]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await appointmentService.updateStatus(id, status);
      toast.success(`Status updated to ${status}`);
      fetchAppointments();
    } catch (error: any) {
      toast.error(error.message || "Status update failed");
    }
  };

  const handleMarkPaid = async (id: string) => {
    try {
      await appointmentService.markAsPaid(id);
      toast.success("Payment recorded successfully");
      fetchAppointments();
    } catch (error: any) {
      toast.error(error.message || "Payment update failed");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header Area */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600" /> Appointments Registry
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Master registry for all clinical sessions across the hospital.</p>
            </div>
         </div>
      </div>

      {/* Toolbar Area */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
             <FilterBtn active={filter === 'all'} label="Everything" onClick={() => { setFilter('all'); setPage(1); }} />
             <FilterBtn active={filter === 'scheduled'} label="Scheduled" onClick={() => { setFilter('scheduled'); setPage(1); }} />
             <FilterBtn active={filter === 'completed'} label="Completed" onClick={() => { setFilter('completed'); setPage(1); }} />
             <FilterBtn active={filter === 'cancelled'} label="Cancelled" onClick={() => { setFilter('cancelled'); setPage(1); }} />
          </div>

          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input placeholder="Search records..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-500 w-48 transition-all focus:w-64 bg-slate-50/50" />
             </div>
          </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
         {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 text-slate-400">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
               <p className="text-sm font-bold">Accessing Secure Registry...</p>
            </div>
         ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <CalendarIcon className="w-10 h-10 text-slate-200" />
               </div>
               <h3 className="text-lg font-black text-slate-800 mb-2">No Records Found</h3>
               <p className="text-slate-500 text-sm font-medium">The system clinical registry is currently empty for the selected filters.</p>
            </div>
         ) : (
            <div className="max-w-6xl mx-auto space-y-4 pb-10">
               {appointments.map((app: any) => (
                  <AppointmentCard 
                    key={app._id} 
                    appointment={app} 
                    onStatusChange={handleStatusChange} 
                    onMarkPaid={handleMarkPaid}
                  />
               ))}

               {/* Pagination Controls */}
               {pagination.pages > 1 && (
                  <div className="flex items-center justify-between bg-white px-8 py-5 rounded-2xl border border-slate-200 mt-8 shadow-sm">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Page {pagination.currentPage} of {pagination.pages}
                     </div>
                     <div className="flex items-center gap-2">
                        <button 
                           disabled={page === 1}
                           onClick={() => setPage(p => Math.max(1, p - 1))}
                           className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
                        >
                           <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <button 
                           disabled={page >= pagination.pages}
                           onClick={() => setPage(p => p + 1)}
                           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 disabled:opacity-30 transition-all shadow-lg shadow-blue-200"
                        >
                           Next <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               )}
            </div>
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
            active ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
         }`}
      >
         {label}
      </button>
   );
}

function AppointmentCard({ appointment, onStatusChange, onMarkPaid }: { appointment: any, onStatusChange: (id: string, st: string) => void, onMarkPaid: (id: string) => void }) {
   return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition-all group">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-lg md:text-xl overflow-hidden shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {appointment.patientId?.firstName?.[0] || 'P'}
               </div>
               <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                     <h4 className="text-[14px] md:text-[15px] font-black text-slate-900 leading-none truncate">{appointment.patientId?.firstName} {appointment.patientId?.lastName}</h4>
                     <span className={`text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        appointment.status === 'scheduled' || appointment.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                        appointment.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                     }`}>
                        {appointment.status}
                     </span>
                     {appointment.paymentStatus === 'completed' ? (
                       <span className="text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-600 flex items-center gap-1">
                          <DollarSign className="w-2 h-2" /> Paid
                       </span>
                     ) : (
                       <span className="text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-400">
                          Unpaid
                       </span>
                     )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] md:text-xs font-bold text-slate-400">
                     <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> {appointment.timeSlot}</span>
                     <span className="flex items-center gap-1.5 whitespace-nowrap text-blue-600 font-extrabold"><Stethoscope className="w-3.5 h-3.5" /> Dr. {appointment.doctorId?.firstName} {appointment.doctorId?.lastName}</span>
                     <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 font-black text-[9px] md:text-[10px] uppercase">₹{appointment.consultationFee}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
               {appointment.paymentStatus !== 'completed' && appointment.status !== 'cancelled' && (
                  <button 
                    onClick={() => onMarkPaid(appointment._id)}
                    className="flex-1 md:flex-none flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-xl transition-all shadow-sm gap-2"
                    title="Mark as Paid"
                  >
                     <DollarSign className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase">Mark Paid</span>
                  </button>
               )}
               {(appointment.status === 'scheduled' || appointment.status === 'pending') && (
                  <>
                     <button 
                        onClick={() => onStatusChange(appointment._id, 'completed')}
                        className="flex-1 md:flex-none flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-sm"
                        title="Mark Completed"
                     >
                        <CheckCircle className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => onStatusChange(appointment._id, 'cancelled')}
                        className="flex-1 md:flex-none flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-all border border-red-100"
                        title="Cancel Session"
                     >
                        <XCircle className="w-5 h-5" />
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
