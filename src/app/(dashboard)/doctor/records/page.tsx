"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { medicalService } from '../../../../services/medical.service';
import { SearchablePatientSelect } from '../../../../components/dashboard/SearchablePatientSelect';
import { FileText, Plus, Database, Calendar, User, ChevronRight, AlertCircle, X, Download, Share2, Printer, Dna, FlaskConical, Clock } from 'lucide-react';

export default function DoctorRecordsPage() {
  return (
     <Suspense fallback={<div className="p-10 text-center font-black text-slate-400 italic">Synchronizing Medical Repository...</div>}>
        <RecordsContent />
     </Suspense>
  );
}

function RecordsContent() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchPatientId, setSearchPatientId] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const patientId = searchParams.get('patientId');
    if (patientId) {
       setSearchPatientId(patientId);
       fetchRecordsForPatient(patientId);
    }
  }, [searchParams]);

  const fetchRecordsForPatient = async (patientId: string) => {
    if (!patientId.trim()) return;
    try {
      setIsLoading(true);
      setError('');
      const response = await medicalService.getMedicalRecords({ patientId });
      setRecords(response.data?.records || response.data || []);
    } catch (err: any) {
      setError('Could not fetch records for this patient. Please verify the Patient ID.');
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewRecord = (record: any) => {
    setRecords(prev => [record, ...prev]);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" /> Medical Repository
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage institutional medical history and clinical entries.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-[12px] font-black text-white bg-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Medical Entry
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center gap-4 shrink-0">
        <div className="max-w-md flex-1">
          <SearchablePatientSelect 
            onSelect={(id) => {
              setSearchPatientId(id);
              fetchRecordsForPatient(id);
            }} 
            selectedId={searchPatientId}
          />
        </div>
        <button
           onClick={() => setSearchPatientId('')}
           className="p-3.5 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all mt-6"
           title="Clear Selection"
        >
           <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-red-600 text-xs font-bold">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
        {isLoading ? (
          <div className="p-10 text-center text-slate-400 font-bold italic font-sans flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            Accessing encrypted records...
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 border border-slate-200">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Medical Repository</h3>
            <p className="text-slate-500 text-sm font-medium">
              Enter a Patient ID in the search bar to view their records, or click "New Medical Entry" to create a new clinical record.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-6 text-[12px] font-black text-white bg-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Medical Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {records.map((record: any) => (
              <RecordRow 
                key={record._id} 
                record={record} 
                onOpen={(rec) => {
                  setSelectedRecord(rec);
                  setShowViewModal(true);
                }} 
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddRecordModal
          onClose={() => setShowAddModal(false)}
          onSuccess={(newRecord) => { setShowAddModal(false); addNewRecord(newRecord); }}
        />
      )}
      {showViewModal && selectedRecord && (
        <ViewRecordModal 
          record={selectedRecord} 
          onClose={() => setShowViewModal(false)} 
        />
      )}
      
      {/* Hidden Print Container for High-Fidelity Record */}
      <div id="printable-record" className="hidden print:block p-12 bg-white font-sans text-slate-800">
         {selectedRecord && (
            <div className="max-w-4xl mx-auto border border-slate-100 shadow-sm p-12 min-h-screen relative">
               {/* Institutional Letterhead Header */}
               <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-10">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center border-4 border-indigo-50 shadow-sm">
                        <img src="/logo2.png" alt="Hospital Logo" className="w-12 h-12 object-contain brightness-0 invert" />
                     </div>
                     <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">SDI Health Care</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                           Institutional Medical Registry<br />
                           Registry Hub: +91 999 000 1111<br />
                           Email: clinical@sdihealthcare.com
                        </p>
                     </div>
                  </div>
                  <div className="text-right">
                     <h2 className="text-4xl font-black text-slate-100 uppercase tracking-[0.2em] mb-4">Record</h2>
                     <p className="text-[11px] font-black text-slate-900">Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                     <p className="text-[11px] font-bold text-slate-400">Ref: MR-{selectedRecord._id.slice(-8).toUpperCase()}</p>
                  </div>
               </div>

               {/* Dual Protocol Information Blocks */}
               <div className="grid grid-cols-2 gap-8 mb-12">
                  {/* Patient ID Registry */}
                  <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-3xl p-6">
                     <div className="flex items-center gap-2 mb-4 opacity-40">
                        <User className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Medical Subject Identity</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Subject Name</span>
                           <span className="text-[13px] font-black text-slate-800">{selectedRecord.patientId?.firstName} {selectedRecord.patientId?.lastName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Registry ID</span>
                           <span className="text-[12px] font-black text-slate-800">#{selectedRecord.patientId?._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Clinical Data</span>
                           <span className="text-[12px] font-black text-slate-800">Registry Confirmed</span>
                        </div>
                     </div>
                  </div>

                  {/* Registry Logic */}
                  <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-3xl p-6">
                     <div className="flex items-center gap-2 mb-4 opacity-40">
                        <FileText className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Clinical Entry Metadata</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Entry Type</span>
                           <span className="text-[13px] font-black text-slate-800">{selectedRecord.title}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Authored Date</span>
                           <span className="text-[12px] font-black text-slate-800">{new Date(selectedRecord.createdDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-indigo-100/30 pb-1">
                           <span className="text-[10px] font-bold text-slate-400">Status</span>
                           <span className="text-[12px] font-black text-indigo-700">Verified Registry</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Clinical Findings Protocol */}
               <div className="mb-12">
                  <h3 className="text-[13px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-6 uppercase tracking-widest flex items-center gap-2">
                     <Dna className="w-4 h-4 text-indigo-600" /> Professional Findings & Observations
                  </h3>
                  <div className="pl-2">
                     <p className="text-[15px] leading-[1.8] whitespace-pre-wrap font-medium text-slate-700 tracking-tight">
                        {selectedRecord.description}
                     </p>
                  </div>
               </div>

               {/* Result Registry Section */}
               {selectedRecord.testResult && (
                  <div className="mb-16">
                     <h3 className="text-[13px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-indigo-600" /> Laboratory Result Registry
                     </h3>
                     <div className="bg-indigo-50/30 p-10 border border-indigo-100 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Institutional Range Registry</div>
                        <div className="flex justify-between items-end">
                           <div className="space-y-1">
                              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Confirmed Result</p>
                              <p className="text-5xl font-black text-slate-900 leading-none">{selectedRecord.testResult}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Institutional Normal Range</p>
                              <p className="text-sm font-black text-slate-600 italic">{selectedRecord.normalRange || 'Registry Default'}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* Advanced Signature Section */}
               <div className="flex justify-between items-end mt-20">
                  <div className="space-y-2 opacity-50">
                     <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Digital Auth Barcode</p>
                     <div className="w-48 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center font-mono text-[10px] tracking-[0.4em] text-slate-300">
                        {selectedRecord._id.slice(0, 16)}
                     </div>
                  </div>
                  <div className="text-center w-72">
                     <div className="mb-2">
                        <span className="font-serif text-5xl text-slate-900 italic font-medium tracking-tighter">S. Jenkins</span>
                     </div>
                     <div className="border-t border-slate-900/10 pt-4">
                        <p className="text-[14px] font-black text-slate-900">Dr. Sarah Jenkins</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Medical Consultant</p>
                     </div>
                  </div>
               </div>

               {/* Registry Footer Marks */}
               <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-20 border-t border-slate-100 pt-8">
                  <p className="text-[9px] font-black uppercase tracking-widest">Electronic Health Record System • SDI Registry V4</p>
                  <p className="text-[9px] font-black uppercase tracking-widest">Institutional Subject Copy • MR-{selectedRecord._id.slice(-6).toUpperCase()}</p>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

function ViewRecordModal({ record, onClose }: { record: any, onClose: () => void }) {
  const [isSharing, setIsSharing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGeneratePdf = async () => {
    try {
      setIsGenerating(true);
      const element = document.getElementById('printable-record');
      if (!element) {
          alert("Printable element not found");
          return;
      }
      
      // Briefly show it off-screen to render
      element.classList.remove('hidden');
      element.classList.remove('print:block');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '0';
      element.style.display = 'block';

      // Use html2canvas-pro to support modern Tailwind v4 colors like lab() and oklch()
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add a slight margin (0.5 inch)
      const margin = 0.5;
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
      
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. See console for details.');
    } finally {
      const element = document.getElementById('printable-record');
      if (element) {
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
        element.style.display = '';
        element.classList.add('hidden');
        element.classList.add('print:block');
      }
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      await medicalService.shareRecord(record.patientId._id, record.title);
      alert("Medical record shared with patient portal successfully.");
    } catch (error) {
      alert("Failed to share record.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 p-2 md:p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[95vh] flex flex-col">
        <div className="bg-indigo-700 px-6 py-8 md:px-10 md:py-12 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 p-2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
              <X className="w-5 h-5" />
           </button>
           <div className="flex items-center gap-4 md:gap-5 mb-2 md:mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                 <FileText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                 <h1 className="text-xl md:text-2xl font-black">{record.title}</h1>
                 <p className="text-indigo-100 font-medium text-[10px] md:text-sm mt-0.5 uppercase tracking-widest">{record.type.replace('_', ' ')}</p>
              </div>
           </div>
        </div>

        <div className="p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto flex-1">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-b border-slate-100 pb-6 md:pb-8">
              <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Subject Patient</span>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">
                       {record.patientId?.firstName?.[0]}{record.patientId?.lastName?.[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{record.patientId?.firstName} {record.patientId?.lastName}</span>
                 </div>
              </div>
              <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Entry Timestamp</span>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(record.createdDate).toLocaleString()}
                 </div>
              </div>
           </div>

           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Clinical Findings</span>
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-sm font-medium text-slate-700 whitespace-pre-wrap leading-relaxed">
                 {record.description}
              </div>
           </div>

           {record.testResult && (
              <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100 flex items-center justify-between">
                 <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Test Result Found</span>
                    <span className="text-lg font-black text-indigo-900">{record.testResult}</span>
                 </div>
                 {record.normalRange && (
                    <div className="text-right">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Normal Registry Range</span>
                       <span className="text-sm font-bold text-slate-600">{record.normalRange}</span>
                    </div>
                 )}
              </div>
           )}
        </div>

        <div className="p-6 md:p-10 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
           <button 
             disabled={isGenerating}
             onClick={handleGeneratePdf}
             className="w-full md:flex-1 py-4 rounded-2xl border border-slate-200 bg-white text-slate-600 font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
           >
              <Printer className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Download PDF'}
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

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <Printer className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-800 text-lg">Document Preview</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verify before downloading</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a 
                            href={pdfUrl} 
                            download={`MedicalRecord-${record._id?.slice(-6) || 'Doc'}.pdf`}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Save PDF
                        </a>
                        <button 
                            onClick={() => {
                                URL.revokeObjectURL(pdfUrl);
                                setPdfUrl(null);
                            }} 
                            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
                <iframe src={pdfUrl} className="flex-1 w-full bg-slate-100" title="PDF Preview" />
            </div>
        </div>
      )}
    </div>
  );
}

function RecordRow({ record, onOpen }: { record: any, onOpen: (r: any) => void }) {
  const patient = record.patientId;
  const createdDate = record.createdDate
    ? new Date(record.createdDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'N/A';

  const typeLabels: Record<string, string> = {
    medical_history: 'Medical History',
    lab_result: 'Lab Result',
    document: 'Document',
    vaccination: 'Vaccination',
    prescription_history: 'Prescription History',
  };

  return (
    <div 
       onClick={() => onOpen(record)}
       className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 hover:border-indigo-200 transition-colors flex flex-col md:flex-row md:items-center gap-4 md:gap-6 group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
        <FileText className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-black text-slate-900 group-hover:text-indigo-900 transition-colors">{record.title || 'Clinical Entry'}</h4>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {createdDate}</span>
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {patient?.firstName || '—'} {patient?.lastName || ''}</span>
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 lowercase">{typeLabels[record.type] || record.type}</span>
        </div>
        {record.description && (
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">{record.description}</p>
        )}
      </div>
      <div className="block text-right">
        <button className="flex items-center justify-center w-full md:w-auto gap-2 text-indigo-600 text-[11px] font-black bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
          OPEN <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function AddRecordModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: (record: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    type: 'medical_history',
    symptoms: '',
    diagnosis: '',
    treatment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const backendData = {
        patientId: formData.patientId.trim(),
        type: formData.type,
        title: formData.diagnosis || 'Clinical Consultation',
        description: `Symptoms: ${formData.symptoms}\n\nDiagnosis: ${formData.diagnosis}\n\nTreatment: ${formData.treatment}`,
      };
      const result = await medicalService.createMedicalRecord(backendData);
      onSuccess(result.data || result);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to create record. Please verify the Patient ID is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-2 md:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] md:rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[95vh] flex flex-col">
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-lg md:text-xl font-black text-slate-800">New Medical Entry</h3>
          <button onClick={onClose} className="p-2 h-10 w-10 hover:bg-slate-100 rounded-full text-slate-400 text-2xl flex items-center justify-center leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <SearchablePatientSelect 
              onSelect={(id) => setFormData({ ...formData, patientId: id })} 
              selectedId={formData.patientId}
            />
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest ml-1">Record Type *</label>
              <select
                required
                className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-[13px] md:py-[15px] outline-none focus:border-indigo-500 font-bold text-slate-800 bg-white appearance-none"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="medical_history">Medical History</option>
                <option value="lab_result">Lab Result</option>
                <option value="document">Document</option>
                <option value="vaccination">Vaccination</option>
                <option value="prescription_history">Prescription History</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Primary Symptoms</label>
            <textarea
              required
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-bold text-slate-800 resize-none"
              value={formData.symptoms}
              onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
              placeholder="Briefly describe the reported symptoms"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Diagnosis Details *</label>
              <textarea
                required
                rows={3}
                className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-bold text-slate-800 resize-none"
                value={formData.diagnosis}
                onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
                placeholder="Professional medical diagnosis"
              />
            </div>
            <div>
              <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Management Plan</label>
              <textarea
                rows={3}
                className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-bold text-slate-800 resize-none"
                value={formData.treatment}
                onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                placeholder="Prescribed treatment or management steps"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black text-sm py-4 rounded-2xl transition-all shadow-lg mt-2"
          >
            {loading ? 'Archiving Entry...' : 'Finalize & Archive Record'}
          </button>
        </form>
      </div>
    </div>
  );
}
