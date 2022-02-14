import {ReactNode, TextareaHTMLAttributes} from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  inputRef?: any;
  children?: ReactNode,
  isRequired?: boolean;
  requiredText?: string;
}
