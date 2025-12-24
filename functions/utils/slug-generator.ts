import { slugify } from 'transliteration';

export function generateSlug(title: string) {
  return slugify(title);
}
