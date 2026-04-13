"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiSearch, FiUser, FiActivity, FiPhone, FiCalendar, FiDroplet, FiAlertCircle, FiLink, FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DoctorPatientManagement() {
  const [selectedPatient, setSelectedPatient] = useState({
    id: "#PT-8472",
    name: "Emma Watson",
    age: "28 Years",
    gender: "Female",
    blood: "O+",
    weight: "60 kg",
    history: ["Asthma", "Penicillin Allergy"],
    meds: ["Albuterol Inhaler (As needed)"]
  });

  const patients = [
    { id: "#PT-8472", name: "Emma Watson", phone: "+1 (555) 123-4567", lastVisit: "Oct 12, 2023" },
    { id: "#PT-5931", name: "Michael Chen", phone: "+1 (987) 654-3210", lastVisit: "Oct 10, 2023" },
    { id: "#PT-3309", name: "David Miller", phone: "+1 (555) 987-1234", lastVisit: "Sep 28, 2023" },
    { id: "#PT-1124", name: "Sarah Parker", phone: "+1 (444) 987-6543", lastVisit: "Sep 15, 2023" },
    { id: "#PT-7782", name: "James Wilson", phone: "+1 (333) 555-7777", lastVisit: "Aug 22, 2023" },
  ];

  const columns = [
    { key: "name", label: "Patient Name", render: (v, row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-[#16A34A] border border-white shadow-sm overflow-hidden">
           <img src={`https://ui-avatars.com/api/?name=${v}&background=f1f5f9&color=16A34A`} alt={v} />
        </div>
        <div>
          <p className="text-sm font-black text-[#111827] leading-none mb-1">{v}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.id}</p>
        </div>
      </div>
    )},
    { key: "phone", label: "Phone Number", render: (v) => <span className="text-xs font-bold text-slate-500">{v}</span> },
    { key: "lastVisit", label: "Last Visit", render: (v) => <span className="text-xs font-black text-[#111827] uppercase tracking-tighter">{v}</span> },
    { key: "actions", label: "Action", render: () => (
      <Button variant="secondary" size="sm" className="px-5 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-[#16A34A] hover:text-white border-slate-100">View Details</Button>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in py-2 pb-20">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-2xl font-black text-[#111827]">Patient Management</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left: Patient List */}
        <div className="xl:col-span-8 space-y-6">
           <div className="flex justify-end pr-1">
              <div className="relative group w-full max-w-sm">
                 <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#16A34A] transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search by name, phone or ID..." 
                   className="w-full h-12 bg-white border border-slate-100 rounded-3xl pl-12 pr-4 text-xs font-bold text-[#111827] outline-none shadow-sm"
                 />
              </div>
           </div>
           
           <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
             <Table columns={columns} data={patients} />
           </Card>
        </div>

        {/* Right: Quick Detail View */}
        <div className="xl:col-span-4 h-full">
           <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden flex flex-col sticky top-24">
              <div className="p-8 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-[#16A34A] p-0.5 shadow-xl shadow-green-900/10">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${selectedPatient.name}&background=16A34A&color=fff`} 
                      className="w-full h-full object-cover rounded-[1.4rem]" 
                      alt="Avatar" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#111827] leading-none mb-1">{selectedPatient.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Patient ID: {selectedPatient.id}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <FiUser className="text-[#16A34A]" /> Personal Information
                    </p>
                    <div className="grid grid-cols-2 gap-y-6">
                       <div>
                         <p className="text-[10px] font-black text-slate-400 leading-none mb-1 uppercase">Age</p>
                         <p className="text-sm font-black text-[#111827]">{selectedPatient.age}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-slate-400 leading-none mb-1 uppercase">Gender</p>
                         <p className="text-sm font-black text-[#111827]">{selectedPatient.gender}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-slate-400 leading-none mb-1 uppercase">Blood Group</p>
                         <p className="text-sm font-black text-[#16A34A]">{selectedPatient.blood}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-slate-400 leading-none mb-1 uppercase">Weight</p>
                         <p className="text-sm font-black text-[#111827]">{selectedPatient.weight}</p>
                       </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-50" />

                  <div>
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FiActivity className="text-[#16A34A]" /> Medical History
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {selectedPatient.history.map(h => (
                          <Badge key={h} variant="info" className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-green-50 text-[#16A34A] border-green-100/50">
                             {h}
                          </Badge>
                        ))}
                     </div>
                  </div>

                  <div>
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FiAlertCircle className="text-[#16A34A]" /> Current Medications
                     </p>
                     <div className="space-y-2">
                        {selectedPatient.meds.map(m => (
                          <div key={m} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                             <FiLink className="text-[#16A34A]" />
                             <p className="text-[11px] font-black text-[#111827] leading-none">{m}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50/50">
                 <Button className="w-full rounded-2xl h-14 font-black shadow-lg shadow-green-900/10" icon={FiArrowRight}>View Detailed Records</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
