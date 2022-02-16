import {IUser} from "./auth.types";
import {IPagination} from "./pagination.types";
import {IDepartment} from "./departments.types";
import {IDeviceType} from "./deviceTypes.types";

export interface IGetDevicesParams {
  limit: number;
  page: number;
  search?: string;
  department?: string
}

export interface IDevice {
  id: string;
  name: string;
  osName: string;
  inventoryNumber?: string;
  defaultLocation: string;
  currentLocation: string;
  charge?: any;
  department?: IDepartment;
  deviceType?: IDeviceType;
  owner?: IUser;
  heldByUser?: IUser;
  previousUser?: IUser;
}

export interface ICreateDevice {
  id?: string
  name: string;
  osName: string;
  inventoryNumber?: string;
  defaultLocation: string;
  currentLocation: string;
  charge?: any;
  department?: string;
  deviceType?: string;
  owner?: string | null;
  heldByUser?: string | null;
}

export interface IDevices {
  items: IDevice[];
  pagination: IPagination;
}
