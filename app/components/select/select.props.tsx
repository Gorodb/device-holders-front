import {SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: JSX.Element[];
  className?: string;
  defaultOptionText: string;
}
