export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}
