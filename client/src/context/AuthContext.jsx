import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage safely
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  /* ------------------------------------------------------------------
      IMPORTANT:
      Render backend uses HTTP-only cookies for authentication.
      We CANNOT decode or access cookies from JS.

      So we do NOT store token in localStorage.
      Only user info is stored.
  ------------------------------------------------------------------ */
  
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Auto-restore session on refresh
  useEffect(() => {
    const checkSession = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL;
        if (!API) {
          console.warn("⚠ Missing API URL");
          setIsCheckingSession(false);
          return;
        }

        const res = await fetch(`${API}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success && data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(null);
        localStorage.removeItem("user");
      }

      setIsCheckingSession(false);
    };

    checkSession();
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isCheckingSession,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
