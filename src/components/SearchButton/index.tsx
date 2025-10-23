import { Search } from 'lucide-react';
import styles from './search-button.module.css';
import { useRipple } from '@/hooks/useRipple';

interface SearchButtonProps {
  onClick?: () => void;
  variant?: 'full' | 'icon';
  className?: string;
  disabled?: boolean;
}

export default function SearchButton({
  onClick,
  variant = 'full',
  className = '',
  disabled = false,
}: SearchButtonProps) {
  const { ref: rippleRef, handleClick } = useRipple();

  return (
    <button
      ref={rippleRef}
      className={`${styles['search-button']} ${
        variant === 'icon' ? styles['search-button--icon'] : ''
      } ${className} ${disabled ? styles.disabled : ''}`}
      onClick={(e) => handleClick(e, onClick, disabled)}
      disabled={disabled}
      aria-label="Відкрити пошук"
    >
      <Search className={styles['search-button__icon']} size={18} />
      {variant === 'full' && (
        <span className={styles['search-button__text']}>Пошук...</span>
      )}
    </button>
  );
}
