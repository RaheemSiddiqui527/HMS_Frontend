import React from 'react';

export function FAQSection() {
  return (
    <section id="faq" className="py-28 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            What would you like to know?
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FaqItem
            question="What is SDI Health Care?"
            answer="A specialized software platform that integrates all of the information and processes of a clinic or hospital into a single system, streamlining workflows."
          />
          <FaqItem
            question="How secure is patient data?"
            answer="We employ bank-level AES-256 encryption for all data storage and strictly comply with HIPAA regulations to ensure patient data remains confidential."
          />
          <FaqItem
            question="Can it integrate with existing labs?"
            answer="Yes, our system comes with comprehensive APIs and built-in integrations for popular external laboratories and diagnostic centers across the globe."
          />
          <FaqItem
            question="Is it suitable for multi-branch clinics?"
            answer="Absolutely. The Pro plan includes multi-branch management capabilities from a single administrative dashboard, perfect for growing chains."
          />
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-200 transition-colors">
      <div className="flex gap-6">
        <div className="shrink-0 mt-1">
           <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black text-sm">Q</div>
        </div>
        <div>
          <h5 className="text-xl font-extrabold text-slate-900 mb-3">{question}</h5>
          <p className="text-slate-600 font-medium text-lg leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
