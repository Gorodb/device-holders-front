import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: any;
  label?: string;
  inputRef?: any;
}
