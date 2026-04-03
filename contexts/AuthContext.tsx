"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const AUTH_KEY = "badaga_auth_user";

export interface AuthUser {
  name: string;
  email: string;
  loginTime: number;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadUser());

  const login = useCallback((name: string, email: string) => {
    const u: AuthUser = { name: name.trim(), email: email.trim().toLowerCase(), loginTime: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
