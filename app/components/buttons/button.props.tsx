import {ButtonHTMLAttributes, ReactNode} from "react";
import {ButtonTypes} from "./buttonTypes.enum";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
  buttonType: ButtonTypes;
  isFullSize?: boolean
  buttonRef?: any;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
}
