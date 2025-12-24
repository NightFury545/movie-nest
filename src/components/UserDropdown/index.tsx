import React, { useState, useRef, useEffect } from 'react';
import type { User } from '@/types';
import Avatar from '@/components/Avatar';
import { LogOut, Settings } from 'lucide-react';
import styles from './user-dropdown.module.css';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/auth/useLogout.ts';

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpenProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await logout();
      navigate('/');
      //TODO: Show Toast
    } catch (err: unknown) {
      alert((err as Error).message);
      //TODO: Show Toast
    }
  };

  return (
    <div className={styles['user-dropdown']} ref={ref}>
      <div
        className={styles['user-dropdown__avatar']}
        onClick={handleToggleMenu}
      >
        <Avatar avatar_url={user.avatar} />
      </div>

      {isOpen && (
        <div className={styles['user-dropdown__menu']}>
          <div
            className={styles['user-dropdown__option']}
            onClick={handleOpenProfile}
          >
            <Settings size={16} className={styles['user-dropdown__icon']} />
            Профіль
          </div>

          <div
            className={styles['user-dropdown__option']}
            onClick={handleLogout}
          >
            <LogOut size={16} className={styles['user-dropdown__icon']} />
            Вийти
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
