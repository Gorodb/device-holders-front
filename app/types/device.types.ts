import {IUser} from "./auth.types";
import {IPagination} from "./pagination.types";
import {IDepartment} from "./departments.types";

export interface IDeviceType {
  id: string;
  deviceType: string;
  title: string;
  description: string;
}

export interface IDevice {
  id: string;
  name: string;
  osName: string;
  defaultLocation: string;
  currentLocation: string;
  charge?: any;
  department: IDepartment;
  deviceType: IDeviceType;
  owner: IUser;
  heldByUser: IUser;
}


export interface IDevices {
  items: IDevice[];
  pagination: IPagination;
}
