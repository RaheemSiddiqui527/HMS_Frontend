"use client";
import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Calendar, Clock, CheckCircle2, XCircle, Search, Filter, MoreHorizontal, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { inquiryService } from '../../../../services/inquiry.service';
import { toast } from 'react-hot-toast';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const response = await inquiryService.getAllInquiries({ 
         page, 
         limit: 9, 
         status: filterStatus === 'all' ? undefined : filterStatus 
      });
      setInquiries(response.data.inquiries || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error("Failed to load enquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus, page]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await inquiryService.updateInquiryStatus(id, status);
      toast.success(`Inquiry marked as ${status}`);
      fetchInquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary-600" /> Patient Enquiries
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Manage and respond to institutional queries from the website.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-slate-100 p-1 rounded-xl flex">
                  <StatusFilterBtn active={filterStatus === 'all'} label="All" count={pagination.total} onClick={() => { setFilterStatus('all'); setPage(1); }} />
                  <StatusFilterBtn active={filterStatus === 'pending'} label="New" count={inquiries.filter(i => i.status === 'pending').length} onClick={() => { setFilterStatus('pending'); setPage(1); }} />
               </div>
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-8">
         {isLoading ? (
            <div className="p-20 text-center text-slate-400 font-black italic animate-pulse">Fetching Patient Communications...</div>
         ) : inquiries.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-6" />
               <h3 className="text-xl font-black text-slate-800 mb-2">No Enquiries Found</h3>
               <p className="text-slate-500 text-sm font-medium">When patients fill the contact form, their queries will appear here.</p>
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                  {inquiries.map((inquiry: any) => (
                     <div key={inquiry._id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group relative">
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${inquiry.status === 'pending' ? 'bg-amber-500' : inquiry.status === 'responded' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        
                        <div className="p-8">
                           <div className="flex items-center justify-between mb-6">
                              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${inquiry.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                 {inquiry.status}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                           </div>

                           <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                 <User className="w-6 h-6" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-black text-slate-900 leading-none mb-1">{inquiry.fullName}</h3>
                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inquiry.department}</div>
                              </div>
                           </div>

                           <div className="space-y-3 mb-8">
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                 <Mail className="w-4 h-4 text-slate-300" /> {inquiry.email}
                              </div>
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                                 <Phone className="w-4 h-4 text-slate-300" /> {inquiry.phoneNumber}
                              </div>
                           </div>

                           <div className="bg-slate-50 rounded-2xl p-6 mb-8 min-h-[100px]">
                              <p className="text-slate-600 text-sm font-medium leading-relaxed italic">"{inquiry.message}"</p>
                           </div>

                           <div className="flex gap-2">
                              {inquiry.status === 'pending' && (
                                 <button 
                                    onClick={() => handleStatusUpdate(inquiry._id, 'responded')}
                                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2"
                                 >
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Responded
                                 </button>
                              )}
                              <button 
                                 onClick={() => handleStatusUpdate(inquiry._id, 'closed')}
                                 className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                              >
                                 <XCircle className="w-3.5 h-3.5" /> Close
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination Controls */}
               {pagination.pages > 1 && (
                  <div className="flex items-center justify-between bg-white px-8 py-5 rounded-2xl border border-slate-200 mt-4 mb-10 shadow-sm">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Communication Page {pagination.page} of {pagination.pages}
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
                           className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-30 transition-all shadow-lg shadow-slate-200"
                        >
                           Next <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               )}
            </>
         )}
      </div>
    </div>
  );
}

function StatusFilterBtn({ active, label, count, onClick }: { active: boolean, label: string, count: number, onClick: () => void }) {
   return (
      <button 
         onClick={onClick}
         className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-tight transition-all flex items-center gap-2 ${active ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
         {label} <span className={`px-2 py-0.5 rounded-full text-[9px] ${active ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-500'}`}>{count}</span>
      </button>
   );
}
