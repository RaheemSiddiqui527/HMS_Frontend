"use client";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon, 
  isLoading, 
  className = "", 
  disabled, 
  ...props 
}) {
  const variants = {
    primary: "bg-[#16A34A] text-white hover:bg-[#15803D] active:bg-[#166534] shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    link: "bg-transparent text-[#16A34A] p-0 hover:underline"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : Icon && <Icon className={size === "sm" ? "text-base" : "text-lg"} />}
      {children}
    </button>
  );
}
