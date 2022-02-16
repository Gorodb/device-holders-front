import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {ICreateDevice, IDevice, IDevices, IGetDevicesParams} from "../../types/device.types";
import {headersUtils} from "../../utils/headers.utils";
import {IDeviceHolders} from "../../types/deviceHolders.type";

export const deviceApi = createApi({
  reducerPath: 'api/devices',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    prepareHeaders: headersUtils
  }),
  tagTypes: ['Get', 'GetMy', 'GetDevice'],
  endpoints: (builder) => {
    return {
      getDevices: builder.query<IDevices, IGetDevicesParams>({
        query: (queryParams: IGetDevicesParams) => ({
          url: `/devices/getAll?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getDevicesOnUser: builder.query<IDevices, string>({
        query: () => ({
          url: `/devices/devices_on_me`,
        }),
        providesTags: ['GetMy'],
      }),
      getDevice: builder.query<IDevice, string>({
        query: (id: string) => ({
          url: `/devices/get/${id}`,
        }),
        providesTags: ['GetDevice'],
      }),
      createDevice: builder.mutation<any, ICreateDevice>({
        query: (body: ICreateDevice) => ({
          url: "/devices/create/",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      updateDevice: builder.mutation<any, ICreateDevice>({
        query: ({id, ...body}: ICreateDevice) => ({
          url: `/devices/update/${id}`,
          method: "PUT",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDevice'],
      }),
      deleteDevice: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `/devices/remove/${id}`,
          method: "DELETE",
          crossDomain: true,
          responseType: "json",
        }),
        invalidatesTags: ['Get'],
      }),
      takeDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: "/device/take",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      returnDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: `/device/return`,
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      returnDeviceToPrevious: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: `/device/return_to_previous`,
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        }),
      }),
    }
  }
});

export const {
  useGetDevicesQuery,
  useLazyGetDevicesQuery,
  useLazyGetDevicesOnUserQuery,
  useGetDeviceQuery,
  useLazyGetDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useReturnDeviceMutation,
  useTakeDeviceMutation,
  useReturnDeviceToPreviousMutation
} = deviceApi;
