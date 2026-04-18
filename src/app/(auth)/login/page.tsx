"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Lock, Mail, User, Shield, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { authService } from '../../../services/auth.service';

// Form Validation Schemas using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email.').required('Email Address is required.'),
  password: yup.string().required('Password is required.'),
});

const signupSchema = yup.object().shape({
  name: yup.string().required('Full Name is required.'),
  role: yup.string().oneOf(['admin', 'doctor', 'staff', 'patient'], 'Select a valid role').required('Role selection is required.'),
  email: yup.string().email('Please enter a valid email.').required('Email Address is required.'),
  password: yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is required.'),
});

export default function UnifiedAuthPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] text-slate-400 font-bold italic">Synchronizing Secure Portal...</div>}>
       <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLoginMode(false);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">

      {/* Institutional Branding */}
      {/* <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-100 border-2 border-primary-500/20">
         <img src="/logo2.png" alt="SDI Logo" className="w-10 h-10 object-contain brightness-0 invert" />
      </div> */}

      {/* Header Context */}
      <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">SDI Health Care</h1>
      <p className="text-sm font-bold text-slate-400 mb-8 max-w-[280px] text-center leading-relaxed">
         Institutional Access Portal<br />
         <span className="text-[10px] uppercase tracking-widest text-primary-500/60 mt-2 block italic">Authenticated Session Required</span>
      </p>

      {/* Dynamic Toggle Control */}
      <div className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-[1rem] flex items-center justify-between mb-8 relative shadow-inner">
         <div
            className={`absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 ease-in-out z-0
              ${isLoginMode ? 'translate-x-0' : 'translate-x-[calc(100%+0px)]'}
            `}
         ></div>

         <button
           onClick={() => setIsLoginMode(true)}
           className={`w-1/2 py-3 text-[13px] font-bold rounded-xl relative z-10 transition-colors ${isLoginMode ? 'text-slate-900' : 'text-slate-500'}`}
         >
            Sign In
         </button>
         <button
           onClick={() => setIsLoginMode(false)}
           className={`w-1/2 py-3 text-[13px] font-bold rounded-xl relative z-10 transition-colors ${!isLoginMode ? 'text-slate-900' : 'text-slate-500'}`}
         >
            Sign Up
         </button>
      </div>

      <div className="w-full min-h-[300px]">
        {/* Render Form Dynamically based on mode without losing React Hook Form instance safety */}
        {isLoginMode ? <LoginForm /> : <SignupForm onSuccess={() => setIsLoginMode(true)} />}
      </div>

      {/* Social Oauth Divider */}
      <div className="w-full flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-slate-100"></div>
        <div className="text-[11px] font-bold text-slate-400 tracking-wider">Or continue with</div>
        <div className="flex-1 h-px bg-slate-100"></div>
      </div>

      {/* Social Connects */}
      <div className="flex items-center gap-4 w-full justify-center">
         <button className="w-12 h-12 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors">
            {/* Google G visual mapping */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
         </button>
         <button className="w-12 h-12 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors">
            {/* Apple Icon */}
            <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.82 3.59-.8 1.49.02 2.62.66 3.37 1.77-3.02 1.7-2.38 5.68.74 6.9-1.01 2.25-2.05 3.9-2.78 4.3zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
         </button>
         <button className="w-12 h-12 bg-[#1877F2] border border-[#1877F2] rounded-full shadow-sm flex items-center justify-center hover:bg-[#166fe5] transition-colors">
            {/* Facebook */}
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
         </button>
         <button className="w-12 h-12 bg-black border border-black rounded-full shadow-sm flex items-center justify-center hover:bg-slate-900 transition-colors">
            {/* X */}
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
         </button>
      </div>
    </div>
  );
}

