import Cookies from "js-cookie";
import {CookiesEnum} from "../enums/cookies.enum";
import {IDepartment} from "../types/departments.types";

export const useDepartmentJson = (): IDepartment | undefined => {
  let department: IDepartment | undefined;
  const departmentFromCookies = Cookies.get(CookiesEnum.department)
  if (typeof departmentFromCookies === "string") {
    department = JSON.parse(departmentFromCookies)
  }
  return department
}
