import type { LoginData } from '@/types';

export interface SignInFormProps {
  onSubmit: (payload: LoginData) => void;
  isLoading?: boolean;
}
