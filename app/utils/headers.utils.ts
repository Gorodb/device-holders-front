import Cookies from "js-cookie";
import {CookiesEnum} from "../enums/cookies.enum";

export const headersUtils = (headers: Headers) => {
  const isAuth = !!Cookies.get(CookiesEnum.authorisation)
  if (isAuth) {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation);
    headers.set("Authorization", authorisation);
  }
  return headers;
}
