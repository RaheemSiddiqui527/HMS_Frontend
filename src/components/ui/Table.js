"use client";

import React from "react";

export default function Table({ columns, data }) {
  return (
    <div className="w-full overflow-hidden">
      {/* Desktop & Tablet View */}
      <div className="hidden sm:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-y border-slate-100">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr 
                key={i} 
                className="hover:bg-slate-50/30 transition-colors group"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-5 text-sm">
                    {col.render ? col.render(row[col.key], row) : (
                      <span className="font-medium text-slate-600">{row[col.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4 p-4">
        {data.map((row, i) => (
          <div 
            key={i} 
            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-5 relative overflow-hidden active:scale-[0.98] transition-all"
          >
             <div className="absolute top-0 left-0 w-1.5 h-full bg-[#16A34A]" />
             {columns.map((col) => (
                <div key={col.key} className="space-y-1">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{col.label}</p>
                   <div className="text-sm">
                      {col.render ? col.render(row[col.key], row) : (
                        <span className="font-bold text-[#111827]">{row[col.key]}</span>
                      )}
                   </div>
                </div>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
}
