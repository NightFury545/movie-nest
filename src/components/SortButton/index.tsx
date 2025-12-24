import React, { useState } from 'react';
import styles from './sort-button.module.css';
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react';
import type { SortButtonProps } from './sort-button.types';

export const SortButton: React.FC<SortButtonProps> = ({
  defaultOrder = 'asc',
  onChange,
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);

  const toggleOrder = () => {
    const next = order === 'asc' ? 'desc' : 'asc';
    setOrder(next);
    onChange?.(next);
  };

  return (
    <button className={styles.sort} onClick={toggleOrder}>
      {order === 'asc' ? renderAscIcon() : renderDescIcon()}
    </button>
  );
};

function renderAscIcon() {
  return <ArrowUpWideNarrow size={20} />;
}

function renderDescIcon() {
  return <ArrowDownWideNarrow size={20} />;
}
