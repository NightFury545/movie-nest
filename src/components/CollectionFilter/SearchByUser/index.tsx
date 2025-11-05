import styles from './search-by-user.module.css';
import React from 'react';
import SearchInput from '@/components/SearchInput';
import { User } from 'lucide-react';
import type { SearchByUserProps } from '@/components/CollectionFilter/SearchByUser/search-by-user.types.ts';

const SearchByUser: React.FC<SearchByUserProps> = ({ value, onChange }) => {
  return (
    <div className={styles['search-by-user']}>
      <span className={styles['search-by-user__title']}>
        Пошук за користувачем
      </span>
      <SearchInput
        placeholder="Введіть ім’я користувача..."
        icon={<User size={18} />}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchByUser;
