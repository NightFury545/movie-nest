export interface Option {
  value: string;
  label: string;
}

export interface StatusProps {
  value: string[];
  options: Option[];
  onChange?: (value: string[]) => void;
}
