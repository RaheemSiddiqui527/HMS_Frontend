"use client";

import { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiActivity, FiUser, FiCalendar, FiClock, FiCheckCircle, FiStar, FiInfo, FiHeart, FiFileText, FiLink } from "react-icons/fi";
import { MdOutlinePsychology, MdOutlineHealthAndSafety, MdOutlineSettingsAccessibility, MdOutlineMedicalServices, MdOutlineBabyChangingStation, MdOutlineScience } from "react-icons/md";

export default function BookAppointmentPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    department: "",
    doctor: "",
    date: "",
    slot: ""
  });

  const departments = [
    { name: "Radiology", icon: MdOutlineScience, color: "text-blue-500" },
    { name: "Dentistry", icon: MdOutlineHealthAndSafety, color: "text-red-500" },
    { name: "Neurology", icon: MdOutlinePsychology, color: "text-[#16A34A]" },
    { name: "Orthopedics", icon: MdOutlineSettingsAccessibility, color: "text-orange-500" },
    { name: "Pediatrics", icon: MdOutlineBabyChangingStation, color: "text-purple-500" },
    { name: "General Medicine", icon: MdOutlineMedicalServices, color: "text-blue-600" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Neurology Specialist", rating: "4.9", experience: "12 yrs" },
    { id: 2, name: "Dr. Robert Fox", specialty: "Cardiology Specialist", rating: "4.8", experience: "15 yrs" },
  ];

  const slots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM"];

  const steps = [
    { id: 1, label: "Select Department", icon: FiActivity },
    { id: 2, label: "Select Doctor", icon: FiUser },
    { id: 3, label: "Select Date", icon: FiCalendar },
    { id: 4, label: "Select Time Slot", icon: FiClock },
    { id: 5, label: "Confirm Appointment", icon: FiCheckCircle },
  ];

  const updateData = (key, value, nextStep) => {
    setBookingData(prev => ({ ...prev, [key]: value }));
    if (nextStep) setActiveStep(nextStep);
  }

  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-[#111827] tracking-tight">Book an Appointment</h1>
        <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest leading-loose">Follow the steps below to schedule your next hospital visit</p>
      </div>

      <div className="relative space-y-12">
        {/* Step-by-Step Vertical Flow */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative pl-12 sm:pl-16 group">
            {/* Step Number Circle */}
            <div className={`absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center z-10 border-2 transition-all duration-300
              ${activeStep >= step.id ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-lg shadow-green-100' : 'bg-white border-slate-200 text-slate-300'}`}>
              <step.icon size={20} />
            </div>
            
            {/* Connecting Vertical Line */}
            {index !== steps.length - 1 && (
              <div className={`absolute left-5 sm:left-6 top-10 sm:top-12 w-0.5 h-full -ml-px z-0 transition-all duration-500
                ${activeStep > step.id ? 'bg-[#16A34A]' : 'bg-slate-100'}`} />
            )}

            <div className={`space-y-6 transition-all duration-500 ${activeStep < step.id ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
              <h3 className="text-lg font-black text-[#111827] flex items-center gap-2">
                {step.label}
                {activeStep > step.id && <FiCheckCircle className="text-[#16A34A]" />}
              </h3>

              {/* Step 1: Departments */}
              {step.id === 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {departments.map(dept => (
                    <button
                      key={dept.name}
                      onClick={() => updateData("department", dept.name, 2)}
                      className={`p-6 rounded-3xl border-2 transition-all text-center group flex flex-col items-center justify-center
                        ${bookingData.department === dept.name ? 'border-[#16A34A] bg-green-50/50 shadow-md' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                    >
                      <div className={`text-4xl mb-4 transition-transform group-hover:scale-110 ${dept.color}`}>
                        <dept.icon />
                      </div>
                      <p className="text-xs font-black text-[#111827] uppercase tracking-wide">{dept.name}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Doctors */}
              {step.id === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => updateData("doctor", doc.name, 3)}
                      className={`p-5 rounded-3xl border-2 transition-all text-left flex items-center gap-5
                        ${bookingData.doctor === doc.name ? 'border-[#16A34A] bg-green-50/50' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-[#16A34A] text-xl">
                        {doc.name[4]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-[#111827]">{doc.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{doc.specialty}</p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-[#16A34A]">
                           <span className="flex items-center gap-1"><FiStar size={10} fill="currentColor" /> {doc.rating}</span>
                           <span className="text-slate-200">|</span>
                           <span>{doc.experience} Experience</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Date Select */}
              {step.id === 3 && (
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 inline-block shadow-sm">
                  <input 
                    type="date" 
                    onChange={(e) => updateData("date", e.target.value, 4)}
                    className="p-3 border-none bg-slate-50 rounded-xl text-sm font-black text-[#111827] focus:ring-0 cursor-pointer" 
                  />
                  <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest pl-1">Selected: {bookingData.date || 'Pick a date'}</p>
                </div>
              )}

              {/* Step 4: Time Slot */}
              {step.id === 4 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => updateData("slot", slot, 5)}
                      className={`py-4 rounded-2xl text-xs font-black transition-all border
                        ${bookingData.slot === slot ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-[#16A34A] hover:bg-green-50/20'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 5: Confirmation */}
              {step.id === 5 && (
                <Card className="bg-white p-8 rounded-[2.5rem] border-none shadow-2xl overflow-hidden relative group">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-24 h-24 rounded-3xl bg-green-50 flex items-center justify-center text-4xl shadow-inner">
                        ✅
                     </div>
                     <div className="flex-1 space-y-4 text-center md:text-left">
                        <h4 className="text-xl font-black text-[#111827]">Almost Done!</h4>
                        <div className="grid grid-cols-2 gap-4 text-left">
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</p>
                              <p className="text-sm font-black text-[#16A34A]">{bookingData.department}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doctor</p>
                              <p className="text-sm font-black text-[#16A34A]">{bookingData.doctor}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DateTime</p>
                              <p className="text-sm font-black text-[#16A34A]">{bookingData.date} @ {bookingData.slot}</p>
                           </div>
                        </div>
                        <div className="pt-4 flex gap-3">
                          <Button className="flex-1 py-4 text-sm font-black" size="lg" icon={FiCheckCircle} onClick={() => alert("Appointment Booked!")}>Confirm Appointment</Button>
                          <Button variant="secondary" className="px-6" onClick={() => setActiveStep(1)}>Go Back</Button>
                        </div>
                     </div>
                  </div>
                  {/* Backdrop Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
