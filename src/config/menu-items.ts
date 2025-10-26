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
    label: 'Колекції',
    path: '/collections',
  },
  {
    label: 'Улюблене',
    path: '/favorites',
    private: false,
  },
  {
    label: 'FAQ',
    path: '/about',
  },
];
