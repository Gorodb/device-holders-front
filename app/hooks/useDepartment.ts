import Cookies from "js-cookie";
import {CookiesEnum} from "../enums/cookies.enum";

export const useDepartment = (): string | undefined => {
  let department: string | undefined;
  const departmentFromCookies = Cookies.get(CookiesEnum.department)
  if (typeof departmentFromCookies === "string") {
    department = JSON.parse(departmentFromCookies).id
  }
  return department
}
