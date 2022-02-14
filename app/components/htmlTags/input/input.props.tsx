import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onClear?: (...args: any[]) => void;
  inputRef?: any;
  isRequired?: boolean;
  requiredText?: string;
}
