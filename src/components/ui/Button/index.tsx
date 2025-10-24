import React from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './button.types';
import { useRipple } from '@/hooks/useRipple';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className,
  icon,
}) => {
  const { ref: rippleRef, handleClick } = useRipple();

  return (
    <button
      ref={rippleRef}
      className={`
      ${styles.button} 
      ${styles[variant]} 
      ${styles[size]} 
      ${disabled ? styles.disabled : ''} 
      ${className}`}
      onClick={(e) => handleClick(e, onClick, disabled)}
      disabled={disabled}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      <span className={styles.button__text}>{children}</span>
    </button>
  );
};

export default Button;
