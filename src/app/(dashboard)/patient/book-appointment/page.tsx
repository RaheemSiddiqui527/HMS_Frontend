"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
  Search, Star, ChevronRight, Calendar, Clock,
  Stethoscope, CheckCircle2, ArrowLeft, X, User, Loader2, AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { appointmentService } from '../../../../services/appointment.service';
import { authService } from '../../../../services/auth.service';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Doctor {
  _id: string; firstName: string; lastName: string;
  specialization: string; consultationFee: number;
  rating: number; yearsOfExperience: number; bio?: string;
}

const SPECIALIZATIONS = [
  'All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'General Practice', 'Dermatology', 'Gynecology', 'Psychiatry', 'Oncology', 'Urology'
];

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  const steps = ['Choose Doctor', 'Select Slot', 'Confirm'];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
              i + 1 < step ? 'bg-slate-900 text-white' :
              i + 1 === step ? 'bg-slate-900 text-white ring-4 ring-slate-900/10' :
              'bg-slate-100 text-slate-400'
            }`}>
              {i + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${i + 1 === step ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i + 1 < step ? 'bg-slate-900' : 'bg-slate-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Doctor Card ─────────────────────────────────────────────────────────────
function DoctorCard({ doctor, selected, onClick }: { doctor: Doctor; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left p-5 rounded-[2rem] border transition-all group ${selected ? 'bg-slate-900 border-slate-900 shadow-xl' : 'bg-white border-slate-100 hover:border-slate-900 hover:shadow-md'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl font-black text-xl flex items-center justify-center shrink-0 transition-all ${selected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {doctor.firstName?.[0]}{doctor.lastName?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`font-black text-base ${selected ? 'text-white' : 'text-slate-900'}`}>Dr. {doctor.firstName} {doctor.lastName}</p>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${selected ? 'text-slate-300' : 'text-slate-400'}`}>{doctor.specialization}</p>
            </div>
            <div className={`text-right shrink-0 ${selected ? 'text-white' : 'text-slate-900'}`}>
              <p className="font-black text-sm">Rs. {doctor.consultationFee || '—'}</p>
              <p className={`text-[10px] font-bold ${selected ? 'text-slate-300' : 'text-slate-400'}`}>Fee</p>
            </div>
          </div>
          <div className={`flex items-center gap-3 mt-2 text-[11px] font-bold ${selected ? 'text-slate-300' : 'text-slate-400'}`}>
            {doctor.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> {doctor.rating.toFixed(1)}</span>}
            {doctor.yearsOfExperience > 0 && <span>{doctor.yearsOfExperience} yrs exp.</span>}
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 mt-1 shrink-0 transition-colors ${selected ? 'text-white' : 'text-slate-300 group-hover:text-slate-900'}`} />
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookAppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Step 2
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');

  // Step 3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const user = authService.getCurrentUser();

  // Load doctors
  useEffect(() => {
    const load = async () => {
      setLoadingDoctors(true);
      try {
        const res = await appointmentService.getDoctors();
        const arr = Array.isArray(res?.data) ? res.data : [];
        setDoctors(arr);
      } catch { setDoctors([]); }
      finally { setLoadingDoctors(false); }
    };
    load();
  }, []);

  // Load slots when doctor or date changes
  const loadSlots = useCallback(async (doctorId: string, date: string) => {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot('');
    try {
      const res = await appointmentService.checkAvailability(doctorId, date);
      setSlots(res?.data?.availableSlots ?? []);
    } catch { setSlots([]); }
    finally { setLoadingSlots(false); }
  }, []);

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setStep(2);
    loadSlots(doc._id, selectedDate);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (selectedDoctor) loadSlots(selectedDoctor._id, date);
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedSlot || !reason.trim()) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await appointmentService.createAppointment({
        patientId: user?.id,
        doctorId: selectedDoctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        reason: reason.trim(),
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter(d => {
    const matchSpec = specFilter === 'All' || d.specialization === specFilter;
    const q = search.toLowerCase();
    return matchSpec && (!q || `${d.firstName} ${d.lastName} ${d.specialization}`.toLowerCase().includes(q));
  });

  // ── Success Screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50/50 p-8">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-900 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Appointment Booked!</h2>
          <p className="text-slate-500 font-bold text-sm mb-2">
            Your appointment with Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName} has been confirmed.
          </p>
          <p className="text-[11px] font-bold text-slate-400 mb-8">
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} · {selectedSlot}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push('/patient/appointments')}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all">
              View Appointments
            </button>
            <button onClick={() => { setSuccess(false); setStep(1); setSelectedDoctor(null); setSelectedSlot(''); setReason(''); }}
              className="px-6 py-3 bg-white border border-slate-100 text-slate-700 rounded-2xl font-black text-sm hover:border-slate-900 transition-all">
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 shrink-0">
        <h1 className="text-xl font-black text-slate-900">Book Appointment</h1>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Schedule a clinical visit in 3 steps</p>
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <StepIndicator step={step} />

          {/* ── STEP 1: Choose Doctor ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type="text" placeholder="Search doctor by name..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
                </div>
              </div>

              {/* Specialization Pills */}
              <div className="flex gap-2 flex-wrap">
                {SPECIALIZATIONS.map(s => (
                  <button key={s} onClick={() => setSpecFilter(s)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${specFilter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-400'}`}>
                    {s}
                  </button>
                ))}
              </div>

              {/* Doctor List */}
              {loadingDoctors ? (
                <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 h-28" />)}</div>
              ) : filteredDoctors.length === 0 ? (
                <div className="py-20 text-center">
                  <Stethoscope className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No doctors found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDoctors.map(doc => (
                    <DoctorCard key={doc._id} doctor={doc} selected={selectedDoctor?._id === doc._id} onClick={() => handleSelectDoctor(doc)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Select Slot ── */}
          {step === 2 && selectedDoctor && (
            <div className="space-y-6">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Doctors
              </button>

              {/* Selected Doctor Banner */}
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 font-black text-lg flex items-center justify-center shrink-0">{selectedDoctor.firstName?.[0]}{selectedDoctor.lastName?.[0]}</div>
                <div>
                  <p className="font-black text-lg">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</p>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{selectedDoctor.specialization} · Rs. {selectedDoctor.consultationFee || '—'}</p>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-1">Select Date</label>
                <input type="date" value={selectedDate} min={new Date().toISOString().split('T')[0]}
                  onChange={e => handleDateChange(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all" />
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-1">
                  Available Time Slots {selectedDate && `— ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short' })}`}
                </label>
                {loadingSlots ? (
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400 py-6">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading available slots...
                  </div>
                ) : slots.length === 0 ? (
                  <div className="py-8 text-center bg-white rounded-[2rem] border border-slate-100">
                    <Clock className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No slots available on this date</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">Try a different date</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map(slot => (
                      <button key={slot} onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-2xl border text-sm font-black transition-all ${selectedSlot === slot ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-700 border-slate-100 hover:border-slate-900'}`}>
                        <Clock className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />{slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-1">Reason for Visit</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                  placeholder="Briefly describe your symptoms or reason for consultation..."
                  className="w-full bg-white border border-slate-100 rounded-[1.5rem] px-5 py-4 text-sm font-medium text-slate-700 outline-none focus:border-slate-900 transition-all resize-none placeholder:text-slate-300" />
              </div>

              <button onClick={() => { if (selectedSlot && reason.trim()) setStep(3); }}
                disabled={!selectedSlot || !reason.trim()}
                className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Review & Confirm <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          )}

          {/* ── STEP 3: Confirm ── */}
          {step === 3 && selectedDoctor && (
            <div className="space-y-6">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Change Slot
              </button>

              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-8 py-8">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Booking Summary</p>
                  <h2 className="text-2xl font-black">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</h2>
                  <p className="text-slate-400 text-sm font-bold mt-0.5">{selectedDoctor.specialization}</p>
                </div>
                <div className="p-8 space-y-5">
                  {[
                    { label: 'Date', value: new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }), icon: <Calendar className="w-4 h-4" /> },
                    { label: 'Time Slot', value: selectedSlot, icon: <Clock className="w-4 h-4" /> },
                    { label: 'Consultation Fee', value: `Rs. ${selectedDoctor.consultationFee || 'TBD'}`, icon: <Stethoscope className="w-4 h-4" /> },
                    { label: 'Reason', value: reason, icon: <User className="w-4 h-4" /> },
                  ].map(row => (
                    <div key={row.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{row.icon}</div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{row.label}</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-bold text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              <button onClick={handleSubmit} disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : 'Confirm Appointment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
