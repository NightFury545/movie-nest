import React, { useRef, useCallback } from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './button.types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const button = buttonRef.current;
      if (button) {
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add(styles.ripple);

        const ripple = button.getElementsByClassName(styles.ripple)[0];
        ripple?.remove();

        button.appendChild(circle);

        setTimeout(() => {
          if (circle.parentElement === button) {
            button.removeChild(circle);
          }
        }, 600);
      }

      onClick?.();
    },
    [disabled, onClick],
  );

  return (
    <button
      ref={buttonRef}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${disabled ? styles.disabled : ''} 
        ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
