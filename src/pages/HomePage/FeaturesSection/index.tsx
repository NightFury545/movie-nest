import styles from './features-section.module.css';
import FeatureCard from './FeatureCard';
import { features } from '@/data/home-page.ts';

const FeaturesSection = () => {
  return (
    <section className={styles['features']}>
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} reverse={idx % 2 === 1} />
      ))}
    </section>
  );
};

export default FeaturesSection;
