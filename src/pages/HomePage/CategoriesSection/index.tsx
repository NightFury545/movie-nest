import styles from './categories-section.module.css';
import CategoryCard from './CategoryCard';
import { categories } from '@/data/home-page.ts';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

const CategoriesSection = () => {
  const [categoryPage, setCategoryPage] = useState(1);

  return (
    <section className={styles['categories']}>
      <div className={styles['categories__container']}>
        <div className={styles['categories__content']}>
          <h2 className={styles['categories__title']}>
            Ознайомтеся з нашим широким розмаїттям категорій
          </h2>
          <p className={styles['categories__text']}>
            Чи шукаєте ви комедію, яка розсмішить вас, драму, яка змусить вас
            задуматися, чи документальний фільм, щоб дізнатися щось нове
          </p>
        </div>

        <div className={styles['categories__cards-wrapper']}>
          <div className={styles['categories__list']}>
            {categories.map((cat) => (
              <CategoryCard
                key={cat.label}
                title={cat.label}
                movies={cat.movies.map((movie) => ({
                  image: `/categories/${movie}.png`,
                }))}
              />
            ))}
          </div>
          <Pagination
            currentPage={categoryPage}
            totalPages={3}
            onPageChange={(page) => setCategoryPage(page)}
          ></Pagination>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
