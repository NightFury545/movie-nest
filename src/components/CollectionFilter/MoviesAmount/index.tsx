import React from 'react';
import styles from './movies-amount.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';
import type { MoviesAmountProps } from '@/components/CollectionFilter/MoviesAmount/movies-amount.types.ts';

const MoviesAmount: React.FC<MoviesAmountProps> = ({
  value,
  min = 4,
  max = 99,
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
      className={styles['movies-amount']}
      onMouseUp={handleCommit}
      onTouchEnd={handleCommit}
    >
      <span className={styles['movies-amount__title']}>Кількість фільмів</span>

      <div className={styles['movies-amount__controls']}>
        <span className={styles['movies-amount__value']}>{localValue[0]}</span>

        <RangeSlider
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
        />

        <span className={styles['movies-amount__value']}>{localValue[1]}</span>
      </div>
    </div>
  );
};

export default MoviesAmount;
