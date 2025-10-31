import { Search } from 'lucide-react';
import styles from './search-input.module.css';
import React, { useState } from 'react';

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function SearchInput({
  value = '',
  placeholder = 'Пошук...',
  onChange,
  onSubmit,
  disabled = false,
  className = '',
}: SearchInputProps) {
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
      <Search className={styles['search-input__icon']} size={18} />
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
}
