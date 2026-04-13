"use client";

import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { FiFolder, FiSearch, FiFileText, FiDownload, FiUpload, FiExternalLink } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";

export default function DoctorRecordsPage() {
  const [search, setSearch] = useState("");

  const records = [
    { id: "REC-701", patient: "Brooklyn Simmons", type: "X-Ray Report", date: "2024-03-24", size: "2.4 MB" },
    { id: "REC-702", patient: "Leslie Alexander", type: "Blood Analysis", date: "2024-03-22", size: "1.1 MB" },
    { id: "REC-703", patient: "Cameron Williamson", type: "MRI Scan (Spine)", date: "2024-03-18", size: "14.5 MB" },
    { id: "REC-704", patient: "Jane Cooper", type: "ECG Graph", date: "2024-03-10", size: "0.8 MB" },
  ];

  const columns = [
    { key: "type", label: "Document Type", render: (v) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-sm">
          <FiFileText size={18} />
        </div>
        <div>
          <p className="font-bold text-[#111827]">{v}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Archive</p>
        </div>
      </div>
    )},
    { key: "patient", label: "Patient Name", render: (v) => <span className="font-bold text-slate-700">{v}</span> },
    { key: "date", label: "Upload Date" },
    { key: "size", label: "File Size", render: (v) => <span className="text-xs font-bold text-slate-400">{v}</span> },
    { key: "actions", label: "", render: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" icon={FiDownload}>Get</Button>
        <Button size="sm" variant="ghost" icon={FiExternalLink}>View</Button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111827]">Medical Records</h1>
          <p className="text-sm text-slate-500 font-medium">Access and manage centralized patient diagnostics and files.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={FiFolder}>Archives</Button>
          <Button icon={FiUpload}>Upload Record</Button>
        </div>
      </div>

      <div className="flex bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex-1">
          <Input 
            placeholder="Search by patient name, record ID or file type..." 
            icon={FiSearch} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md border-none focus:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 p-0 overflow-hidden border-none shadow-sm">
          <CardContent>
            <Table columns={columns} data={records} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-[#111827] text-white border-none p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl mb-4 text-green-400">
                ☁️
              </div>
              <h4 className="text-xl font-black mb-1">Cloud Storage</h4>
              <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">System is encrypted with AES-256. All uploads are automatically scanned for security.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Usage</span>
                  <span>75%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader><CardTitle icon={FiFileText}>Recent Access</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-2">
              {[
                { name: "MRI_Spine_Final.pdf", time: "2m ago" },
                { name: "Blood_Analysis_V2.xlsx", time: "1h ago" },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FiFileText className="text-slate-300 group-hover:text-[#16A34A] transition-colors" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-[#111827] truncate w-24">{f.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">{f.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
