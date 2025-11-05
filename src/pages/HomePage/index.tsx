import styles from './home-page.module.css';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import FeaturesSection from '@/pages/HomePage/FeaturesSection';

const HomePage = () => {
  return (
    <div className={styles['home']}>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
