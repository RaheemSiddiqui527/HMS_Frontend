"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Load user from localStorage on mount and verify with backend
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("medicare_user");
      const token = localStorage.getItem("medicare_token");

      if (savedUser && token) {
        try {
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser({
              ...JSON.parse(savedUser),
              id: data.data._id || JSON.parse(savedUser).id,
            });
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("medicare_user");
            localStorage.removeItem("medicare_token");
          }
        } catch (err) {
          console.log("Token verification failed, clearing auth");
          localStorage.removeItem("medicare_user");
          localStorage.removeItem("medicare_token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { user: backendUser, token } = data.data;

      // Store token and user in localStorage
      localStorage.setItem("medicare_token", token);
      localStorage.setItem(
        "medicare_user",
        JSON.stringify({
          id: backendUser._id,
          email: backendUser.email,
          firstName: backendUser.firstName,
          lastName: backendUser.lastName,
          role: backendUser.role,
          name: `${backendUser.firstName} ${backendUser.lastName}`,
          avatar: `${backendUser.firstName.substring(0, 1)}${backendUser.lastName.substring(0, 1)}`.toUpperCase(),
          phoneNumber: backendUser.phoneNumber,
          status: backendUser.status,
        })
      );

      setUser({
        id: backendUser._id,
        email: backendUser.email,
        firstName: backendUser.firstName,
        lastName: backendUser.lastName,
        role: backendUser.role,
        name: `${backendUser.firstName} ${backendUser.lastName}`,
        avatar: `${backendUser.firstName.substring(0, 1)}${backendUser.lastName.substring(0, 1)}`.toUpperCase(),
        phoneNumber: backendUser.phoneNumber,
        status: backendUser.status,
      });

      // Role-based redirection
      if (backendUser.role === "admin") router.push("/admin/dashboard");
      else if (backendUser.role === "doctor") router.push("/doctor/dashboard");
      else if (backendUser.role === "staff") router.push("/staff/dashboard");
      else router.push("/dashboard");

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("medicare_token");
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("Logout API call failed, clearing local data anyway");
    }

    setUser(null);
    localStorage.removeItem("medicare_user");
    localStorage.removeItem("medicare_token");
    router.push("/auth/login");
  };

  const getAuthToken = () => {
    return localStorage.getItem("medicare_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
