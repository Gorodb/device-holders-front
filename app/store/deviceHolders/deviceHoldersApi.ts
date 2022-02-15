import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IDeviceHolders} from "../../types/deviceHolders.type";
import {headersUtils} from "../../utils/headers.utils";

export const deviceHoldersApi = createApi({
  reducerPath: 'api/deviceHolders',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/device`,
    prepareHeaders: headersUtils
  }),
  endpoints: (builder) => {
    return {
      takeDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: "/take",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      returnDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: `/return`,
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      returnDeviceToPrevious: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: `/return_to_previous`,
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
  useReturnDeviceMutation,
  useTakeDeviceMutation,
  useReturnDeviceToPreviousMutation
} = deviceHoldersApi;
