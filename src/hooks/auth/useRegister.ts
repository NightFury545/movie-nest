import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { register as registerRequest } from '@/services/auth';
import type { RegisterData } from '@/types';

export function useRegister() {
  const { login: setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (payload: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await registerRequest(payload);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
