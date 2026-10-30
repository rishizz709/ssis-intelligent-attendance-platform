import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { DEMO_USERS } from '../data/mockStudentData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  switchDemoUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // On mount: restore session only from explicit saved session — do NOT default to any user
    const savedUser = localStorage.getItem('ssis_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Validate it has required fields before restoring
        if (parsed && parsed.id && parsed.email && parsed.role) {
          setUser(parsed);
        } else {
          localStorage.removeItem('ssis_current_user');
        }
      } catch {
        localStorage.removeItem('ssis_current_user');
      }
    }
    // If no saved user, user stays null → login screen is shown. No auto-login default.
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string = 'password123'): Promise<void> => {
    setIsLoading(true);
    try {
      // Clear any previous session's role-specific data before loading new one
      api.clearRoleSpecificData();

      const { user: authUser } = await api.login(email, password);
      setUser(authUser);
      localStorage.setItem('ssis_current_user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ssis_current_user');
    // Clear all role-specific cached data on logout
    api.clearRoleSpecificData();
  };

  const switchDemoUser = (newUser: User) => {
    // Clear previous user's data before switching
    api.clearRoleSpecificData();
    setUser(newUser);
    localStorage.setItem('ssis_current_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
