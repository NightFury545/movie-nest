export const movieGenres = [
  { label: 'Драма', value: 'Drama' },
  { label: 'Пригодницькі', value: 'Adventure' },
  { label: 'Фентезі', value: 'Fantasy' },
  { label: 'Комедія', value: 'Comedy' },
  { label: 'Бойовики', value: 'Shooter' },
  { label: 'Жахи', value: 'Horror' },
];

export const movieSortBy = [
  { label: 'Рік виходу (нові спочатку)', value: 'release_desc' },
  { label: 'Рік виходу (старі спочатку)', value: 'release_asc' },
  { label: 'Популярність', value: 'popularity_desc' },
  { label: 'Рейтинг (вищий спочатку)', value: 'rating_desc' },
  { label: 'Рейтинг (нижчий спочатку)', value: 'rating_asc' },
  { label: 'Назва (A → Я)', value: 'title_asc' },
  { label: 'Назва (Я → A)', value: 'title_desc' },
];

export const movieLanguages = [
  'en',
  'ja',
  'fr',
  'ko',
  'es',
  'tr',
  'zh',
  'de',
  'hi',
  'it',
  'uk',
  'fi',
];

export const ageRatings = [
  { value: 'G', label: 'G — Усі глядачі' },
  { value: 'PG', label: 'PG — Батьківський контроль' },
  { value: 'PG-13', label: 'PG-13 — Від 13 років' },
  { value: 'R', label: 'R — Від 17 років' },
  { value: 'NC-17', label: 'NC-17 — Від 18 років' },
  { value: '0', label: '0+ — Без обмежень' },
  { value: '6', label: '6+ — Від 6 років' },
  { value: '12', label: '12+ — Від 12 років' },
  { value: '16', label: '16+ — Від 16 років' },
  { value: '18', label: '18+ — Від 18 років' },
  { value: 'NR', label: 'NR — Без рейтингу' },
];

export const productionCountries = [
  { value: 'US', label: 'США' },
  { value: 'GB', label: 'Велика Британія' },
  { value: 'FR', label: 'Франція' },
  { value: 'DE', label: 'Німеччина' },
  { value: 'IT', label: 'Італія' },
  { value: 'JP', label: 'Японія' },
  { value: 'CN', label: 'Китай' },
  { value: 'IN', label: 'Індія' },
  { value: 'CA', label: 'Канада' },
  { value: 'AU', label: 'Австралія' },
  { value: 'KR', label: 'Південна Корея' },
  { value: 'ES', label: 'Іспанія' },
  { value: 'MX', label: 'Мексика' },
  { value: 'BR', label: 'Бразилія' },
  { value: 'RU', label: 'Росія' },
];

export const movieStatuses = [
  { value: 'in_production', label: 'У виробництві' },
  { value: 'planned', label: 'Заплановано' },
  { value: 'rumor', label: 'Чутки' },
  { value: 'released', label: 'Випущено' },
  { value: 'post_production', label: 'Постпродакшн' },
  { value: 'canceled', label: 'Скасовано' },
];
