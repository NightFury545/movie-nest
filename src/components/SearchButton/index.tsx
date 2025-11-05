import { Search } from 'lucide-react';
import styles from './search-button.module.css';
import { useRipple } from '@/hooks/useRipple';
import type { SearchButtonProps } from '@/components/SearchButton/search-button.types.ts';
import React from 'react';

const SearchButton: React.FC<SearchButtonProps> = ({
  onClick,
  variant = 'full',
  className = '',
  disabled = false,
}) => {
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
};

export default SearchButton;
