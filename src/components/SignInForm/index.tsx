import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './signIn-form.module.css';
import logo from '@/assets/movie-nest-logo.png';
import { Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SignInForm = () => {
  return (
    <div className={styles['signin-form']}>
      <img src={logo} alt="MovieNest" className={styles['signin-form__logo']} />

      <h2 className={styles['signin-form__title']}>
        Ласкаво просимо до{' '}
        <span className={styles['signin-form__brand']}>MovieNest</span>
      </h2>
      <p className={styles['signin-form__subtitle']}>Поринь у світ фільмів</p>

      <div className={styles['signin-form__form']}>
        <Input type="email" label="Електронна адреса" />
        <Input type="password" label="Пароль" />

        <Button className={styles['signin-form__submit']}>Увійти</Button>

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
