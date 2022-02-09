import {ReactNode, SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  className?: string;
  defaultOptionText: string;
  children: ReactNode;
}
