export interface DurationProps {
  value: [number, number];
  min?: number;
  max?: number;
  onChange: (value: [number, number]) => void;
}
