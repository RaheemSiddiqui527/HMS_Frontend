"use client";

export function Badge({ children, variant = "neutral", className = "" }) {
  const variants = {
    neutral: "bg-slate-50 text-slate-500 border-slate-100",
    primary: "bg-green-50 text-[#16A34A] border-green-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-orange-50 text-orange-600 border-orange-100",
    danger: "bg-red-50 text-red-600 border-red-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border
      ${variants[variant] || variants.neutral}
      ${className}
    `}>
      {children}
    </span>
  );
}
