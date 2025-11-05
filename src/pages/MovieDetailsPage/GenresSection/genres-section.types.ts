export interface Genre {
  title: string;
  description: string;
  iconUrl?: string;
}

export interface GenresSectionProps {
  genres: Genre[];
}
