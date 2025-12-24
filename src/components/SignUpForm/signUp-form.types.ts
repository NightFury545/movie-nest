import type { RegisterData } from '@/types';

export interface SignUpFormProps {
  onSubmit: (payload: RegisterData) => void;
  isLoading?: boolean;
}
