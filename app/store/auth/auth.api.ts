import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuthCredentials, IAuthResult, IRegCredentials, ISendCode, IUser, IValidateCode} from "../../types/auth.types";
import Cookies from "js-cookie";
import { HYDRATE } from 'next-redux-wrapper'
import {CookiesEnum} from "../../enums/cookies.enum";

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/`}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => {
    return {
      auth: builder.mutation<IAuthResult, IAuthCredentials>({
        query: (body: IAuthCredentials) => ({
          url: "signIn",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        }),
        transformResponse: (response: IAuthResult) => {
          Cookies.set(CookiesEnum.authorisation, response.accessToken, { expires: 365, sameSite: 'strict', secure: true})
          return response
        }
      }),
      registration: builder.mutation<IAuthResult, IRegCredentials>({
        query: (body: IAuthCredentials) => ({
          url: "signUp",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        }),
        transformResponse: (response: IAuthResult) => {
          Cookies.set(CookiesEnum.accessToken, response.accessToken, { expires: 365, sameSite: 'strict', secure: true })
          return response
        }
      }),
      validateCode: builder.mutation<IAuthResult, IValidateCode>({
        query: (body: IValidateCode) => {
          const authorisation = Cookies.get(CookiesEnum.accessToken)
          return {
            url: "validate",
            method: "POST",
            body,
            headers: { access_token: authorisation },
            crossDomain: true,
            responseType: "json",
          }
        },
        transformResponse: (response: IAuthResult) => {
          Cookies.set(CookiesEnum.authorisation, response.accessToken, { expires: 365, sameSite: 'strict', secure: true })
          return response
        }
      }),
      resendCode: builder.mutation<IAuthResult, ISendCode>({
        query: (body: ISendCode) => {
          return {
            url: "send_code",
            method: "POST",
            body,
            crossDomain: true,
            responseType: "json",
          }
        },
        transformResponse: (response: IAuthResult) => {
          Cookies.set(CookiesEnum.authorisation, response.accessToken, { expires: 365, sameSite: 'strict', secure: true })
          return response
        }
      }),
      userInfo: builder.mutation<IUser, any>({
        query: () => {
          const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
          return {
            url: "user_info",
            method: "POST",
            headers: {Authorization: authorisation},
            crossDomain: true,
            responseType: "json",
          }
        }
      })
    }
  }
});

export const {
  useAuthMutation,
  useUserInfoMutation,
  useRegistrationMutation,
  useValidateCodeMutation,
  useResendCodeMutation,
} = authApi;
