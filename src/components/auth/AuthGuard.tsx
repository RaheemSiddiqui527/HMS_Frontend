"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '../../services/auth.service';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthorized(false);
        setIsLoading(false);
        router.push('/login');
        return;
      }

      try {
        const user = authService.getCurrentUser();
        
        if (!user) {
          localStorage.removeItem('token');
          setAuthorized(false);
          setIsLoading(false);
          router.push('/login');
          return;
        }

        // Role-based protection
        const role = user.role;
        const pathSegments = pathname.split('/');
        const requestedPanel = pathSegments[1]; // e.g. 'admin', 'doctor', 'patient', 'staff'

        const validPanels = ['admin', 'doctor', 'patient', 'staff'];
        
        if (validPanels.includes(requestedPanel)) {
          if (role !== requestedPanel) {
            // User trying to access a panel that doesn't match their role
            // Redirect them to their own panel or home
            const roleRoutes: Record<string, string> = {
              admin: '/admin',
              doctor: '/doctor',
              staff: '/staff',
              patient: '/patient'
            };
            router.push(roleRoutes[role] || '/');
            return;
          }
        }

        setAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        setAuthorized(false);
        setIsLoading(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Verifying Secure Access...</p>
        </div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
