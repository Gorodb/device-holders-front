import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface TableFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>{
  onClickHandler: () => void;
  onClearHandler?: () => void;
  newItemButtonText: string;
  children: ReactNode;
}
