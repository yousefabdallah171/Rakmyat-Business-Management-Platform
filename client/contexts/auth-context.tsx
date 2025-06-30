'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'specialist' | 'employee';
  department?: string;
  avatar?: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmad Al-Mansouri',
    email: 'admin@raqmena.com',
    role: 'owner',
    department: 'Executive',
    permissions: ['*'], // All permissions
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'hr@raqmena.com',
    role: 'manager',
    department: 'Human Resources',
    permissions: ['hr.*', 'employees.*', 'payroll.*'],
  },
  {
    id: '3',
    name: 'Mohammed Ibrahim',
    email: 'accountant@raqmena.com',
    role: 'specialist',
    department: 'Accounting',
    permissions: ['accounting.*', 'invoices.*', 'expenses.*'],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('raqmena_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading saved user:', error);
      localStorage.removeItem('raqmena_user');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('raqmena_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raqmena_user');
    window.location.href = '/';
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Owner has all permissions
    if (user.permissions.includes('*')) return true;
    
    // Check exact permission match
    if (user.permissions.includes(permission)) return true;
    
    // Check wildcard permissions
    const wildcardPermissions = user.permissions.filter(p => p.endsWith('*'));
    return wildcardPermissions.some(p => 
      permission.startsWith(p.slice(0, -1))
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}