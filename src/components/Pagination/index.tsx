import React from 'react';
import styles from './pagination.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from '@/components/Pagination/pagination.types.ts';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles['pagination__arrow']} ${
          currentPage === 1 ? styles['pagination__arrow--disabled'] : ''
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span>Минула</span>
      </button>

      <div className={styles['pagination__pages']}>
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={index} className={styles['pagination__dots']}>
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`${styles['pagination__page']} 
              ${currentPage === page ? styles['pagination__page--active'] : ''}`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={`${styles['pagination__arrow']} ${
          currentPage === totalPages
            ? styles['pagination__arrow--disabled']
            : ''
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <span>Наступна</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
