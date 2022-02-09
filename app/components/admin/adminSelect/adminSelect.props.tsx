import {ReactNode, SelectHTMLAttributes} from "react";

export interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
  label?: string;
  className?: string;
  selectedValue?: string;
  onClear?: (...args: any[]) => void;
  defaultOptionText?: string;
}
