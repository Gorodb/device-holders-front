import {InputHTMLAttributes} from "react";
import {Area} from "react-easy-crop/types";

export interface ImageCropProps extends InputHTMLAttributes<HTMLInputElement> {
  image: string,
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void,
}
