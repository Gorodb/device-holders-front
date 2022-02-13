import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface DevicePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  id: string;
}