// ------------------------------------
// Sub-components for Form logic safety
// ------------------------------------

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setApiError('');
      // Use our configured Auth Service
      const response = await authService.login(data);

      // Persist token to satisfy the Dashboard auth guard
      localStorage.setItem('token', response.data.token);

      // Decode role from token to redirect properly
      const payload = JSON.parse(atob(response.data.token.split('.')[1]));
      const role = payload.role;

      const roleRoutes: Record<string, string> = {
        admin: '/admin',
        doctor: '/doctor',
        staff: '/staff',
        patient: '/patient'
      };

      router.push(roleRoutes[role] || '/admin');
    } catch (err: any) {
      setApiError(err.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 animate-fade-in">
      {apiError && (
         <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {apiError}
         </div>
      )}

      {/* Email Field */}
      <div className="space-y-2 relative">
         <label className="text-[12px] font-bold text-slate-800 ml-1 flex gap-1">Email Address <span className="text-primary-600">*</span></label>
         <div className="relative">
           <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input
             {...register("email")}
             type="email"
             placeholder="Enter your email address"
             className={`w-full bg-white border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-500'} rounded-[14px] pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm placeholder:text-slate-400 font-medium`}
           />
         </div>
         {errors.email?.message && <p className="text-red-500 text-[11px] font-bold pl-1">{String(errors.email.message)}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2 relative">
         <div className="flex items-center justify-between ml-1">
            <label className="text-[12px] font-bold text-slate-800 flex gap-1">Password <span className="text-primary-600">*</span></label>
            <a href="#" className="text-[11px] font-bold text-primary-600 hover:text-primary-700 transition-colors">Forgot Number?</a>
         </div>
         <div className="relative">
           <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input
             {...register("password")}
             type={showPassword ? "text" : "password"}
             placeholder="Enter your password"
             className={`w-full bg-white border ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-500'} rounded-[14px] pl-11 pr-12 py-3.5 text-sm outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm placeholder:text-slate-400 font-medium`}
           />
           <button
             type="button"
             onClick={() => setShowPassword(!showPassword)}
             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
           >
             {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
           </button>
         </div>
         {errors.password?.message && <p className="text-red-500 text-[11px] font-bold pl-1">{String(errors.password.message)}</p>}
      </div>

      <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-[#185d51] hover:bg-[#124a40] text-white font-bold text-[14px] py-4 rounded-[14px] shadow-md transition-all mt-6 disabled:opacity-70 flex justify-center"
      >
         {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Sign In"}
      </button>
    </form>
  )
}

function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setApiError('');
      // Use configured Auth Service Register link
      await authService.register(data);
      // Registration successful, push back to login
      onSuccess();
    } catch (err: any) {
      setApiError(err.message || 'Account creation encountered an error.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 animate-fade-in relative">
       {apiError && (
         <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {apiError}
         </div>
      )}

      <div className="grid grid-cols-2 gap-3">
         {/* Name Field */}
         <div className="space-y-1.5 object-top">
            <label className="text-[11px] font-bold text-slate-800 ml-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className={`w-full bg-white border ${errors.name ? 'border-red-300' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-3 text-xs outline-none focus:ring-2 focus:ring-primary-500 shadow-sm`}
              />
            </div>
            {errors.name?.message && <p className="text-red-500 text-[10px] font-bold pl-1">{String(errors.name.message)}</p>}
         </div>
         {/* Role Field */}
         <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-800 ml-1">Account Type</label>
            <div className="relative">
              <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                {...register("role")}
                className={`w-full bg-white border ${errors.role ? 'border-red-300' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-[10.5px] lg:py-3 text-xs outline-none focus:ring-2 focus:ring-primary-500 shadow-sm appearance-none font-medium text-slate-600`}
                defaultValue=""
              >
                 <option value="" disabled>Select User Role</option>
                 <option value="admin">Administrator</option>
                 <option value="doctor">Medical Doctor</option>
                 <option value="staff">Hospital Staff</option>
                 <option value="patient">Patient Portal</option>
              </select>
            </div>
            {errors.role?.message && <p className="text-red-500 text-[10px] font-bold pl-1">{String(errors.role.message)}</p>}
         </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
         <label className="text-[11px] font-bold text-slate-800 ml-1">Email Address</label>
         <div className="relative">
           <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input
             {...register("email")}
             type="email"
             placeholder="hello@example.com"
             className={`w-full bg-white border ${errors.email ? 'border-red-300' : 'border-slate-200'} rounded-xl pl-9 pr-3 py-3 text-xs outline-none focus:ring-2 focus:ring-primary-500 shadow-sm`}
           />
         </div>
         {errors.email?.message && <p className="text-red-500 text-[10px] font-bold pl-1">{String(errors.email.message)}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
         <label className="text-[11px] font-bold text-slate-800 ml-1">Create Password</label>
         <div className="relative">
           <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input
             {...register("password")}
             type={showPassword ? "text" : "password"}
             placeholder="Minimum 6 characters"
             className={`w-full bg-white border ${errors.password ? 'border-red-300' : 'border-slate-200'} rounded-xl pl-9 pr-10 py-3 text-xs outline-none focus:ring-2 focus:ring-primary-500 shadow-sm`}
           />
           <button
             type="button"
             onClick={() => setShowPassword(!showPassword)}
             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
           >
             {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
           </button>
         </div>
         {errors.password?.message && <p className="text-red-500 text-[10px] font-bold pl-1">{String(errors.password.message)}</p>}
      </div>

      <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-[#185d51] hover:bg-[#124a40] text-white font-bold text-[13px] py-3.5 rounded-xl shadow-md transition-all mt-4 disabled:opacity-70 flex justify-center"
      >
         {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Create Account"}
      </button>
    </form>
  )
}
