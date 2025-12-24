import { useNavigate } from 'react-router-dom';
import SignUpForm from '@/components/SignUpForm';
import styles from './signUp-page.module.css';
import { useRegister } from '@/hooks/auth/useRegister';
import type { RegisterData } from '@/types';

const SignUpPage = () => {
  const { register, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      navigate('/');
    } catch (err: unknown) {
      alert((err as Error).message);
      // TODO: show Toast
    }
  };

  return (
    <div className={styles['signup']}>
      <div className={styles['signup__card']}>
        <SignUpForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignUpPage;
