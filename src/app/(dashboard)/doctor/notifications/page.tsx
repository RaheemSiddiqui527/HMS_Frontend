"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Search, Info, AlertTriangle, Send, Mail, User, Clock, CheckCircle, Plus, FileText, Trash2, Edit, X, Layout, Clipboard } from 'lucide-react';
import { notificationService } from '../../../../services/notification.service';

export default function DoctorNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'alerts' | 'templates'>('alerts');
  const [isLoading, setIsLoading] = useState(true);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const [notifRes, tempRes] = await Promise.all([
        notificationService.getMyNotifications(),
        notificationService.getTemplates()
      ]);
      setNotifications(notifRes.data?.notifications || notifRes.data || []);
      setTemplates(tempRes.data?.templates || tempRes.data || []);
    } catch (error) {
      console.error('Error fetching clinical data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this clinical template?")) return;
    try {
      await notificationService.deleteTemplate(id);
      fetchAll();
    } catch (error) {
      alert("Failed to delete template");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Dynamic Header */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" /> Clinical Alert Hub
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Manage broadcasts, clinical templates, and institutional alerts.</p>
            </div>
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => {
                   setSelectedTemplate(null);
                   setShowBroadcastModal(true);
                 }}
                 className="text-[12px] font-black text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-md flex items-center gap-2"
               >
                  <Send className="w-4 h-4" /> New Announcement
               </button>
               {activeTab === 'templates' && (
                 <button 
                   onClick={() => setShowTemplateModal(true)}
                   className="text-[12px] font-black text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center gap-2"
                 >
                    <Plus className="w-4 h-4" /> Save Template
                 </button>
               )}
            </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex items-center gap-8 mt-8 border-t border-slate-50 pt-4">
            <button 
              onClick={() => setActiveTab('alerts')}
              className={`pb-4 text-[12px] font-black uppercase tracking-widest relative transition-all ${
                activeTab === 'alerts' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
               Alert Stream
               {activeTab === 'alerts' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`pb-4 text-[12px] font-black uppercase tracking-widest relative transition-all ${
                activeTab === 'templates' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
               Clinical Templates
               {activeTab === 'templates' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 rounded-full"></div>}
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold italic">Synchronizing alert registries...</div>
          ) : activeTab === 'alerts' ? (
            /* Alerts Stream View */
            notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 mt-10">
                 <Bell className="w-12 h-12 text-slate-200 mb-6" />
                 <h3 className="text-xl font-black text-slate-800">Static Registry</h3>
                 <p className="text-slate-500 text-sm font-medium mt-2">No institutional alerts or global broadcasts found.</p>
              </div>
            ) : (
              <div className="space-y-4 pb-10">
                 {notifications.map((notif: any) => (
                   <div key={notif._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex gap-5 group">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                         notif.type === 'broadcast' ? 'bg-blue-50 text-blue-600' :
                         notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                         notif.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                         {notif.type === 'broadcast' ? <Send className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[14px] md:text-[15px] font-black text-slate-900 truncate">{notif.title}</h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                               {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                         </div>
                         <p className="text-[13px] font-medium text-slate-600 leading-relaxed">{notif.message}</p>
                      </div>
                   </div>
                 ))}
              </div>
            )
          ) : (
            /* Templates Gallery View */
            templates.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 border-dashed mt-10">
                 <Clipboard className="w-12 h-12 text-slate-200 mb-6" />
                 <h3 className="text-xl font-black text-slate-800">Personal Template Registry</h3>
                 <p className="text-slate-500 text-sm font-medium mt-2">Create reusable templates for frequent rounds, medical updates, or instructions.</p>
                 <button 
                   onClick={() => setShowTemplateModal(true)}
                   className="mt-6 text-[12px] font-black text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-black transition-all"
                 >
                    Initialize First Template
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                 {templates.map((temp: any) => (
                   <div key={temp._id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition-all group flex flex-col justify-between">
                      <div>
                         <div className="flex items-start justify-between mb-4">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                              <FileText className="w-6 h-6" />
                           </div>
                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleDeleteTemplate(temp._id)}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                         </div>
                         <h4 className="text-lg font-black text-slate-900 mb-2">{temp.name}</h4>
                         <p className="text-[13px] text-slate-600 line-clamp-3 italic mb-6">"{temp.content}"</p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedTemplate(temp);
                          setShowBroadcastModal(true);
                        }}
                        className="w-full py-3 rounded-2xl bg-slate-50 text-indigo-600 font-extrabold text-[12px] hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 uppercase tracking-widest"
                      >
                         Use Template
                      </button>
                   </div>
                 ))}
              </div>
            )
          )}
        </div>
      </div>

      {showBroadcastModal && (
        <BroadcastModal 
           template={selectedTemplate}
           onClose={() => setShowBroadcastModal(false)}
           onSuccess={() => {
              setShowBroadcastModal(false);
              fetchAll();
           }}
        />
      )}

      {showTemplateModal && (
        <TemplateModal 
           onClose={() => setShowTemplateModal(false)}
           onSuccess={() => {
              setShowTemplateModal(false);
              fetchAll();
           }}
        />
      )}
    </div>
  );
}

