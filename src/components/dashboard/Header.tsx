"use client";
import React from 'react';
import { Menu, Search, Download, ChevronDown, Edit2, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();

  // Dynamic Content Mapping
  const getHeaderInfo = () => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    const mapping: Record<string, { title: string, breadcrumb: string }> = {
      'admin': { title: 'System Analytics', breadcrumb: 'System > Intelligence' },
      'users': { title: 'User Directory', breadcrumb: 'Admin > Users' },
      'doctors': { title: 'Medical Staff', breadcrumb: 'Admin > Doctors' },
      'staff': { title: 'Operational Staff', breadcrumb: 'Admin > Staff' },
      'reports': { title: 'System Metrics', breadcrumb: 'Performance > Reports' },
      'doctor': { title: 'Clinical Dashboard', breadcrumb: 'Doctor > Intelligence' },
      'appointments': { title: 'Clinical Schedule', breadcrumb: 'Doctor > Care' },
      'patients': { title: 'Patient Directory', breadcrumb: 'Records > Patients' },
      'records': { title: 'Medical Repository', breadcrumb: 'Records > History' },
      'prescriptions': { title: 'Pharmacy Orders', breadcrumb: 'Care > Prescriptions' },
      'notifications': { title: 'Professional Alerts', breadcrumb: 'System > Stream' },
      'profile': { title: 'Professional Identity', breadcrumb: 'Security > Profile' },
      'patient': { title: 'My Portal', breadcrumb: 'Care > Overview' },
    };

    return mapping[lastSegment] || { title: 'HMS Dashboard', breadcrumb: 'Access > Global' };
  };

  const info = getHeaderInfo();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 shrink-0">
       <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-100" onClick={onMenuToggle}>
             <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex flex-col">
             <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{info.breadcrumb}</div>
             <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                {info.title} <Edit2 className="w-4 h-4 text-slate-400 ml-1 cursor-pointer hover:text-primary-600 transition-colors" />
             </h1>
          </div>
       </div>

       <div className="flex items-center gap-4 sm:gap-6">
          {/* Avatar stack showing connected users/team members */}
          <div className="hidden lg:flex items-center -space-x-3 cursor-pointer">
             {[1,2,3,4].map(i => (
                <div key={i} className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-sm flex items-center justify-center text-slate-400 hover:-translate-y-1 transition-transform relative z-10">
                   <User className="w-5 h-5"/>
                </div>
             ))}
             <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[11px] font-bold text-slate-600 shadow-sm relative z-0">+4</div>
          </div>

          {/* Search box mimicking native OS command search design */}
          <div className="relative hidden md:block">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input
                type="text"
                placeholder="Search"
                className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-14 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white font-medium w-48 lg:w-72 transition-all placeholder:text-slate-400"
             />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-slate-200 text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">⌘K</div>
          </div>

          {/* Main Action buttons */}
          <div className="flex shadow-sm rounded-lg overflow-hidden">
             <button 
                onClick={() => {
                   const csvContent = "data:text/csv;charset=utf-8,Record_ID,Date,Information\n1," + new Date().toLocaleDateString() + ",Sample Data Export\n";
                   const encodedUri = encodeURI(csvContent);
                   const link = document.createElement("a");
                   link.setAttribute("href", encodedUri);
                   link.setAttribute("download", `${info.title.replace(/\\s+/g, '_')}_Export.csv`);
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
                }}
                className="bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm px-4 py-2.5 flex items-center gap-2 transition-colors border-r border-primary-800/50"
             >
               <Download className="w-4 h-4 hidden sm:block" /> Export Data
             </button>
             <button className="bg-primary-700 hover:bg-primary-800 text-white px-2 py-2.5 transition-colors">
               <ChevronDown className="w-4 h-4" />
             </button>
          </div>
       </div>
    </header>
  );
}
