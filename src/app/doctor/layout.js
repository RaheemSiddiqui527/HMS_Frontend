"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiActivity, FiCalendar, FiUsers, FiFileText, FiFolder, FiUser, FiBell } from "react-icons/fi";

const DOCTOR_SIDEBAR_ITEMS = [
  { label: "Overview", href: "/doctor/dashboard", icon: FiActivity },
  { label: "Appointments", href: "/doctor/appointments", icon: FiCalendar, badge: "6 New" },
  { label: "My Patients", href: "/doctor/patients", icon: FiUsers },
  { label: "Prescriptions", href: "/doctor/prescriptions", icon: FiFileText },
  { label: "Medical Records", href: "/doctor/records", icon: FiFolder },
  { label: "Notifications", href: "/doctor/notifications", icon: FiBell },
  { label: "My Profile", href: "/doctor/profile", icon: FiUser },
];

export default function DoctorLayout({ children }) {
  return (
    <DashboardLayout
      role="doctor"
      roleName="Medical Professional"
      sidebarItems={DOCTOR_SIDEBAR_ITEMS}
      pageTitle="Doctor's Portal"
      pageSubtitle="Schedule and Patient Care Management"
    >
      {children}
    </DashboardLayout>
  );
}
