import api from '@/lib/axios';
import type { LoginData, RegisterData, AuthResponse } from '@/types/auth';
import handleAxiosError from '@/utils/axios-error-handler.ts';

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const { data: response } = await api.post<AuthResponse>(
      '/auth/login',
      data,
    );
    return response;
  } catch (err: unknown) {
    handleAxiosError(err, 'Login failed');
  }
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const { data: response } = await api.post<AuthResponse>(
      '/auth/register',
      data,
    );
    return response;
  } catch (err: unknown) {
    handleAxiosError(err, 'Registration failed');
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (err: unknown) {
    handleAxiosError(err, 'Logout failed');
  }
}
