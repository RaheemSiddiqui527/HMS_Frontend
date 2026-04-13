import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SDI Healthcare | Book Appointments & Manage Patient Care",
  description:
    "SDI Healthcare offers a complete hospital management system including appointment booking, patient history, digital prescriptions, and diagnostic services.",
  keywords: [
    "Hospital Management System",
    "Clinic Management",
    "Doctor Appointment",
    "SDI Healthcare",
    "Patient Records",
    "Medical Software",
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
