"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiTrendingUp, FiPlusCircle, FiUserPlus, FiClock, FiUser } from "react-icons/fi";

const STAFF_SIDEBAR_ITEMS = [
  { label: "Overview", href: "/staff/dashboard", icon: FiTrendingUp },
  { label: "Book Appointment", href: "/staff/appointments", icon: FiPlusCircle },
  { label: "Patient Check-in", href: "/staff/patients", icon: FiUserPlus },
  { label: "Daily Schedule", href: "/staff/schedule", icon: FiClock },
  { label: "My Profile", href: "/staff/profile", icon: FiUser },
];

export default function StaffLayout({ children }) {
  return (
    <DashboardLayout
      role="staff"
      roleName="Operations Staff"
      sidebarItems={STAFF_SIDEBAR_ITEMS}
      pageTitle="Receptionist Panel"
      pageSubtitle="Front-office and Coordination Control"
    >
      {children}
    </DashboardLayout>
  );
}
