import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";
import {IDeviceType, IDeviceTypes, IGetDeviceTypesParams} from "../../types/deviceTypes.types";

export const deviceTypesApi = createApi({
  reducerPath: 'api/deviceTypes',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/device_types`}),
  tagTypes: ['Get', 'GetDeviceType'],
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
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
          headers: { Authorization: authorisation },
        }),
        providesTags: ['GetDeviceType'],
      }),
      createDeviceType: builder.mutation<any, IDeviceType>({
        query: (body: IDeviceType) => ({
          url: "/",
          method: "POST",
          headers: { Authorization: authorisation },
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
          headers: { Authorization: authorisation },
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
          headers: { Authorization: authorisation },
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
