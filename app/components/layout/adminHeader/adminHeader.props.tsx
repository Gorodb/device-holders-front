import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface AdminHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement> {
  children?: ReactNode;
}
