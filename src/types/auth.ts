import type { User } from './user';

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export type RegisterData = Omit<User, 'id' | 'avatar'> & { password: string };

export type LoginData = Pick<User, 'email'> & { password: string };

export interface AuthResponse {
  token: string;
  user: User;
}
