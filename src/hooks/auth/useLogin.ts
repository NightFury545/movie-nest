import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { login as loginRequest } from '@/services/auth';
import type { LoginData } from '@/types';

export function useLogin() {
  const { login: setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: LoginData) => {
    setIsLoading(true);
    try {
      const response = await loginRequest(payload);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
