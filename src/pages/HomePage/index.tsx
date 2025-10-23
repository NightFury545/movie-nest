import styles from './home-page.module.css';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <CategoriesSection />
    </div>
  );
};

export default HomePage;
