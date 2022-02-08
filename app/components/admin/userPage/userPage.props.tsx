import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface UserPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  id: string;
}
