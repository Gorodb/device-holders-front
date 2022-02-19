import {InputHTMLAttributes} from "react";

export interface AutosuggestInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label?: string;
  inputRef?: any;
  onClear?: (...args: any[]) => void;
}
