import React from 'react';
import type { DescriptionSectionProps } from './description-section.types';
import styles from './description-section.module.css';
import { FaStar, FaPlay } from 'react-icons/fa';
import {
  MdAccessTimeFilled,
  MdCalendarMonth,
  MdLanguage,
  MdOutlineFlag,
} from 'react-icons/md';
import { BsCollectionPlay } from 'react-icons/bs';
import { PiTelevisionBold } from 'react-icons/pi';
import { GiAges } from 'react-icons/gi';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const tabs = ['Жанри', 'Актори', 'Коментарі'];

const PlayButton: React.FC<{ className?: string }> = ({ className }) => (
  <button
    type="button"
    aria-label="Play trailer"
    className={`${styles['description__play']} ${className ?? ''}`}
  >
    <FaPlay />
  </button>
);

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  description,
  imageUrl,
  backgroundUrl,
  rating,
  type,
  status,
  releaseDate,
  language,
  duration,
  age,
  country,
}) => {
  return (
    <section className={styles['description']}>
      <div
        className={styles['description__background']}
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      <div className={styles['description__breadcrumb']}>
        <Link to="/movies">Фільми</Link>
        <ChevronRight size={16} aria-hidden="true" />
        <span>{title}</span>
      </div>

      <div className={styles['description__container']}>
        <div className={styles['description__poster']}>
          <img
            src={imageUrl}
            alt={`Постер: ${title}`}
            className={styles['description__image']}
          />
          <div className={styles['description__buttons']}>
            <Button variant="secondary">Додати в улюблене</Button>
            <Button variant="secondary">Додати до колекції</Button>
          </div>
        </div>

        <div className={styles['description__content']}>
          <h2 className={styles['description__title']}>{title}</h2>
          <p className={styles['description__text']}>{description}</p>

          <div className={styles['description__tabs']}>
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="secondary"
                onClick={() => {
                  window.location.hash = tab;
                }}
                className={styles['description__tab']}
              >
                {tab}
                <ArrowRight
                  size={16}
                  style={{ marginLeft: 8 }}
                  aria-hidden="true"
                />
              </Button>
            ))}
            <PlayButton className={styles['description__play--mobile']} />
          </div>

          <div className={styles['description__info']}>
            <div className={styles['description__info-block']}>
              <p>
                <FaStar /> Рейтинг: <span>{rating}</span>
              </p>
              <p>
                <PiTelevisionBold /> Тип: <span>{type}</span>
              </p>
              <p>
                <BsCollectionPlay /> Статус:{' '}
                <span className={styles['description__status']}>{status}</span>
              </p>
              <p>
                <MdCalendarMonth /> Дата виходу: <span>{releaseDate}</span>
              </p>
              <p>
                <MdLanguage /> Мова: <span>{language}</span>
              </p>
            </div>

            <div className={styles['description__info-block']}>
              <p>
                <MdAccessTimeFilled /> Тривалість (хв): <span>{duration}</span>
              </p>
              <p>
                <GiAges /> Вік: <span>{age}</span>
              </p>
              <p>
                <MdOutlineFlag /> Країна: <span>{country}</span>
              </p>
            </div>
          </div>
        </div>

        <PlayButton className={styles['description__play--desktop']} />
      </div>
    </section>
  );
};

export default DescriptionSection;
