"use client";
import React, { useEffect, useState } from 'react';
import {
  LayoutGrid, Calendar, Folder, Mail, Phone, Bell,
  Settings, HelpCircle, Activity, ChevronDown, Plus,
  Building2, X, ChevronRight, LogOut, ChevronLeft,
  Users, Stethoscope, FileText, Pill, FileBox, Database
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const [role, setRole] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract role directly from token payload since it's locally available
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.role) {
           setRole(payload.role);
        }
      } catch (err) {
        console.error("Failed to parse token payload in sidebar");
      }
    }
  }, []);

  const handleLogout = () => {
     localStorage.removeItem('token');
     router.push('/login');
  };

  // Define navigation configuration mapped strictly to backend entities!
  const RoleMenus = {
     admin: [
       { title: 'Overview', icon: <Activity className="w-5 h-5"/>, links: [ { label: 'Dashboard Stats', href: '/admin', icon: <LayoutGrid className="w-4 h-4"/> } ] },
       { title: 'Administration', icon: <Database className="w-5 h-5"/>, links: [ { label: 'User Management', href: '/admin', icon: <Users className="w-4 h-4"/> } ] }
     ],
     doctor: [
       { title: 'Clinical', icon: <Stethoscope className="w-5 h-5"/>, links: [
          { label: 'My Dashboard', href: '/doctor', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'Appointments', href: '/doctor/appointments', icon: <Calendar className="w-4 h-4"/> },
          { label: 'My Patients', href: '/doctor/patients', icon: <Users className="w-4 h-4"/> }
       ]},
       { title: 'Records', icon: <Folder className="w-5 h-5"/>, links: [
          { label: 'Medical Records', href: '/doctor/records', icon: <FileText className="w-4 h-4"/> },
          { label: 'Prescriptions', href: '/doctor/prescriptions', icon: <Pill className="w-4 h-4"/> }
       ]}
     ],
     staff: [
       { title: 'Operations', icon: <Building2 className="w-5 h-5"/>, links: [
          { label: 'Dashboard', href: '/staff', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'Appointments Registry', href: '/staff/appointments', icon: <Calendar className="w-4 h-4"/> },
          { label: 'Patient Directory', href: '/staff/patients', icon: <Users className="w-4 h-4"/> }
       ]},
       { title: 'Management', icon: <FileBox className="w-5 h-5"/>, links: [
          { label: 'System Reports', href: '/staff/reports', icon: <FileText className="w-4 h-4"/> }
       ]}
     ],
     patient: [
       { title: 'My Details', icon: <User className="w-5 h-5"/>, links: [
          { label: 'Dashboard Overview', href: '/patient', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'My Appointments', href: '/patient/appointments', icon: <Calendar className="w-4 h-4"/> },
       ]},
       { title: 'Health Logs', icon: <Activity className="w-5 h-5"/>, links: [
          { label: 'My Medical Records', href: '/patient/records', icon: <FileText className="w-4 h-4"/> },
          { label: 'My Prescriptions', href: '/patient/prescriptions', icon: <Pill className="w-4 h-4"/> }
       ]}
     ]
  };

  const currentMenu = RoleMenus[role as keyof typeof RoleMenus] || [];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex h-full transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      {/* Primary Thin Sidebar */}
      <div className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 h-full gap-8 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="w-11 h-11 bg-primary-700 rounded-[14px] flex items-center justify-center text-white mb-2 shadow-sm cursor-pointer hover:bg-primary-800 transition-colors shrink-0">
           <Activity className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-4 w-full px-4 items-center flex-1 overflow-y-auto no-scrollbar py-2">
           {currentMenu.map((group, idx) => (
             <PrimaryIcon key={idx} icon={group.icon} active={pathname === group.links[0].href} />
           ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 w-full px-4 items-center shrink-0">
           <div className="relative mt-2">
             <PrimaryIcon icon={<Bell className="w-5 h-5"/>} active={false} />
             {/* Notification dot placeholder if needed */}
           </div>
           <PrimaryIcon icon={<Settings className="w-5 h-5"/>} active={pathname.includes('/settings')} />
           <div className="mt-4 pt-4 border-t border-slate-100 w-full flex justify-center">
             <button onClick={handleLogout} className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>

      {/* Secondary Wide Sidebar */}
      <div className="w-64 lg:w-72 bg-[#fafafa] border-r border-slate-200 h-full flex flex-col relative z-10 shrink-0">
         <div className="h-20 flex items-center px-6 border-b border-slate-200 shrink-0 relative bg-white md:bg-transparent">
            <span className="font-black text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
               SDI Care <sup className="text-[10px] font-bold text-slate-400 mt-1">®</sup>
            </span>
            <button className="md:hidden absolute right-4 p-2 text-slate-500 rounded-md hover:bg-slate-200" onClick={() => setIsOpen(false)}>
               <X className="w-5 h-5"/>
            </button>
         </div>

         {/* Facility / Role Context */}
         <div className="p-4 shrink-0">
            <div className="bg-primary-50 rounded-2xl p-3.5 flex items-center gap-3 border border-primary-100/50 shadow-xs">
               <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center shrink-0 uppercase font-black text-xs">
                 {role ? role.substring(0, 2) : <Building2 className="w-4 h-4"/>}
               </div>
               <div className="min-w-0">
                  <div className="text-[13px] font-bold text-primary-900 leading-tight truncate capitalize">{role || 'User'} Portal</div>
                  <div className="text-[11px] font-medium text-primary-600/70 truncate mt-0.5">Connected to HMS Core</div>
               </div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            {currentMenu.map((group, gIdx) => (
               <div key={gIdx} className="mb-2">
                 <NavGroup title={group.title} hasArrow={false}/>
                 <div className="space-y-1 pl-4 relative border-l border-slate-200 ml-5 py-1">
                    {group.links.map((link, lIdx) => (
                       <SubNavItem
                          key={lIdx}
                          label={link.label}
                          href={link.href}
                          active={pathname === link.href}
                       />
                    ))}
                 </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
}

function PrimaryIcon({ icon, active }: { icon: React.ReactNode, active: boolean }) {
  return (
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
      active ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-800'
    }`}>
      {icon}
    </div>
  );
}

function NavGroup({ title, hasArrow }: { title: string, hasArrow: boolean }) {
  return (
    <div className="flex items-center justify-between text-[13px] font-bold text-slate-800 cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors mb-1 group">
       <span>{title}</span>
       {hasArrow && <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />}
    </div>
  );
}

function SubNavItem({ label, href, active }: { label: string, href: string, active: boolean }) {
  return (
    <Link href={href} className="relative flex items-center">
       {/* Active dot indicator on the line */}
       {active && <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></div>}
       <div className={`block px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors w-full ${
         active ? 'text-primary-700 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
       }`}>
         {label}
       </div>
    </Link>
  );
}

// User Icon fallback
function User(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
