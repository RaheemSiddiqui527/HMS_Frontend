"use client";

import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiDownload, FiArrowLeft, FiPrinter, FiFileText, FiMapPin, FiPhone } from "react-icons/fi";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function PatientPrescriptionDetailsPage() {
  const medicines = [
    { name: "Lisinopril", instruction: "Take after food", dosage: "10mg Tablet", frequency: "1-0-0 (Morning)", duration: "30 Days" },
    { name: "Electrolyte Solution", instruction: "Mix with 200ml water", dosage: "1 Sachet", frequency: "When required", duration: "10 Days" },
    { name: "Amlodipine", instruction: "Take before sleep", dosage: "5mg Tablet", frequency: "0-0-1 (Night)", duration: "30 Days" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8 animate-fade-in relative">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4">
        <div className="space-y-1">
          <Link href="/history" className="flex items-center gap-2 text-[10px] font-black text-[#16A34A] uppercase tracking-widest mb-2 hover:underline">
            <FiArrowLeft /> Back to Medical History
          </Link>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">Prescription Details</h1>
          <p className="text-sm text-slate-400 font-bold">Official digital prescription document for your records.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={FiPrinter} size="sm">View Report</Button>
          <Button icon={FiDownload} size="sm" className="shadow-lg shadow-green-100">Download PDF</Button>
        </div>
      </div>

      {/* Formal Prescription Document */}
      <Card className="bg-white p-10 sm:p-16 border-none shadow-2xl rounded-[3rem] overflow-hidden relative">
        {/* Document Header */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16 border-b border-slate-100 pb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#16A34A] flex items-center justify-center text-white shadow-xl shadow-green-100 p-2">
              <img src="/logo.png" alt="Hospital Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#111827] tracking-tight leading-none mb-2">MediCare General Hospital</h2>
              <div className="space-y-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                 <p className="flex items-center gap-2"><FiMapPin className="text-[#16A34A]" /> 123 Health Avenue, Medical District, NY 10001</p>
                 <p className="flex items-center gap-2"><FiPhone className="text-[#16A34A]" /> +1 (555) 123-4567 • info@medicare.com</p>
              </div>
            </div>
          </div>
          <div className="md:text-right">
             <h3 className="text-4xl font-black text-slate-200 tracking-[0.2em] mb-4">PRESCRIPTION</h3>
             <div className="space-y-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <p>Date: <span className="text-[#111827]">Oct 30, 2023</span></p>
                <p>Ref: <span className="text-[#111827]">RX-2023-8942</span></p>
             </div>
          </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
           <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h5 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                 <FiFileText className="text-[#16A34A]" /> Patient Information
              </h5>
              <div className="space-y-4">
                 {[
                   { label: "Name", val: "John Doe" },
                   { label: "Patient ID", val: "#MC-8291" },
                   { label: "Age / Gender", val: "32 Yrs / Male" },
                   { label: "Weight", val: "78 kg" },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between border-b border-slate-200/50 pb-2">
                      <span className="text-xs font-bold text-slate-400">{item.label}</span>
                      <span className="text-xs font-black text-[#111827]">{item.val}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-green-50/30 p-8 rounded-[2rem] border border-green-50">
              <h5 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                 <FiMapPin className="text-[#16A34A]" /> Doctor Information
              </h5>
              <div className="space-y-4">
                 {[
                   { label: "Name", val: "Dr. Sarah Jenkins" },
                   { label: "Department", val: "Cardiology" },
                   { label: "License No.", val: "MED-491-XYZ" },
                   { label: "Consultation", val: "In-person Visit" },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between border-b border-green-100/30 pb-2">
                      <span className="text-xs font-bold text-slate-400">{item.label}</span>
                      <span className="text-xs font-black text-[#111827]">{item.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Rx Section */}
        <div className="mb-16">
           <div className="text-5xl font-serif italic text-green-600 mb-8 select-none">Rx</div>
           <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest mb-6 px-1">Prescribed Medicines</h4>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4 rounded-l-2xl">Medicine Name</th>
                       <th className="px-6 py-4">Dosage</th>
                       <th className="px-6 py-4">Frequency</th>
                       <th className="px-6 py-4 rounded-r-2xl text-right">Duration</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {medicines.map((m, i) => (
                      <tr key={i} className="group">
                         <td className="px-6 py-8">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-green-50 text-[#16A34A] flex items-center justify-center">💊</div>
                               <div>
                                  <p className="text-sm font-black text-[#111827]">{m.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">{m.instruction}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-8">
                            <span className="text-xs font-bold text-[#111827] bg-slate-100 px-3 py-1 rounded-full">{m.dosage}</span>
                         </td>
                         <td className="px-6 py-8">
                            <span className="text-xs font-bold text-slate-500">{m.frequency}</span>
                         </td>
                         <td className="px-6 py-8 text-right">
                            <span className="text-xs font-black text-[#16A34A]">{m.duration}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Notes Area */}
        <div className="mb-16">
           <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest mb-4 px-1">Doctor Notes & Advice</h4>
           <div className="bg-orange-50/30 border-l-4 border-orange-200 p-8 rounded-r-[2rem]">
              <p className="text-sm text-slate-600 leading-[1.8] font-medium italic">
                Patient diagnosed with mild orthostatic hypotension. Advised to increase daily fluid intake (at least 2.5 liters/day) and rise slowly from a seated or lying position. Adjusting current anti-hypertensive dosage to prevent further hypotensive episodes. Strictly avoid sudden jerky movements. Schedule a review appointment in 4 weeks.
              </p>
           </div>
        </div>

        {/* Signature */}
        <div className="flex justify-end pt-12 border-t border-slate-50">
           <div className="text-center w-64">
              <div className="font-serif italic text-2xl text-slate-800 mb-2">S. Jenkins</div>
              <div className="h-px bg-slate-900 w-full mb-3" />
              <p className="text-xs font-black text-[#111827]">Dr. Sarah Jenkins</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Consultant Cardiologist</p>
           </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      </Card>
      
      <div className="h-20" /> {/* Bottom spacing */}
    </div>
  );
}
