export interface ReleaseYearProps {
  value: [number, number];
  min?: number;
  max?: number;
  onChange: (value: [number, number]) => void;
}
