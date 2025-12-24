import { useNavigate } from 'react-router-dom';
import SignInForm from '@/components/SignInForm';
import styles from './signIn-page.module.css';
import { useLogin } from '@/hooks/auth/useLogin.ts';
import type { LoginData } from '@/types';

const SignInPage = () => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    try {
      await login(data);
      navigate('/');
    } catch (err: unknown) {
      alert((err as Error).message);
      //TODO: show Toast
    }
  };

  return (
    <div className={styles['signin']}>
      <div className={styles['signin__card']}>
        <SignInForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignInPage;
