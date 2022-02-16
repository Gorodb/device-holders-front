import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IDevice} from "../../../../types/device.types";

export interface DeviceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  device: IDevice,
}
