import React from 'react';
import styles from './release-year.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';

interface ReleaseYearProps {
  value: [number, number];
  min?: number;
  max?: number;
  onChange: (value: [number, number]) => void;
}

export const ReleaseYear: React.FC<ReleaseYearProps> = ({
  value,
  min = 1950,
  max = 2025,
  onChange,
}) => {
  return (
    <div className={styles['release-year']}>
      <span className={styles['release-year__title']}>Рік виходу</span>

      <div className={styles['release-year__controls']}>
        <span className={styles['release-year__value']}>{value[0]}</span>

        <RangeSlider min={min} max={max} value={value} onChange={onChange} />

        <span className={styles['release-year__value']}>{value[1]}</span>
      </div>
    </div>
  );
};
