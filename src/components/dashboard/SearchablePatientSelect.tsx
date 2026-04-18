"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ChevronDown, Check, X } from 'lucide-react';
import { appointmentService } from '../../services/appointment.service';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface SearchablePatientSelectProps {
  onSelect: (patientId: string) => void;
  selectedId?: string;
}

export function SearchablePatientSelect({ onSelect, selectedId }: SearchablePatientSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await appointmentService.getMyPatients();
        const patientData = response.data || [];
        setPatients(patientData);
        setFilteredPatients(patientData);
        
        if (selectedId) {
          const found = patientData.find((p: Patient) => p._id === selectedId);
          if (found) setSelectedPatient(found);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [selectedId]);

  useEffect(() => {
    const filtered = patients.filter(p => 
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    onSelect(patient._id);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">
        Target Patient Selection
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-50 border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
          isOpen ? 'border-primary-500 ring-2 ring-primary-100 bg-white' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
            <User className="w-4 h-4" />
          </div>
          {selectedPatient ? (
            <span className="text-[14px] font-bold text-slate-800">
              {selectedPatient.firstName} {selectedPatient.lastName}
            </span>
          ) : (
            <span className="text-[14px] font-bold text-slate-400">Select Registered Patient</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none text-sm font-bold text-slate-800 outline-none py-2 placeholder:text-slate-400"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {searchTerm && <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setSearchTerm('')} />}
          </div>
          
          <div className="max-h-60 overflow-y-auto p-2">
            {isLoading ? (
              <div className="p-8 text-center text-slate-400 font-bold text-xs italic">Syncing medical registry...</div>
            ) : filteredPatients.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-400 font-bold text-xs">No active patients found in your registry.</p>
                <p className="text-[10px] text-slate-300 mt-1 uppercase font-black">Search terms: {searchTerm}</p>
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <div 
                  key={patient._id}
                  onClick={() => handleSelect(patient)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all mb-1 ${
                    selectedId === patient._id ? 'bg-primary-50 text-primary-900 border border-primary-100' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500">
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-black">{patient.firstName} {patient.lastName}</div>
                      <div className="text-[10px] font-medium text-slate-400 truncate w-32 md:w-48 capitalize">{patient.email}</div>
                    </div>
                  </div>
                  {selectedId === patient._id && <Check className="w-4 h-4 text-primary-600" />}
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total: {filteredPatients.length} Patients</span>
          </div>
        </div>
      )}
    </div>
  );
}
