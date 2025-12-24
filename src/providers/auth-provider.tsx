import React, { useState, useMemo, type ReactNode, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context.ts';
import type { AuthContextType } from '@/types';
import type { User } from '@/types';
import { me } from '@/services/auth.ts';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const user: User = await me();
        setUser(user);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    void initUser();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
