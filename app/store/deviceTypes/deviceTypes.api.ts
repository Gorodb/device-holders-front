import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";
import {IDeviceType, IDeviceTypes, IGetDeviceTypesParams} from "../../types/deviceTypes.types";
import {TypeRootState} from "../store";

export const deviceTypesApi = createApi({
  reducerPath: 'api/deviceTypes',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/device_types`,
    prepareHeaders: (headers, api) => {
      const state = api.getState() as TypeRootState
      if (state.auth.isAuth) {
        const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
        headers.set("Authorization", authorisation)
      }
      return headers
    }
  }),
  tagTypes: ['Get', 'GetDeviceType'],
  endpoints: (builder) => {
    return {
      getDeviceTypes: builder.query<IDeviceTypes, IGetDeviceTypesParams>({
        query: (queryParams: IGetDeviceTypesParams) => ({
          url: `?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getDeviceType: builder.query<IDeviceType, string>({
        query: (id: string) => ({
          url: `/${id}`,
        }),
        providesTags: ['GetDeviceType'],
      }),
      createDeviceType: builder.mutation<any, IDeviceType>({
        query: (body: IDeviceType) => ({
          url: "/",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDeviceType'],
      }),
      updateDeviceType: builder.mutation<any, IDeviceType>({
        query: ({ id, ...body}: IDeviceType) => ({
          url: `/${id}`,
          method: "PUT",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDeviceType'],
      }),
      deleteDeviceType: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `/${id}`,
          method: "DELETE",
          crossDomain: true,
          responseType: "json",
        }),
        invalidatesTags: ['Get'],
      }),
    }
  }
});

export const {
  useGetDeviceTypeQuery,
  useGetDeviceTypesQuery,
  useLazyGetDeviceTypeQuery,
  useCreateDeviceTypeMutation,
  useUpdateDeviceTypeMutation,
  useDeleteDeviceTypeMutation,
} = deviceTypesApi;
