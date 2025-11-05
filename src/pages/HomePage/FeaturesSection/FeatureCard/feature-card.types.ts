import type { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  title: string;
  text: string;
  image: string;
  icons: LucideIcon[];
  reverse?: boolean;
}
