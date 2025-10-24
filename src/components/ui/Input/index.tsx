import React from 'react';
import styles from './input.module.css';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  fullWidth = true,
  ...props
}) => {
  return (
    <div
      className={`${styles.input} ${fullWidth ? styles['input--full'] : ''} ${
        error ? styles['input--error'] : ''
      }`}
    >
      {Icon && <Icon size={18} className={styles.input__icon} />}
      <input className={styles.input__field} placeholder={label} {...props} />
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};

export default Input;
