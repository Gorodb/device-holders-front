import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {ICreateDevice, IDevice, IDevices, IGetDevicesParams} from "../../types/device.types";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";
import {IDeviceHolders} from "../../types/deviceHolders.type";

export const deviceHoldersApi = createApi({
  reducerPath: 'api/deviceHolders',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/device`}),
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
    return {
      takeDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: "/take",
          method: "POST",
          headers: {Authorization: authorisation},
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      returnDevice: builder.mutation<any, IDeviceHolders>({
        query: (body: IDeviceHolders) => ({
          url: `/return`,
          method: "POST",
          headers: {Authorization: authorisation},
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
          headers: {Authorization: authorisation},
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
