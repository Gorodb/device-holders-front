import {ReactNode, SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  onClear?: () => void;
  label?: string
  className?: string;
  defaultOptionText: string;
  children: ReactNode;
  isRequired?: boolean;
  requiredText?: string;
}
