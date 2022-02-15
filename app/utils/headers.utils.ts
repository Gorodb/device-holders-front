import {TypeRootState} from "../store/store";
import Cookies from "js-cookie";
import {CookiesEnum} from "../enums/cookies.enum";
import {BaseQueryApi} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const headersUtils = (headers: Headers, api: Pick<BaseQueryApi, 'getState' | 'endpoint' | 'type' | 'forced'>) => {
  const state = api.getState() as TypeRootState;
  if (state.auth.isAuth) {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation);
    headers.set("Authorization", authorisation);
  }
  return headers;
}
