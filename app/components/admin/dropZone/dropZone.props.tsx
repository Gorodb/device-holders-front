import {InputHTMLAttributes} from "react";
import {ImageListType} from "react-images-uploading/dist/typings";

export interface DropZoneProps extends InputHTMLAttributes<HTMLInputElement> {
  onImageUpload: (imageList: ImageListType, addUpdateIndex?: number[]) => void;
  images?: ImageListType
}
