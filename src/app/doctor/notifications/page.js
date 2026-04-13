"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FiBell, FiSend, FiUsers, FiClock, FiCheckCircle, FiAlertCircle, FiMessageSquare, FiPlus, FiLayout, FiTrash2 } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";

export default function DoctorNotificationManagement() {
  const [activeTab, setActiveTab] = useState("Compose");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: "Lab Results Ready", content: "Your latest laboratory results are now available on the portal. Please review them." },
    { id: 2, name: "Pre-Surgery Fasting", content: "Reminder: Please do not consume any food or water 8 hours prior to your scheduled surgery." },
    { id: 3, name: "Health Tip: Hydration", content: "Stay healthy! Ensure you drink at least 8 glasses of water every day." },
  ]);

  const [sentNotifications] = useState([
    { id: 1, recipient: "John Doe", title: "Prescription Updated", msg: "Please collect your new prescriptions.", time: "10 mins ago", type: "Normal" },
    { id: 2, recipient: "Jane Smith", title: "Surgery Reminder", msg: "Your surgery is scheduled for 8:00 AM.", time: "2 hours ago", type: "Urgent" },
  ]);

  return (
    <div className="space-y-8 animate-fade-in py-2 pb-20">
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">Notification Center</h1>
          <p className="text-sm text-slate-400 font-bold mt-1">Send alerts and manage your message templates.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab("Compose")}
             className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'Compose' ? 'bg-[#16A34A] text-white shadow-lg shadow-green-900/10' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
           >
              Compose
           </button>
           <button 
             onClick={() => setActiveTab("Templates")}
             className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'Templates' ? 'bg-[#16A34A] text-white shadow-lg shadow-green-900/10' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
           >
              Templates
           </button>
        </div>
      </div>

      {activeTab === "Compose" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Compose Notification Form */}
          <div className="lg:col-span-5 space-y-6">
             <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white p-8 sm:p-10 space-y-8 animate-slide-up">
                <div className="space-y-6">
                   <Select label="To Patient" options={[{value: "all", label: "Broadcast to All Patients"}]} icon={FiUsers} />
                   <Select label="Use Template" options={templates.map(t => ({value: t.id, label: t.name}))} icon={FiLayout} />
                   <Input label="Headline" placeholder="e.g. Schedule Change" icon={FiBell} />
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Custom Message</label>
                      <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm text-[#111827] font-bold leading-relaxed focus:bg-white focus:ring-4 focus:ring-green-100/30 focus:border-[#16A34A] outline-none transition-all resize-none shadow-inner" placeholder="Type your message here..." />
                   </div>
                   <Button className="w-full h-14 rounded-2xl font-black shadow-lg shadow-green-900/10" icon={FiSend}>Send Notification</Button>
                </div>
             </Card>
          </div>

          {/* Sent History */}
          <div className="lg:col-span-7 space-y-6">
             <Card className="rounded-[2.5rem] border-none shadow-sm h-fit pb-6">
                <CardHeader className="p-8 pb-4"><CardTitle icon={FiMessageSquare}>Latest Communications</CardTitle></CardHeader>
                <CardContent className="px-8 space-y-4">
                   {sentNotifications.map((n, i) => (
                     <div key={i} className="p-6 rounded-[2rem] border border-slate-50 bg-white shadow-sm flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${n.type === 'Urgent' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-[#16A34A]'}`}><FiCheckCircle /></div>
                           <div>
                              <div className="flex items-center gap-3 mb-1"><h5 className="text-sm font-black text-[#111827]">{n.recipient}</h5><Badge variant="success" className="px-2 py-0.5 rounded text-[8px] font-black uppercase">{n.type}</Badge></div>
                              <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{n.msg}</p>
                           </div>
                        </div>
                        <span className="text-[10px] text-slate-300 font-bold uppercase whitespace-nowrap">{n.time}</span>
                     </div>
                   ))}
                </CardContent>
             </Card>
          </div>
        </div>
      ) : (
        /* Template Management Section */
        <div className="space-y-6 animate-slide-up">
           <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm"><FiLayout /></div>
                 <div><h3 className="text-xl font-black text-[#111827]">Message Library</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Manage reusable notification templates</p></div>
              </div>
              <Button icon={FiPlus} onClick={() => setIsTemplateModalOpen(true)}>Create New Template</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(t => (
                <Card key={t.id} className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm group hover:shadow-xl transition-all h-64 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all"><FiLayout /></div>
                      <button className="text-slate-200 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
                   </div>
                   <h5 className="text-sm font-black text-[#111827] mb-2">{t.name}</h5>
                   <p className="text-[11px] text-slate-400 font-bold leading-relaxed line-clamp-3 mb-auto">{t.content}</p>
                   <div className="pt-4 border-t border-slate-50 mt-4 flex justify-between items-center group-hover:border-green-100">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Saved Template</span>
                      <button className="text-[9px] font-black text-[#16A34A] uppercase tracking-widest hover:underline">Edit Content</button>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      )}

      {/* Template Creation Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="New Message Template"
        footer={
           <div className="flex gap-4 w-full"><Button variant="secondary" className="flex-1" onClick={() => setIsTemplateModalOpen(false)}>Cancel</Button><Button className="flex-1" onClick={() => setIsTemplateModalOpen(false)}>Save Template</Button></div>
        }
      >
        <div className="space-y-6">
           <Input label="Template Identity Name" placeholder="e.g. Appointment Welcome" icon={FiLayout} />
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Template Content Message</label>
              <textarea className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm text-[#111827] font-bold leading-relaxed focus:bg-white focus:ring-4 focus:ring-green-100/30 focus:border-[#16A34A] outline-none transition-all resize-none shadow-inner" placeholder="This message will be reused..." />
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose bg-slate-50 p-4 rounded-xl border border-slate-100">💡 Pro Tip: Reusable templates save time and ensure consistent patient communication.</p>
        </div>
      </Modal>
    </div>
  );
}
