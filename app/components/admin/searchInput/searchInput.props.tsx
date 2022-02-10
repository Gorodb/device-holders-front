import {InputHTMLAttributes} from "react";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label?: string;
  inputRef?: any;
  onClear?: (...args: any[]) => void;
}
