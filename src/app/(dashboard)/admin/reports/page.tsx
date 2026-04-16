"use client";
import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
         <div>
            <h1 className="text-2xl font-black text-slate-800">System Reports</h1>
            <p className="text-slate-500 font-medium text-sm">Automated data analytics and performance metrics reports.</p>
         </div>
         <button className="text-[13px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Download Full Analytics
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
         <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
               <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">Financial Analytics</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">Revenue reports connected to appointments.</p>
            <div className="mt-auto h-40 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
               <span className="text-xs font-black uppercase text-slate-300">Awaiting BI Tool connection</span>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
               <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">Clinical Performance</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">Doctor appointments fulfillment reports.</p>
            <div className="mt-auto h-40 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
               <span className="text-xs font-black uppercase text-slate-300">Awaiting BI Tool connection</span>
            </div>
         </div>
      </div>
    </div>
  );
}
