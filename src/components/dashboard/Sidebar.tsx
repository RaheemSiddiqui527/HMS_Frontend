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
import { authService } from '@/services/auth.service';

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

  const handleLogout = async () => {
     await authService.logout();
     router.push('/login');
  };

  // Define navigation configuration mapped strictly to backend entities!
  const RoleMenus = {
     admin: [
       { title: 'Overview', icon: <Activity className="w-5 h-5"/>, links: [
          { label: 'Dashboard Stats', href: '/admin', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'System Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4"/> }
       ]},
       { title: 'Administration', icon: <Database className="w-5 h-5"/>, links: [
          { label: 'User Directory', href: '/admin/users', icon: <Users className="w-4 h-4"/> },
          { label: 'Doctors', href: '/admin/doctors', icon: <Stethoscope className="w-4 h-4"/> },
          { label: 'Staff', href: '/admin/staff', icon: <Building2 className="w-4 h-4"/> }
       ]},
       { title: 'System', icon: <Settings className="w-5 h-5"/>, links: [
          { label: 'Notifications', href: '/admin/notifications', icon: <Bell className="w-4 h-4"/> },
          { label: 'Profile', href: '/admin/profile', icon: <Settings className="w-4 h-4"/> }
       ] }
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
       ]},
       { title: 'Personal', icon: <User className="w-5 h-5"/>, links: [
          { label: 'Notifications', href: '/doctor/notifications', icon: <Bell className="w-4 h-4"/> },
          { label: 'Profile', href: '/doctor/profile', icon: <Settings className="w-4 h-4"/> }
       ]}
     ],
     staff: [
       { title: 'Operations', icon: <Building2 className="w-5 h-5"/>, links: [
          { label: 'Dashboard', href: '/staff', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'Appointments Registry', href: '/staff/appointments', icon: <Calendar className="w-4 h-4"/> },
          { label: 'Doctor Schedules', href: '/staff/doctor-schedule', icon: <Stethoscope className="w-4 h-4"/> },
          { label: 'Patient Directory', href: '/staff/patients', icon: <Users className="w-4 h-4"/> }
       ]},
       { title: 'Management', icon: <FileBox className="w-5 h-5"/>, links: [
          { label: 'System Reports', href: '/staff/reports', icon: <FileText className="w-4 h-4"/> },
          { label: 'Notifications', href: '/staff/notifications', icon: <Bell className="w-4 h-4"/> },
          { label: 'Profile', href: '/staff/profile', icon: <Settings className="w-4 h-4"/> }
       ]}
     ],
     patient: [
       { title: 'My Portal', icon: <User className="w-5 h-5"/>, links: [
          { label: 'Dashboard', href: '/patient', icon: <LayoutGrid className="w-4 h-4"/> },
          { label: 'My Appointments', href: '/patient/appointments', icon: <Calendar className="w-4 h-4"/> },
          { label: 'Book Appointment', href: '/patient/book-appointment', icon: <Plus className="w-4 h-4"/> },
       ]},
       { title: 'Health Logs', icon: <Activity className="w-5 h-5"/>, links: [
          { label: 'Medical Records', href: '/patient/records', icon: <FileText className="w-4 h-4"/> },
          { label: 'Prescriptions', href: '/patient/prescriptions', icon: <Pill className="w-4 h-4"/> }
       ]},
       { title: 'Settings', icon: <Settings className="w-5 h-5"/>, links: [
          { label: 'Notifications', href: '/patient/notifications', icon: <Bell className="w-4 h-4"/> },
          { label: 'Profile', href: '/patient/profile', icon: <Settings className="w-4 h-4"/> }
       ]}
     ]
  };

  const currentMenu = RoleMenus[role as keyof typeof RoleMenus] || [];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex h-full transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      {/* Consolidated Unified Sidebar */}
      <div className="w-64 lg:w-72 bg-white border-r border-slate-200 h-full flex flex-col relative z-20 shrink-0 shadow-sm">
         <div className="h-20 flex items-center px-6 border-b border-slate-200 shrink-0 relative bg-white">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 shadow-md shadow-primary-100 shrink-0 border border-primary-500/20">
               <img src="/logo2.png" alt="SDI Logo" className="w-6 h-6 object-contain brightness-0 invert" />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900 flex items-center gap-1">
               SDI <span className="text-primary-600">Care</span> <sup className="text-[10px] font-bold text-slate-400 mt-1">®</sup>
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

         <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 pt-4">
            {currentMenu.map((group, gIdx) => (
               <div key={gIdx} className="mb-2">
                 <NavGroup title={group.title} hasArrow={false} icon={group.icon} />
                 <div className="space-y-1 pl-4 relative border-l border-slate-100 ml-[22px] py-1 mt-1">
                    {group.links.map((link, lIdx) => {
                       // Custom active checking, handling base paths properly without highlighting everything
                       const isActive = pathname === link.href || (pathname.startsWith(link.href + '/') && link.href.split('/').length > 2);
                       return (
                          <SubNavItem
                             key={lIdx}
                             label={link.label}
                             href={link.href}
                             active={isActive}
                             icon={link.icon}
                          />
                       )
                    })}
                 </div>
               </div>
            ))}
         </div>

         {/* Bottom Action Bar */}
         <div className="p-4 border-t border-slate-200 shrink-0">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors font-bold text-[13px]">
               <LogOut className="w-4 h-4" />
               Log Out Securely
            </button>
         </div>
      </div>
    </div>
  );
}

function NavGroup({ title, hasArrow, icon }: { title: string, hasArrow: boolean, icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[13px] font-bold text-slate-800 px-3 py-2 rounded-lg group">
       <div className="flex items-center gap-3">
         {icon && <div className="text-slate-400 group-hover:text-primary-600 transition-colors flex items-center justify-center w-6">{icon}</div>}
         <span>{title}</span>
       </div>
       {hasArrow && <ChevronRight className="w-4 h-4 text-slate-400" />}
    </div>
  );
}

function SubNavItem({ label, href, active, icon }: { label: string, href: string, active: boolean, icon?: React.ReactNode }) {
  return (
    <Link href={href} className="relative flex items-center group">
       {active && <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></div>}
       <div className={`flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold rounded-lg transition-colors w-full ${
         active ? 'text-primary-700 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
       }`}>
         {icon && <span className={active ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"}>{icon}</span>}
         {label}
       </div>
    </Link>
  );
}

// User Icon fallback
function User(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
