import { useAuth } from '@/hooks/useAuth.ts';
import UserDropdown from '@/components/UserDropdown';
import Button from '@/components/ui/Button';
import logo from '@/assets/movie-nest-logo.png';
import { menuItems } from '@/config/menu-items';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__left">
        <a href="/" className="logo">
          <img src={logo} alt="MovieNest logo" className="logo__image" />
          <span className="logo__text">MovieNest</span>
        </a>

        <nav className="menu">
          {menuItems.map((item) => {
            if (item.private && !user) return null;

            return (
              <a key={item.path} href={item.path} className="menu__item">
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="navbar__right">
        <button className="theme-toggle" aria-label="Toggle theme">
          <span className="theme-toggle__icon">🌙</span>
        </button>

        <form className="search" role="search">
          <input
            type="text"
            className="search__input"
            placeholder="Пошук..."
            aria-label="Пошук"
          />
        </form>

        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Button variant="secondary" size="medium">
            Увійти
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
