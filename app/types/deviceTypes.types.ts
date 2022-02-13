import {IPagination} from "./pagination.types";

export interface IGetDeviceTypesParams {
  limit: number;
  page: number;
  search?: string;
}

export interface IDeviceType {
  id?: string;
  deviceType: string;
  title: string;
  description: string;
}

export interface IDeviceTypes {
  items: IDeviceType[];
  pagination: IPagination;
}
