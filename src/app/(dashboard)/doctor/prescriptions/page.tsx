"use client";
import React, { useEffect, useState } from 'react';
import { medicalService } from '../../../../services/medical.service';
import { SearchablePatientSelect } from '../../../../components/dashboard/SearchablePatientSelect';
import { Pill, Plus, Search, Filter, Download, CheckCircle, X, Share2, Printer, User, Clock } from 'lucide-react';

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const fetchPrescriptions = async () => {
    try {
      setIsLoading(true);
      const response = await medicalService.getPrescriptions();
      setPrescriptions(response.data?.prescriptions || response.data || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setPrescriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-600" /> Pharmacy Orders
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Issue and manage digital prescriptions for hospital patients.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-[12px] font-black text-white bg-emerald-600 px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Write New Prescription
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Search medication or patient..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 w-full transition-all bg-slate-50/50" />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> All Status
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="p-10 text-center text-slate-400 font-bold italic font-sans flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            Accessing pharmacy registry...
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center max-w-xl mx-auto border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <Pill className="w-10 h-10 text-emerald-200" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Registry Inactive</h3>
            <p className="text-slate-500 text-sm font-medium">You have not issued any digital prescriptions yet. Click the button above to start a new order.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((p: any) => (
              <PrescriptionCard 
                key={p._id} 
                prescription={p} 
                onOpen={(rx) => {
                  setSelectedPrescription(rx);
                  setShowViewModal(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddPrescriptionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); fetchPrescriptions(); }}
        />
      )}
      {showViewModal && selectedPrescription && (
        <ViewPrescriptionModal 
          prescription={selectedPrescription} 
          onClose={() => setShowViewModal(false)} 
        />
      )}

      {/* Hidden Print Container for High-Fidelity Rx */}
      <div id="printable-rx" className="hidden print:block p-12 bg-white font-sans text-slate-800">
         {selectedPrescription && (
            <div className="max-w-4xl mx-auto border border-slate-100 shadow-sm p-12 min-h-screen relative">
               {/* Institutional Letterhead Header */}
               <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-10">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center border-4 border-emerald-50 shadow-sm">
                        <img src="/logo2.png" alt="Hospital Logo" className="w-12 h-12 object-contain brightness-0 invert" />
                     </div>
                     <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">SDI Health Care</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                           123 Medical Avenue, Central District<br />
                           Registry Hub: +91 999 000 1111<br />
                           Email: registry@sdihealthcare.com
                        </p>
                     </div>
                  </div>
                  <div className="text-right">
                     <h2 className="text-4xl font-black text-slate-100 uppercase tracking-[0.2em] mb-4">Prescription</h2>
                     <p className="text-[11px] font-black text-slate-900">Date: {new Date(selectedPrescription.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                     <p className="text-[11px] font-bold text-slate-400">Ref: RX-{selectedPrescription._id.slice(-8).toUpperCase()}</p>
                  </div>
               </div>

               {/* Dual Protocol Information Blocks */}
               <div className="grid grid-cols-2 gap-8 mb-12">
                  {/* Patient Context */}
                  <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-3xl p-6">
                     <div className="flex items-center gap-2 mb-4 opacity-40">
                        <User className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Patient Information</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Name</span>
                           <span className="text-[13px] font-black text-slate-800">{selectedPrescription.patientId?.firstName} {selectedPrescription.patientId?.lastName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Patient ID</span>
                           <span className="text-[12px] font-black text-slate-800">#{selectedPrescription.patientId?._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Age / Gender</span>
                           <span className="text-[12px] font-black text-slate-800">28 Yrs / Male</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Weight</span>
                           <span className="text-[12px] font-black text-slate-800">72 kg</span>
                        </div>
                     </div>
                  </div>

                  {/* Doctor Context */}
                  <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-3xl p-6">
                     <div className="flex items-center gap-2 mb-4 opacity-40">
                        <Clock className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Doctor Information</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Name</span>
                           <span className="text-[13px] font-black text-slate-800">Dr. Sarah Jenkins</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Department</span>
                           <span className="text-[12px] font-black text-slate-800">Cardiology</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">License No.</span>
                           <span className="text-[12px] font-black text-slate-800">MED-491-XYZ</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-emerald-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Consultation</span>
                           <span className="text-[12px] font-black text-slate-800">In-person Visit</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Rx Clinical Branding */}
               <div className="mb-10">
                  <div className="text-6xl font-black text-emerald-600 mb-4 opacity-80 serif italic">Rx</div>
                  <h3 className="text-[13px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-6">Prescribed Medicines</h3>
                  
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-emerald-50/60 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                           <th className="px-5 py-4 rounded-tl-xl">Medicine Name</th>
                           <th className="px-5 py-4">Dosage</th>
                           <th className="px-5 py-4">Frequency</th>
                           <th className="px-5 py-4 rounded-tr-xl">Duration</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {selectedPrescription.medications.map((med: any, idx: number) => (
                           <tr key={idx}>
                              <td className="px-5 py-6">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-40">
                                       <Plus className="w-3 h-3" />
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-black text-slate-800">{med.name}</p>
                                       <p className="text-[10px] font-bold text-slate-400 italic">Clinical Directives provided</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-5 py-6 text-[13px] font-bold text-slate-600">{med.dosage}</td>
                              <td className="px-5 py-6 text-[13px] font-bold text-slate-600 uppercase italic opacity-80">{med.frequency}</td>
                              <td className="px-5 py-6 text-[13px] font-black text-emerald-600">{med.duration}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Doctor Notes & Clinical Advice */}
               {selectedPrescription.notes && (
                  <div className="mb-16">
                     <h3 className="text-[13px] font-black text-slate-900 mb-4">Doctor Notes & Advice</h3>
                     <div className="bg-amber-50/30 border-l-[6px] border-amber-400 p-8 rounded-r-3xl">
                        <p className="text-[13px] font-medium text-slate-700 leading-[1.8] italic">
                           "{selectedPrescription.notes}"
                        </p>
                     </div>
                  </div>
               )}

               {/* Advanced Signature Section */}
               <div className="flex justify-end pt-12">
                  <div className="text-center w-72">
                     <div className="mb-2">
                        <span className="font-serif text-5xl text-slate-900 italic font-medium tracking-tighter">S. Jenkins</span>
                     </div>
                     <div className="border-t border-slate-900/10 pt-4">
                        <p className="text-[14px] font-black text-slate-900">Dr. Sarah Jenkins</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Consultant Specialist</p>
                     </div>
                  </div>
               </div>

               {/* Registry Footer */}
               <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-20 border-t border-slate-100 pt-8">
                  <p className="text-[9px] font-black uppercase tracking-widest">HMS SDI-V2 • Digital Health Registry</p>
                  <p className="text-[9px] font-black uppercase tracking-widest">Valid Pharmaceutical Directive</p>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

function ViewPrescriptionModal({ prescription, onClose }: { prescription: any, onClose: () => void }) {
  const [isSharing, setIsSharing] = useState(false);
  const patient = prescription.patientId;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      await medicalService.sharePrescription(patient._id, `${prescription.medications[0]?.name} and others`);
      alert("Prescription transmitted to patient portal successfully.");
    } catch (error) {
      alert("Transmission failed.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 p-2 md:p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        <div className="bg-emerald-700 px-6 py-8 md:px-10 md:py-12 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 p-2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
              <X className="w-5 h-5" />
           </button>
           <div className="flex items-center gap-4 md:gap-5 mb-2 md:mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                 <Pill className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                 <h1 className="text-xl md:text-2xl font-black">Digital Prescription</h1>
                 <p className="text-emerald-100 font-medium text-[10px] md:text-sm mt-0.5 uppercase tracking-widest">Official Pharmacy Directive</p>
              </div>
           </div>
        </div>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto flex-1">
           <div className="flex items-center justify-between border-b border-slate-100 pb-6 md:pb-8">
              <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Subject Patient</span>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px]">
                       {patient?.firstName?.[0]}{patient?.lastName?.[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{patient?.firstName} {patient?.lastName}</span>
                 </div>
              </div>
              <div className="text-right">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Issued Date</span>
                 <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {new Date(prescription.createdDate).toLocaleDateString()}
                 </div>
              </div>
           </div>

           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Medication Registry</span>
              <div className="space-y-3">
                 {prescription.medications.map((med: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                             <Pill className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="text-[14px] font-black text-slate-800">{med.name}</div>
                             <div className="text-[11px] font-bold text-slate-400 uppercase">{med.dosage} • {med.frequency}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-[10px] font-black text-slate-400 uppercase">Duration</div>
                          <div className="text-xs font-black text-emerald-600 uppercase tracking-tighter">{med.duration}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {prescription.notes && (
              <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Professional Instructions</span>
                 <div className="bg-emerald-50/30 rounded-2xl p-6 border border-emerald-100 text-sm font-medium text-slate-700 italic">
                    "{prescription.notes}"
                 </div>
              </div>
           )}
        </div>

        <div className="p-6 md:p-10 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
           <button 
             onClick={handlePrint}
             className="w-full md:flex-1 py-4 rounded-2xl border border-slate-200 bg-white text-slate-600 font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
           >
              <Printer className="w-4 h-4" /> Download PDF
           </button>
           <button 
             disabled={isSharing}
             onClick={handleShare}
             className="w-full md:flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl shadow-slate-200"
           >
              <Share2 className="w-4 h-4" /> {isSharing ? 'Transmitting...' : 'Send to Patient'}
           </button>
        </div>
      </div>
    </div>
  );
}

function PrescriptionCard({ prescription, onOpen }: { prescription: any, onOpen: (p: any) => void }) {
  const patient = prescription.patientId;
  const med = prescription.medications?.[0];
  const issuedDate = prescription.createdDate
    ? new Date(prescription.createdDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'N/A';

  return (
    <div 
       onClick={() => onOpen(prescription)}
       className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 hover:shadow-md transition-all flex flex-col gap-4 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-black text-slate-900 line-clamp-1">{med?.name || 'Routine Medication'}</h4>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
              Patient: {patient?.firstName} {patient?.lastName}
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> ISSUED
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Dosage</span>
            <span className="text-[11px] md:text-xs font-bold text-slate-700">{med?.dosage || '—'}</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Freq</span>
            <span className="text-[11px] md:text-xs font-bold text-slate-700">{med?.frequency || '—'}</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col">
             <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Dur</span>
             <span className="text-[11px] md:text-xs font-bold text-emerald-600">{med?.duration || '—'}</span>
          </div>
        </div>
        <button className="text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
          <div className="hidden md:block"><Download className="w-4 h-4" /></div>
          <div className="md:hidden text-[10px] font-black">VIEW</div>
        </button>
      </div>
    </div>
  );
}

function AddPrescriptionModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    medications: [{ name: '', dosage: '', frequency: 'Once Daily', duration: '7 Days' }],
    instructions: '',
  });

  const updateMed = (field: string, value: string) => {
    const meds = [...formData.medications];
    (meds[0] as any)[field] = value;
    setFormData({ ...formData, medications: meds });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const backendData = {
        patientId: formData.patientId.trim(),
        medications: formData.medications.map(m => ({
          name: m.name,
          dosage: m.dosage,
          frequency: m.frequency || 'Once Daily',
          duration: m.duration || '7 Days',
          instructions: formData.instructions || undefined,
        })),
        notes: formData.instructions || undefined,
      };
      await medicalService.createPrescription(backendData);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to issue prescription. Please verify Patient ID and all required fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-2 md:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 max-h-[95vh] flex flex-col animate-in zoom-in duration-300">
        <div className="px-6 py-6 md:px-10 md:py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-black text-slate-800">Digital Prescription</h3>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Pharmacy Authorization Form</p>
          </div>
          <button onClick={onClose} className="p-2 h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
             <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-4 md:space-y-6 overflow-y-auto flex-1">
          <SearchablePatientSelect 
            onSelect={(id) => setFormData({ ...formData, patientId: id })} 
            selectedId={formData.patientId}
          />

          <div>
            <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Medication Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <input
                required
                className="w-full text-sm border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-800 bg-slate-50"
                value={formData.medications[0].name}
                onChange={e => updateMed('name', e.target.value)}
                placeholder="Drug Name *"
              />
              <input
                required
                className="w-full text-sm border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-800 bg-slate-50"
                value={formData.medications[0].dosage}
                onChange={e => updateMed('dosage', e.target.value)}
                placeholder="Dosage (e.g., 500mg) *"
              />
              <input
                required
                className="w-full text-sm border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-800 bg-slate-50"
                value={formData.medications[0].frequency}
                onChange={e => updateMed('frequency', e.target.value)}
                placeholder="Frequency (Once Daily) *"
              />
              <input
                required
                className="w-full text-sm border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-slate-800 bg-slate-50"
                value={formData.medications[0].duration}
                onChange={e => updateMed('duration', e.target.value)}
                placeholder="Duration (7 Days) *"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Special Instructions</label>
            <textarea
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:border-emerald-500 font-bold text-slate-800 resize-none"
              value={formData.instructions}
              onChange={e => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="e.g., To be taken after meals..."
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black text-[13px] py-4 rounded-2xl transition-all shadow-xl hover:bg-black disabled:opacity-60 uppercase tracking-widest mt-2 shrink-0"
          >
            {loading ? 'Transmitting...' : 'Authorize & Issue Rx'}
          </button>
        </form>
      </div>
    </div>
  );
}
