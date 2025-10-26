import SignUpForm from '@/components/SignUpForm';
import styles from './signup-page.module.css';

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
