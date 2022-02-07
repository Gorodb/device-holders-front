import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IDevices} from "../../types/device.types";

export interface IGetDevicesParams {
  limit: number;
  page: number;
  department?: string
}

export const deviceApi = createApi({
  reducerPath: 'api/devices',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`}),
  endpoints: (builder) => {
    return {
      getDevices: builder.query<IDevices, IGetDevicesParams>({
        query: (queryParams: IGetDevicesParams) => ({
          url: `devices?${build(queryParams)}`,
        })
      }),
      createDevice: builder.mutation<any, IDevices>({
        query: (body: IDevices) => ({
          url: "devices",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        })
      })
    }
  }
});

export const {useGetDevicesQuery, useCreateDeviceMutation} = deviceApi;
