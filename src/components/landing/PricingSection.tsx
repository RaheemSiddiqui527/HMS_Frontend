import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-sm font-black text-primary-600 tracking-[0.2em] uppercase mb-4">Pricing</h2>
        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Simple and Affordable Pricing
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-stretch max-w-6xl mx-auto">
        <div className="hidden lg:flex flex-col justify-center space-y-8 pr-12 max-w-sm">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 text-primary-500 shrink-0" />
            <span className="text-slate-700 font-bold text-xl">Global hospital network</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 text-primary-500 shrink-0" />
            <span className="text-slate-700 font-bold text-xl">Customizable data handling</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 text-primary-500 shrink-0" />
            <span className="text-slate-700 font-bold text-xl">Secure data storage</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 text-primary-500 shrink-0" />
            <span className="text-slate-700 font-bold text-xl">24/7 dedicated support</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 text-primary-500 shrink-0" />
            <span className="text-slate-700 font-bold text-xl">Billing API access</span>
          </div>
        </div>

        <PricingCard
           title="Basic Plan"
           desc="Perfect for small clinics and solo practices."
           price="$199"
           recommended={false}
           buttonText="Start Basic Trial"
        />
        <PricingCard
           title="Pro Plan"
           desc="Perfect for medium to large hospitals."
           price="$499"
           recommended={true}
           buttonText="Start Pro Trial"
        />
      </div>
    </section>
  );
}

function PricingCard({ title, desc, price, recommended, buttonText }: { title: string, desc: string, price: string, recommended: boolean, buttonText: string }) {
  return (
    <div className={`flex-1 rounded-[2.5rem] p-10 lg:p-12 relative flex flex-col ${recommended ? 'bg-slate-900 text-white shadow-2xl scale-100 lg:scale-[1.03] z-10 ring-4 ring-primary-500/30' : 'bg-white border border-slate-200 shadow-sm'}`}>
      {recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-primary-500 text-white text-sm font-black uppercase tracking-[0.1em] py-2 px-6 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-10 text-center">
        <h4 className={`text-3xl font-black mb-3 ${recommended ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
        <p className={`font-medium ${recommended ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
      </div>
      <div className="mb-10 flex items-baseline justify-center gap-2">
        <span className={`text-6xl font-black ${recommended ? 'text-white' : 'text-slate-900'}`}>{price}</span>
        <span className={`font-bold ${recommended ? 'text-slate-400' : 'text-slate-500'}`}>/ mo</span>
      </div>

      {/* Mobile-only features list */}
      <div className="lg:hidden mb-10 space-y-5">
        {['Global network', 'Custom handling', 'Secure storage', '24/7 support'].map((feat, i) => (
           <div key={i} className="flex items-center gap-4">
             <CheckCircle2 className={`w-6 h-6 shrink-0 ${recommended ? 'text-primary-400' : 'text-primary-500'}`} />
             <span className={`font-semibold text-lg ${recommended ? 'text-slate-200' : 'text-slate-700'}`}>{feat}</span>
           </div>
        ))}
      </div>

      <div className="mt-auto">
        <button className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${recommended ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
           {buttonText}
        </button>
      </div>
    </div>
  );
}
