import { Search } from 'lucide-react';
import styles from './search-input.module.css';
import React, { useState } from 'react';
import type { SearchInputProps } from '@/components/SearchInput/search-input.types.ts';

const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  placeholder = 'Пошук...',
  onChange,
  onSubmit,
  disabled = false,
  className = '',
  icon,
}) => {
  const [text, setText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(text);
    }
  };

  return (
    <div className={`${styles['search-input']} ${className}`}>
      <div className={styles['search-input__icon']}>
        {icon ?? <Search size={18} />}
      </div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles['search-input__field']}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Поле пошуку"
      />
    </div>
  );
};

export default SearchInput;
