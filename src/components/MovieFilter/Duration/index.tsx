import React from 'react';
import styles from './duration.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';
import type { DurationProps } from '@/components/MovieFilter/Duration/duration.types.ts';

export const Duration: React.FC<DurationProps> = ({
  value,
  min = 0,
  max = 360,
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
      className={styles['duration']}
      onMouseUp={handleCommit}
      onTouchEnd={handleCommit}
    >
      <span className={styles['duration__title']}>Тривалість (хв)</span>

      <div className={styles['duration__controls']}>
        <span className={styles['duration__value']}>{localValue[0]}</span>

        <RangeSlider
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
        />

        <span className={styles['duration__value']}>{localValue[1]}</span>
      </div>
    </div>
  );
};
