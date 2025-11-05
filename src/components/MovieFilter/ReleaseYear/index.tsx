import React from 'react';
import styles from './release-year.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';
import type { ReleaseYearProps } from '@/components/MovieFilter/ReleaseYear/release-year.types.ts';

export const ReleaseYear: React.FC<ReleaseYearProps> = ({
  value,
  min = 1950,
  max = 2025,
  onChange,
}) => {
  const [localValue, setLocalValue] = React.useState<[number, number]>(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: [number, number]) => {
    setLocalValue(newValue);
  };

  const handleCommit = () => {
    onChange(localValue);
  };

  return (
    <div
      className={styles['release-year']}
      onMouseUp={handleCommit}
      onTouchEnd={handleCommit}
    >
      <span className={styles['release-year__title']}>Рік виходу</span>

      <div className={styles['release-year__controls']}>
        <span className={styles['release-year__value']}>{localValue[0]}</span>

        <RangeSlider
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
        />

        <span className={styles['release-year__value']}>{localValue[1]}</span>
      </div>
    </div>
  );
};
