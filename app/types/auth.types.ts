import {ActionsEnum} from "../enums/actions.enum";
import {IPagination} from "./pagination.types";
import {IDepartment} from "./departments.types";

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IRegCredentials {
  email: string;
  password: string;
  department: string;
}

export interface IAuthResult {
  accessToken: string;
}

export interface IUser {
  id?: string;
  email: string;
  name?: string;
  role?: string;
  phone?: any;
  description?: any;
  department?: IDepartment;
  logo?: any;
}

export interface IUsers {
  items: IUser[];
  pagination: IPagination;
}

export interface IValidateCode {
  code: number,
  action: ActionsEnum
}

export interface ISendCode {
  email: string,
  action: ActionsEnum
}
