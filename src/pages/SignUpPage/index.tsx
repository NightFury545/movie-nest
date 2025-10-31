import SignUpForm from '@/components/SignUpForm';
import styles from './signUp-page.module.css';

const SignUpPage = () => {
  return (
    <div className={styles['signup']}>
      <div className={styles['signup__card']}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
