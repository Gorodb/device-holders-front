import {IPagination} from "./pagination.types";

export interface IDepartment {
  id?: string;
  name: string;
  description: string;
}

export interface IDepartments {
  items: IDepartment[];
  pagination: IPagination;
}
