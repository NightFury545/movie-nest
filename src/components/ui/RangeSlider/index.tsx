import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './range-slider.module.css';

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = [min, max],
  onChange,
}) => {
  const [range, setRange] = useState<[number, number]>(value);
  const [dragging, setDragging] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRange(value);
  }, [value]);

  const calcPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (dragging === null || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      let newVal =
        ((e.clientX - trackRect.left) / trackRect.width) * (max - min) + min;
      newVal = Math.round(newVal / step) * step;
      newVal = Math.min(Math.max(newVal, min), max);

      let [left, right] = range;
      if (dragging === 0) left = Math.min(newVal, right);
      else right = Math.max(newVal, left);

      setRange([left, right]);
      onChange?.([left, right]);
    },
    [dragging, range, min, max, step, onChange],
  );

  const handlePointerUp = useCallback(() => setDragging(null), []);

  useEffect(() => {
    if (dragging === null) return;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  return (
    <div className={styles.slider} ref={trackRef}>
      <div className={styles.track} />
      <div
        className={styles.range}
        style={{
          left: `${calcPercent(Math.min(range[0], range[1]))}%`,
          width: `${Math.abs(calcPercent(range[1]) - calcPercent(range[0]))}%`,
        }}
      />

      <div
        className={styles.thumb}
        style={{ left: `${calcPercent(range[0])}%` }}
        onPointerDown={() => setDragging(0)}
      >
        <div className={styles.handle} />
      </div>

      <div
        className={styles.thumb}
        style={{ left: `${calcPercent(range[1])}%` }}
        onPointerDown={() => setDragging(1)}
      >
        <div className={styles.handle} />
      </div>
    </div>
  );
};
