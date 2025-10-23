import styles from './category-card.module.css';

interface CategoryCardProps {
  title: string;
  movies: { image: string }[];
}

const CategoryCard = ({ title, movies }: CategoryCardProps) => {
  return (
    <div className={styles['category-card']}>
      <div className={styles['category-card__images']}>
        {movies.slice(0, 4).map((movie, index) => (
          <img
            key={index}
            src={movie.image}
            alt={`${title} movie ${index + 1}`}
            className={styles['category-card__image']}
          />
        ))}
      </div>
      <div className={styles['category-card__footer']}>
        <span className={styles['category-card__title']}>{title}</span>
        <span className={styles['category-card__arrow']}>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;
