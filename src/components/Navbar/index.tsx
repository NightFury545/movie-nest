import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import UserDropdown from '@/components/UserDropdown';
import Button from '@/components/ui/Button';
import logo from '@/assets/movie-nest-logo.png';
import { menuItems } from '@/config/menu-items';
import SearchButton from '@/components/SearchButton';
import styles from './navbar.module.css';
import { Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLabel, setActiveLabel] = useState(menuItems[0].label);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname,
    );
    if (currentItem) setActiveLabel(currentItem.label);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles['navbar__container']}>
        <div className={styles['navbar__left']}>
          <Link to="/" className={styles['navbar__logo']}>
            <img
              src={logo}
              alt="MovieNest logo"
              className={styles['navbar__logo-image']}
            />
            <span className={styles['navbar__logo-text']}>MovieNest</span>
          </Link>

          {/* --- Бургер для мобільних --- */}
          {isMobile && (
            <button
              className={styles['navbar__burger']}
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Menu"
              type="button"
            >
              {activeLabel}
            </button>
          )}

          {/* --- Меню для ПК --- */}
          {!isMobile && (
            <nav className={styles['navbar__menu']}>
              {menuItems.map((item) => {
                if (item.private && !user) return null;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles['navbar__item']} ${
                      isActive ? styles['navbar__item--active'] : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className={styles['navbar__right']}>
          <button
            className={styles['navbar__theme-toggle']}
            aria-label="Toggle theme"
            type="button"
          >
            <Sun size={18} />
          </button>

          <SearchButton variant={isMobile ? 'icon' : 'full'} />

          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="medium">
                Увійти
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* --- Мобільне меню --- */}
      <nav
        className={`${styles['navbar__menu-mobile']} ${
          menuOpen ? styles['navbar__menu-mobile--open'] : ''
        }`}
        aria-hidden={!menuOpen}
      >
        {menuItems.map((item) => {
          if (item.private && !user) return null;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles['navbar__item']} ${
                isActive ? styles['navbar__item--active'] : ''
              }`}
              onClick={() => {
                setActiveLabel(item.label);
                closeMenu();
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {menuOpen && (
        <div
          className={styles['navbar__overlay']}
          onClick={closeMenu}
          role="button"
          aria-hidden={false}
          tabIndex={-1}
        />
      )}
    </header>
  );
};

export default Navbar;
