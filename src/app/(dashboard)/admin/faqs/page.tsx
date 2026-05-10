"use client";
import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit2, Trash2, ChevronDown, ChevronUp, Search, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { faqService } from '../../../../services/faq.service';
import { toast } from 'react-hot-toast';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0
  });

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await faqService.getAllFAQs({ page, limit: 10 });
      setFaqs(response.data.faqs || []);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to load FAQs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await faqService.updateFAQ(editingFaq._id, formData);
        toast.success("FAQ updated successfully");
      } else {
        await faqService.createFAQ(formData);
        toast.success("FAQ created successfully");
      }
      setIsModalOpen(false);
      setEditingFaq(null);
      setFormData({ question: '', answer: '', category: 'General', order: 0 });
      fetchFaqs();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await faqService.deleteFAQ(id);
      toast.success("FAQ deleted successfully");
      fetchFaqs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const openEdit = (faq: any) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      order: faq.order || 0
    });
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-primary-600" /> Manage FAQs
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Add or update frequently asked questions for patients.</p>
            </div>
            <button 
               onClick={() => { setEditingFaq(null); setFormData({ question: '', answer: '', category: 'General', order: 0 }); setIsModalOpen(true); }}
               className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-primary-600/20"
            >
               <Plus className="w-4 h-4" /> Add New FAQ
            </button>
         </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto p-8">
         {isLoading ? (
            <div className="p-20 text-center text-slate-400 font-black italic animate-pulse">Loading Clinical Intelligence...</div>
         ) : faqs.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <HelpCircle className="w-16 h-16 text-slate-200 mx-auto mb-6" />
               <h3 className="text-xl font-black text-slate-800 mb-2">No FAQs Yet</h3>
               <p className="text-slate-500 text-sm font-medium">Start adding questions that patients frequently ask.</p>
            </div>
         ) : (
            <>
               <div className="space-y-4 max-w-4xl mx-auto pb-10">
                  {faqs.map((faq) => (
                     <div key={faq._id} className="bg-white rounded-3xl border border-slate-200 p-6 flex items-start justify-between group hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 transition-all">
                        <div className="flex-1 pr-10">
                           <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 rounded-full uppercase tracking-widest">{faq.category}</span>
                              <span className="text-[10px] font-black text-slate-300">Order: {faq.order}</span>
                           </div>
                           <h3 className="text-lg font-black text-slate-900 mb-2">{faq.question}</h3>
                           <p className="text-slate-500 text-sm font-medium line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => openEdit(faq)} className="p-3 bg-slate-50 text-slate-400 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all">
                              <Edit2 className="w-4 h-4" />
                           </button>
                           <button onClick={() => handleDelete(faq._id)} className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination UI */}
               {pagination.pages > 1 && (
                  <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[2rem] border border-slate-200 mb-10 shadow-sm max-w-4xl mx-auto">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Page {pagination.page} / {pagination.pages}
                     </div>
                     <div className="flex items-center gap-2">
                        <button 
                           disabled={page === 1}
                           onClick={() => setPage(p => Math.max(1, p - 1))}
                           className="p-2 bg-slate-50 rounded-lg text-slate-400 disabled:opacity-30 hover:bg-slate-100 transition-all"
                        >
                           <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                           disabled={page >= pagination.pages}
                           onClick={() => setPage(p => p + 1)}
                           className="p-2 bg-slate-900 text-white rounded-lg hover:bg-black disabled:opacity-30 transition-all shadow-lg"
                        >
                           <ChevronRight className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               )}
            </>
         )}
      </div>

      {/* Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
               </div>
               
               <form onSubmit={handleSubmit} className="p-10 space-y-6">
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Question</label>
                     <input 
                        required
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all"
                        placeholder="e.g. How do I book an appointment?"
                     />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Answer</label>
                     <textarea 
                        required
                        rows={5}
                        value={formData.answer}
                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-6 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 transition-all resize-none"
                        placeholder="Provide a detailed answer here..."
                     ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <input 
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Order</label>
                        <input 
                           type="number"
                           value={formData.order}
                           onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all"
                        />
                     </div>
                  </div>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-3">
                     <Save className="w-4 h-4" /> {editingFaq ? 'Update FAQ' : 'Save FAQ'}
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
