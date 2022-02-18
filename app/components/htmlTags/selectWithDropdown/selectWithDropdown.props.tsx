import {ReactNode, SelectHTMLAttributes} from "react";

export interface SelectWithDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  onClear?: () => void;
  label?: string
  className?: string;
  defaultOptionText: string;
  children: ReactNode;
  isRequired?: boolean;
  requiredText?: string;
  filtered: boolean;
  filterItems: string[];
  filterFunction: (arg: string) => void;
  defaultText: string;
}
