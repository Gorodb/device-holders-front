import {ActionsEnum} from "../enums/actions.enum";
import {IPagination} from "./pagination.types";
import {IDepartment} from "./departments.types";

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface ILogo {
  url: string;
  name: string;
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
  location?: string;
  role?: string;
  phone?: any;
  description?: any;
  department?: IDepartment;
  logo?: ILogo;
}

export interface ICurrentUser {
  id?: string;
  email: string;
  name?: string;
  location?: string;
  phone?: any;
  description?: any;
  department?: IDepartment;
  logo?: ILogo | null;
}

export interface ICurrentUserUpdate {
  id?: string;
  email: string;
  name?: string;
  location?: string;
  phone?: any;
  description?: any;
  department?: string;
  logo?: ILogo | null;
}

export interface IUserCreate {
  id?: string;
  email: string;
  name?: string;
  location?: string;
  role?: string;
  phone?: any;
  description?: any;
  department?: string;
  logo?: ILogo;
  password?: string
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
