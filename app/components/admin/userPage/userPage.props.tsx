import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface UserPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>{
  children: ReactNode;
}
