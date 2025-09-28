import type { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  {
    label: 'Головна',
    path: '/',
  },
  {
    label: 'Фільми',
    path: '/movies',
  },
  {
    label: 'Профіль',
    path: '/profile',
    private: true,
  },
  {
    label: 'Про нас',
    path: '/about',
  },
];
