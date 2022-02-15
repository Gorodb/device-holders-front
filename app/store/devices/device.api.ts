import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {ICreateDevice, IDevice, IDevices, IGetDevicesParams} from "../../types/device.types";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";
import {TypeRootState} from "../store";

export const deviceApi = createApi({
  reducerPath: 'api/devices',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/devices`,
    prepareHeaders: (headers, api) => {
      const state = api.getState() as TypeRootState
      if (state.auth.isAuth) {
        const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
        headers.set("Authorization", authorisation)
      }
      return headers
    }}
  ),
  tagTypes: ['Get', 'GetDevice'],
  endpoints: (builder) => {
    return {
      getDevices: builder.query<IDevices, IGetDevicesParams>({
        query: (queryParams: IGetDevicesParams) => ({
          url: `/getAll?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getDevicesOnUser: builder.query<IDevices, string>({
        query: () => ({
          url: `/devices_on_me`,
        }),
        providesTags: ['Get'],
      }),
      getDevice: builder.query<IDevice, string>({
        query: (id: string) => ({
          url: `/get/${id}`,
        }),
        providesTags: ['GetDevice'],
      }),
      createDevice: builder.mutation<any, ICreateDevice>({
        query: (body: ICreateDevice) => ({
          url: "/create/",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      updateDevice: builder.mutation<any, ICreateDevice>({
        query: ({id, ...body}: ICreateDevice) => ({
          url: `/update/${id}`,
          method: "PUT",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      deleteDevice: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `/remove/${id}`,
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
  useGetDevicesQuery,
  useLazyGetDevicesOnUserQuery,
  useGetDeviceQuery,
  useLazyGetDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation
} = deviceApi;
