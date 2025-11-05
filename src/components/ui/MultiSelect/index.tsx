import React, { useState, useRef, useEffect } from 'react';
import styles from './multi-select.module.css';
import { ChevronDown } from 'lucide-react';
import type { MultiSelectProps } from '@/components/ui/MultiSelect/multi-select.types.ts';

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Обрати...',
  onChange,
  defaultValue = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const displayText =
    selected.length > 0
      ? options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(', ')
      : placeholder;

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
    <div className={styles['multi-select']} ref={ref}>
      <div
        className={`${styles['multi-select__control']} ${
          isOpen ? styles['multi-select__control--open'] : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${styles['multi-select__placeholder']} ${
            selected.length > 0 ? styles['multi-select__selected'] : ''
          }`}
        >
          {displayText}
        </span>
        <ChevronDown
          size={18}
          className={`${styles['multi-select__icon']} ${
            isOpen ? styles['multi-select__icon--rotated'] : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className={styles['multi-select__menu']}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={styles['multi-select__option']}
              onClick={() => toggleOption(opt.value)}
            >
              <span
                className={`${styles['multi-select__checkbox']} ${
                  selected.includes(opt.value)
                    ? styles['multi-select__checkbox--checked']
                    : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className={styles['multi-select__label']}>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
