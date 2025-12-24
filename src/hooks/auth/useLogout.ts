import { useAuth } from '@/hooks/useAuth';
import { logout as logoutRequest } from '@/services/auth';

export function useLogout() {
  const { logout: clearUser } = useAuth();

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem('token');
    clearUser();
  };

  return { logout };
}
