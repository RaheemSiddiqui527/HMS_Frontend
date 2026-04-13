"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("medicare_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    // Mock login logic
    const userRole = userData.role || "patient";
    const userProfile = {
      ...userData,
      name: userData.name || userData.email.split("@")[0].charAt(0).toUpperCase() + userData.email.split("@")[0].slice(1),
      avatar: userData.email.split("@")[0].substring(0, 2).toUpperCase(),
    };

    setUser(userProfile);
    localStorage.setItem("medicare_user", JSON.stringify(userProfile));

    // Role-based redirection
    if (userRole === "admin") router.push("/admin/dashboard");
    else if (userRole === "doctor") router.push("/doctor/dashboard");
    else if (userRole === "staff") router.push("/staff/dashboard");
    else router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medicare_user");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
