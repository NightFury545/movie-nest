import React, { useState, useRef, useEffect } from 'react';
import styles from './select.module.css';
import { ChevronDown } from 'lucide-react';
import type { SelectProps } from '@/components/ui/Select/select.types.ts';

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Обрати...',
  onChange,
  defaultValue = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const displayText =
    options.find((o) => o.value === selected)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.select} ref={ref}>
      <div
        className={`${styles.select__control} ${
          isOpen ? styles['select__control--open'] : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${styles.select__placeholder} ${
            selected ? styles['select__selected'] : ''
          }`}
        >
          {displayText}
        </span>
        <ChevronDown
          size={18}
          className={`${styles.select__icon} ${
            isOpen ? styles['select__icon--rotated'] : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className={styles.select__menu}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.select__option} ${
                selected === opt.value ? styles['select__option--active'] : ''
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
