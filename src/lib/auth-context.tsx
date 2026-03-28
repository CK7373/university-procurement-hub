import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: "admin" | "procurement_officer" | "finance_officer" | "viewer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { username: string; email: string; password: string; full_name: string; role: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("ups_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login
    const mockUser: User = {
      id: 1,
      username: email.split("@")[0],
      email,
      full_name: "Demo User",
      role: "admin",
    };
    setUser(mockUser);
    localStorage.setItem("ups_user", JSON.stringify(mockUser));
    return true;
  };

  const signup = async (data: { username: string; email: string; password: string; full_name: string; role: string }): Promise<boolean> => {
    const mockUser: User = {
      id: Date.now(),
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      role: data.role as User["role"],
    };
    setUser(mockUser);
    localStorage.setItem("ups_user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ups_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
