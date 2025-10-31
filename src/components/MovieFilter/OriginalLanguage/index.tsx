import styles from './original-language.module.css';
import React, { useState } from 'react';

interface OriginalLanguageProps {
  value: string[];
  options: string[];
  onChange?: (value: string[]) => void;
}

const OriginalLanguage: React.FC<OriginalLanguageProps> = ({
  value,
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(value);

  const handleClick = (language: string) => {
    const newSelected = selected.includes(language)
      ? selected.filter((l) => l !== language)
      : [...selected, language];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={styles['original-language']}>
      <span className={styles['original-language__title']}>Мова оригіналу</span>
      <div className={styles['original-language__list']}>
        {options.map((language) => (
          <div
            key={language}
            onClick={() => handleClick(language)}
            className={`${styles['original-language__list-item']} ${
              selected.includes(language)
                ? styles['original-language__list-item--active']
                : ''
            }`}
          >
            <span className={styles['original-language__text']}>
              {language}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OriginalLanguage;
