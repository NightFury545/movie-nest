export interface Option {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  defaultValue?: string[];
}
