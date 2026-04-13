"use client";

export default function Card({ children, className = "", padding = "p-6", hover = false }) {
  return (
    <div className={`
      bg-white rounded-xl border border-slate-100 card-shadow transition-all duration-300
      ${hover ? "hover:scale-[1.01] hover:shadow-lg" : ""}
      ${padding} 
      ${className}
    `}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, icon: Icon, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon && (
        <div className="w-9 h-9 rounded-lg bg-green-50 text-[#16A34A] flex items-center justify-center">
          <Icon size={20} />
        </div>
      )}
      <h3 className="text-lg font-bold text-[#111827]">{children}</h3>
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
