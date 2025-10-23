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
      {children}
    </button>
  );
};

export default Button;
