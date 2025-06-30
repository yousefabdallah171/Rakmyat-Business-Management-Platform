import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/api';
import { login as apiLogin, logout as apiLogout } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: User['role']) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optionally fetch user from /api/user if token exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await apiLogin(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const hasRole = (role: User['role']) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 