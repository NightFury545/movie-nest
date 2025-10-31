import styles from './status.module.css';
import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface StatusProps {
  value: string[];
  options: Option[];
  onChange?: (value: string[]) => void;
}

const Status: React.FC<StatusProps> = ({ value, options, onChange }) => {
  const [selected, setSelected] = useState<string[]>(value);

  const handleClick = (statusValue: string) => {
    const newSelected = selected.includes(statusValue)
      ? selected.filter((s) => s !== statusValue)
      : [...selected, statusValue];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={styles['status']}>
      <span className={styles['status__title']}>Статус</span>
      <div className={styles['status__list']}>
        {options.map((status) => (
          <div
            key={status.value}
            onClick={() => handleClick(status.value)}
            className={`${styles['status__list-item']} ${
              selected.includes(status.value)
                ? styles['status__list-item--active']
                : ''
            }`}
          >
            <span className={styles['status__text']}>{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
