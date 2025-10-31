import React from 'react';
import styles from './rating.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';

interface RatingProps {
  value: [number, number];
  min?: number;
  max?: number;
  onChange: (value: [number, number]) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  min = 0,
  max = 10.0,
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
      className={styles['rating']}
      onMouseUp={handleCommit}
      onTouchEnd={handleCommit}
    >
      <span className={styles['rating__title']}>Рейтинг</span>

      <div className={styles['rating__controls']}>
        <span className={styles['rating__value']}>{localValue[0]}</span>

        <RangeSlider
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
        />

        <span className={styles['rating__value']}>{localValue[1]}</span>
      </div>
    </div>
  );
};
