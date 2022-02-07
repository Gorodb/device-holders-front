import {ButtonHTMLAttributes, SVGProps} from "react";

export enum CircleTypes {
  dark = 'dark',
  light = 'light',
}

export interface CircleLoaderProps extends SVGProps<SVGElement> {
  type: CircleTypes
}
