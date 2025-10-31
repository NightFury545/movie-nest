import SignInForm from '@/components/SignInForm';
import styles from './signIn-page.module.css';

const SignInPage = () => {
  return (
    <div className={styles['signin']}>
      <div className={styles['signin__card']}>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
