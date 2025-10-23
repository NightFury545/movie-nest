import styles from './hero-section.module.css';
import Button from '@/components/ui/Button';
import logo from '@/assets/movie-nest-logo.png';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles['hero__content']}>
        <div className={styles['hero__logo-title']}>
          <img
            src={logo}
            alt="MovieNest logo"
            className={styles['hero__logo']}
          />
          <h1 className={styles['hero__title']}>
            Ласкаво просимо до{' '}
            <span className={styles['hero__highlight']}>MovieNest</span>
          </h1>
        </div>

        <p className={styles['hero__text']}>
          MovieNest — портал для справжніх шанувальників кіно. Відкривай
          улюблені жанри, зберігай фільми у списки перегляду та знаходь
          натхнення для наступного кіно вечора.
        </p>
        <Button variant="primary">Переглянути фільми</Button>
      </div>
    </section>
  );
};

export default HeroSection;
