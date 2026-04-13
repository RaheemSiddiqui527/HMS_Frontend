"use client";

import { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiFileText, FiDownload, FiCheckCircle, FiChevronRight, FiUser, FiActivity, FiMapPin } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";

export default function PatientHistoryPage() {
  const [selectedVisit, setSelectedVisit] = useState(1);

  const visits = [
    { 
      id: 1, 
      doctor: "Dr. Sarah Jenkins", 
      specialty: "Cardiology",
      date: "Oct 30, 2023", 
      notes: "Routine checkup for blood pressure monitoring. Patient reports feeling occasional dizziness when standing up fast.",
      complaints: "Patient reports occasional dizziness when standing up quickly. Mild fatigue during afternoon hours.",
      diagnosis: "Mild orthostatic hypotension. Blood pressure reading in clinic: 110/70 mmHg (sitting), dropping to 98/65 mmHg upon standing.",
      recommendations: "Advised to increase daily fluid intake and rise slowly from a seated or lying position. Review in 4 weeks.",
      medicines: [
        { name: "Lisinopril", dose: "10mg Tablet", instructions: "1x Morning (After food)" },
        { name: "Electrolyte Solution", dose: "1 Sachet", instructions: "When required" }
      ]
    },
    { 
      id: 2, 
      doctor: "Dr. Emily Carter", 
      specialty: "Dentistry",
      date: "Oct 13, 2023", 
      notes: "Annual dental cleaning and cavity check. Mild gingivitis noted in lower anterior region.",
      complaints: "Tooth sensitivity",
      diagnosis: "Mild gingivitis",
      recommendations: "Flossing daily and scaling required.",
      medicines: []
    },
  ];

  const activeVisit = visits.find(v => v.id === selectedVisit) || visits[0];

  return (
    <div className="space-y-8 animate-fade-in py-4">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#111827] tracking-tight">Medical History</h1>
        <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest">Review your past consultations, doctor notes, and prescriptions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Column: Visit List */}
        <div className="lg:col-span-4 space-y-4">
          {visits.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVisit(v.id)}
              className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all group
                ${selectedVisit === v.id ? 'border-[#16A34A] bg-white shadow-xl shadow-green-100' : 'border-slate-50 bg-white/50 hover:bg-white hover:border-slate-200'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#16A34A] border-2 border-white shadow-sm overflow-hidden">
                    {v.doctor[4]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#111827] leading-none mb-1">{v.doctor}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.specialty}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest
                  ${selectedVisit === v.id ? 'bg-[#16A34A] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {v.date}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed tracking-wide">
                {v.notes}
              </p>
            </button>
          ))}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-white p-8 rounded-[3rem] border-none shadow-sm h-full">
            {/* Detail Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
               <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 border-2 border-white shadow-md flex items-center justify-center font-bold text-2xl text-[#16A34A]">
                     {activeVisit.doctor[4]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111827]">{activeVisit.doctor}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <MdOutlineMedicalServices className="text-[#16A34A]" /> {activeVisit.specialty}
                    </p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-[#16A34A] border border-green-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                     <FiCheckCircle size={12} /> Completed Visit
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monday, {activeVisit.date} • 10:00 AM</p>
               </div>
            </div>

            {/* Consultation Notes Section */}
            <div className="space-y-8">
               <div className="space-y-4">
                  <h5 className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Consultation Notes
                  </h5>
                  <div className="bg-blue-50/30 border border-blue-50 p-6 rounded-[2rem] space-y-4">
                     <div>
                        <p className="text-xs font-black text-[#111827] mb-1">Chief Complaint:</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed">{activeVisit.complaints}</p>
                     </div>
                     <div>
                        <p className="text-xs font-black text-[#111827] mb-1">Diagnosis:</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed">{activeVisit.diagnosis}</p>
                     </div>
                     <div>
                        <p className="text-xs font-black text-[#111827] mb-1">Recommendations:</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed">{activeVisit.recommendations}</p>
                     </div>
                  </div>
               </div>

               {/* Prescribed Medicines Grid */}
               {activeVisit.medicines.length > 0 && (
                 <div className="space-y-4">
                    <h5 className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Prescribed Medicines
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {activeVisit.medicines.map((m, i) => (
                         <div key={i} className="p-5 border border-slate-100 rounded-[2rem] flex items-center gap-4 hover:border-[#16A34A] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-green-50 text-[#16A34A] flex items-center justify-center text-lg">💊</div>
                            <div>
                               <p className="text-sm font-black text-[#111827] leading-none mb-1">{m.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.dose}</p>
                               <p className="text-[10px] font-black text-[#16A34A] mt-1">{m.instructions}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {/* Documents Section */}
               <div className="space-y-4">
                  <h5 className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Documents & Prescriptions
                  </h5>
                  <div className="p-4 border border-slate-100 rounded-3xl flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg shadow-sm">
                           <FiFileText />
                        </div>
                        <div>
                           <p className="text-sm font-black text-[#111827]">Digital Prescription</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Dr_Sarah_Jenkins_Prescription_Oct30.pdf • 124 KB</p>
                        </div>
                     </div>
                     <Button variant="secondary" size="sm" icon={FiDownload} className="px-6 rounded-xl group-hover:bg-[#16A34A] group-hover:text-white group-hover:border-[#16A34A] transition-all font-black">Download</Button>
                  </div>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
