import React from 'react';
import { Construction } from 'lucide-react';

export default async function PatientPlaceholderPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || ['module'];
  const moduleName = slug[0].replace(/-/g, ' ');

  return (
    <div className="h-full flex flex-col bg-slate-50 items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <Construction className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 capitalize">{moduleName} Module</h2>
        <p className="text-slate-500 mb-6 font-medium">This section of the patient portal is currently under construction and has not been fully implemented in the frontend yet.</p>
      </div>
    </div>
  );
}
