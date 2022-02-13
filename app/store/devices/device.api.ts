import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {ICreateDevice, IDevice, IDevices, IGetDevicesParams} from "../../types/device.types";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";

export const deviceApi = createApi({
  reducerPath: 'api/devices',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/devices`}),
  tagTypes: ['Get', 'GetDevice'],
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
    return {
      getDevices: builder.query<IDevices, IGetDevicesParams>({
        query: (queryParams: IGetDevicesParams) => ({
          url: `?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getDevice: builder.query<IDevice, string>({
        query: (id: string) => ({
          url: `/${id}`,
          headers: {Authorization: authorisation},
        }),
        providesTags: ['GetDevice'],
      }),
      createDevice: builder.mutation<any, ICreateDevice>({
        query: (body: ICreateDevice) => ({
          url: "/",
          method: "POST",
          headers: {Authorization: authorisation},
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      updateDevice: builder.mutation<any, ICreateDevice>({
        query: ({id, ...body}: ICreateDevice) => ({
          url: `/${id}`,
          method: "PUT",
          headers: {Authorization: authorisation},
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      deleteDevice: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `/${id}`,
          method: "DELETE",
          headers: {Authorization: authorisation},
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
  useGetDeviceQuery,
  useLazyGetDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation
} = deviceApi;
