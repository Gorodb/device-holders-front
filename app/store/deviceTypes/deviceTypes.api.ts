import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IDeviceType, IDeviceTypes, IGetDeviceTypesParams} from "../../types/deviceTypes.types";
import {headersUtils} from "../../utils/headers.utils";

export const deviceTypesApi = createApi({
  reducerPath: 'api/deviceTypes',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/device_types`,
    prepareHeaders: headersUtils
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