function BroadcastModal({ template, onClose, onSuccess }: { template?: any, onClose: () => void, onSuccess: () => void }) {
   const [formData, setFormData] = useState({
     title: template?.name || '',
     message: template?.content || '',
     type: 'broadcast',
     recipientRole: ''
   });
   const [loading, setLoading] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     try {
       await notificationService.sendBroadcast(formData as any);
       onSuccess();
     } catch (err: any) {
       alert(err.message || 'Failed to send broadcast');
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-2 md:p-4 backdrop-blur-md">
       <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 duration-300">
         <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Send className="w-5 h-5 text-slate-900" /> Clinical Broadcast
            </h3>
            <button onClick={onClose} className="p-2 h-10 w-10 hover:bg-slate-100 rounded-full text-slate-400 flex items-center justify-center text-xl">
              <X className="w-5 h-5" />
            </button>
         </div>
         <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
            {template && (
               <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                  <Clipboard className="w-4 h-4 text-indigo-600" />
                  <p className="text-[11px] font-black text-indigo-700 uppercase tracking-tight">Using Template: {template.name}</p>
               </div>
            )}

            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Announcement Title *</label>
               <input 
                 required 
                 className="w-full text-sm border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-slate-800 font-bold text-slate-800 bg-slate-50"
                 value={formData.title} 
                 onChange={e => setFormData({...formData, title: e.target.value})} 
                 placeholder="e.g., General Information"
               />
            </div>
 
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Target Registry</label>
               <select 
                 className="w-full text-sm border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-slate-800 font-bold text-slate-800 bg-slate-50 appearance-none shadow-sm"
                 value={formData.recipientRole} 
                 onChange={e => setFormData({...formData, recipientRole: e.target.value})}
               >
                   <option value="">Public Registry (Global)</option>
                   <option value="patient">All Registered Patients</option>
                   <option value="doctor">Medical Residency Group</option>
               </select>
            </div>
 
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Clinical Message *</label>
               <textarea 
                 required 
                 rows={4}
                 className="w-full text-sm border border-slate-200 rounded-3xl px-6 py-4 outline-none focus:border-slate-800 font-semibold text-slate-700 resize-none bg-slate-50"
                 value={formData.message} 
                 onChange={e => setFormData({...formData, message: e.target.value})}
                 placeholder="Describe the clinical update..."
               />
            </div>
 
            <button disabled={loading} className="w-full bg-slate-900 hover:bg-black text-white font-black text-sm py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 uppercase tracking-widest">
               {loading ? 'Transmitting...' : <><Send className="w-4 h-4" /> Authorize Broadcast</>}
            </button>
         </form>
       </div>
     </div>
   );
 }

 function TemplateModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
   const [formData, setFormData] = useState({ name: '', content: '' });
   const [loading, setLoading] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     try {
       await notificationService.createTemplate(formData as any);
       onSuccess();
     } catch (err: any) {
       alert(err.message || 'Failed to save template');
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-2 md:p-4 backdrop-blur-md">
       <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
         <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-indigo-600" /> New Clinical Template
            </h3>
            <button onClick={onClose} className="p-2 h-10 w-10 hover:bg-slate-100 rounded-full text-slate-400 flex items-center justify-center text-xl">
              <X className="w-5 h-5" />
            </button>
         </div>
         <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Template Name *</label>
               <input 
                 required 
                 className="w-full text-sm border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-600 font-bold text-slate-800 bg-slate-50"
                 value={formData.name} 
                 onChange={e => setFormData({...formData, name: e.target.value})} 
                 placeholder="e.g., Blood Test Prep Instructions"
               />
            </div>
 
            <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Message Content *</label>
               <textarea 
                 required 
                 rows={5}
                 className="w-full text-sm border border-slate-200 rounded-3xl px-6 py-4 outline-none focus:border-indigo-600 font-semibold text-slate-700 resize-none bg-slate-50"
                 value={formData.content} 
                 onChange={e => setFormData({...formData, content: e.target.value})}
                 placeholder="Define the reusable message body..."
               />
            </div>
 
            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 uppercase tracking-widest">
               {loading ? 'Archiving...' : <><Plus className="w-4 h-4" /> Save to Template Registry</>}
            </button>
         </form>
       </div>
     </div>
   );
 }
