import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/Spinner';
import styles from './signUp-form.module.css';
import logo from '@/assets/movie-nest-logo.png';
import { Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import type { SignUpFormProps } from '@/components/SignUpForm/signUp-form.types';

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, email, password });
  };

  return (
    <div className={styles['signup-form']}>
      <img src={logo} alt="MovieNest" className={styles['signup-form__logo']} />

      <h2 className={styles['signup-form__title']}>
        Створіть акаунт у{' '}
        <span className={styles['signup-form__brand']}>MovieNest</span>
      </h2>
      <p className={styles['signup-form__subtitle']}>
        Приєднуйтесь до світу фільмів
      </p>

      <div className={styles['signup-form__form']}>
        <Input
          type="text"
          label="Ім'я"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          className={styles['signup-form__submit']}
          onClick={handleSubmit}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          Зареєструватися
        </Button>

        <div className={styles['signup-form__divider']}>
          <span>АБО</span>
        </div>

        <Button icon={<FaGoogle />} className={styles['signup-form__social']}>
          Зареєструватися через Google
        </Button>

        <Button icon={<FaGithub />} className={styles['signup-form__social']}>
          Зареєструватися через GitHub
        </Button>
      </div>

      <p className={styles['signup-form__footer']}>
        Вже є акаунт?{' '}
        <Link to="/login" className={styles['signup-form__link']}>
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
