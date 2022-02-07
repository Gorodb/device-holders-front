import {SelectHTMLAttributes} from "react";

export interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: JSX.Element[];
  label?: string;
  className?: string;
  selectedValue?: string;
  onClear?: (...args: any[]) => void;
  defaultOptionText: string;
}
