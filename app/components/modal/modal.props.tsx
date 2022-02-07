import {DetailedHTMLProps, HTMLAttributes,} from "react";

export enum ModelTypeEnum {
  deleteConfirm = 'deleteConfirm',
}

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>{}
