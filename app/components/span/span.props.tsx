import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export enum SpanSizeEnum {
  small,
  medium,
  large
}

export interface SpanProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>{
  size: SpanSizeEnum;
  children: ReactNode;
}
