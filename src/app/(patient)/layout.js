"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiHome, FiCalendar, FiList, FiFolder, FiFileText, FiBell, FiSettings } from "react-icons/fi";

const PATIENT_SIDEBAR_ITEMS = [
  { label: "My Health", href: "/dashboard", icon: FiHome },
  { label: "Book Appointment", href: "/book-appointment", icon: FiCalendar },
  { label: "My Appointments", href: "/appointments", icon: FiList },
  { label: "Medical History", href: "/history", icon: FiFolder },
  { label: "Prescriptions", href: "/prescriptions", icon: FiFileText },
  { label: "Notifications", href: "/notifications", icon: FiBell, badge: "2" },
  { label: "Profile Settings", href: "/profile", icon: FiSettings },
];

export default function PatientLayout({ children }) {
  return (
    <DashboardLayout
      role="patient"
      roleName="Patient Portal"
      sidebarItems={PATIENT_SIDEBAR_ITEMS}
      pageTitle="My MediCare"
      pageSubtitle="Your personal healthcare hub"
    >
      {children}
    </DashboardLayout>
  );
}
