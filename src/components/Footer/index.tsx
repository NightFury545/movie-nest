import styles from './footer.module.css';
import { FaDiscord, FaTwitter, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__container']}>
        <div className={styles['footer__columns']}>
          <div className={styles['footer__column']}>
            <h4 className={styles['footer__heading']}>Головна</h4>
            <a className={styles['footer__link']} href="#">
              Привітання
            </a>
            <a className={styles['footer__link']} href="#">
              Категорії
            </a>
          </div>

          <div className={styles['footer__column']}>
            <h4 className={styles['footer__heading']}>Фільми</h4>
            <a className={styles['footer__link']} href="#">
              Новинки
            </a>
            <a className={styles['footer__link']} href="#">
              Хіти
            </a>
          </div>

          <div className={styles['footer__column']}>
            <h4 className={styles['footer__heading']}>Актори</h4>
            <a className={styles['footer__link']} href="#">
              Популярні
            </a>
            <a className={styles['footer__link']} href="#">
              Молоді
            </a>
          </div>

          <div className={styles['footer__column']}>
            <h4 className={styles['footer__heading']}>Тех. Підтримка</h4>
            <a
              className={`${styles['footer__link']} ${styles['footer__email']}`}
              href="mailto:movie.nest@support.com"
            >
              e-mail: movie.nest
              <br />
              @support.com
            </a>
          </div>

          <div className={styles['footer__column']}>
            <h4 className={styles['footer__heading']}>Соц. мережі</h4>
            <div className={styles['footer__socials']}>
              <FaDiscord size={20} />
              <FaTwitter size={20} />
              <FaXTwitter size={20} />
              <FaInstagram size={20} />
            </div>
          </div>
        </div>

        <hr className={styles['footer__divider']} />

        <div className={styles['footer__bottom']}>
          <span>© 2025 MovieNest</span>

          <div className={styles['footer__bottom-links']}>
            <a className={styles['footer__link']} href="#">
              Умови використання
            </a>
            <span className={styles['footer__separator']}>|</span>
            <a className={styles['footer__link']} href="#">
              Політика конфіденційності
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
