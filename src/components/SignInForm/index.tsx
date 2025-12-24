import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './signIn-form.module.css';
import logo from '@/assets/movie-nest-logo.png';
import { Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import type { SignInFormProps } from '@/components/SignInForm/signIn-form.types.ts';
import React, { useState } from 'react';
import Spinner from '@/components/Spinner';

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <div className={styles['signin-form']}>
      <img src={logo} alt="MovieNest" className={styles['signin-form__logo']} />

      <h2 className={styles['signin-form__title']}>
        Ласкаво просимо до{' '}
        <span className={styles['signin-form__brand']}>MovieNest</span>
      </h2>
      <p className={styles['signin-form__subtitle']}>Поринь у світ фільмів</p>

      <div className={styles['signin-form__form']}>
        <Input
          type="email"
          label="Електронна адреса"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          className={styles['signin-form__submit']}
          onClick={handleSubmit}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          Увійти
        </Button>

        <div className={styles['signin-form__divider']}>
          <span>АБО</span>
        </div>

        <Button icon={<FaGoogle />} className={styles['signin-form__social']}>
          Увійти через Google
        </Button>

        <Button icon={<FaGithub />} className={styles['signin-form__social']}>
          Увійти через GitHub
        </Button>
      </div>

      <p className={styles['signin-form__footer']}>
        Ще немає акаунту?{' '}
        <Link to="/sign-up" className={styles['signin-form__link']}>
          Зареєструватися
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
