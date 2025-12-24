import api from '@/lib/axios';
import type { LoginData, RegisterData, AuthResponse, User } from '@/types';
import handleAxiosError from '@/utils/axios-error-handler.ts';

export async function login(payload: LoginData): Promise<AuthResponse> {
  try {
    const { data: response } = await api.post<AuthResponse>(
      '/auth/login',
      payload,
    );
    return response;
  } catch (err: unknown) {
    handleAxiosError(err, 'Помилка входу');
  }
}

export async function register(payload: RegisterData): Promise<AuthResponse> {
  try {
    const { data: response } = await api.post<AuthResponse>(
      '/auth/register',
      payload,
    );
    return response;
  } catch (err: unknown) {
    handleAxiosError(err, 'Помилка реєстрації');
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (err: unknown) {
    handleAxiosError(err, 'Помилка виходу');
  }
}

export async function me(): Promise<User> {
  try {
    const { data: response } = await api.get<User>('/auth/me');
    return response;
  } catch (err: unknown) {
    handleAxiosError(err, 'Помилка отримання даних');
  }
}
