import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IDepartment, IDepartments} from "../../types/departments.types";
import {headersUtils} from "../../utils/headers.utils";

export interface IGetDepartmentsParams {
  limit: number;
  page: number;
}

export const departmentsApi = createApi({
  reducerPath: 'api/departments',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
    prepareHeaders: headersUtils
  }),
  tagTypes: ['Get', 'GetDepartments'],
  endpoints: (builder) => {
    return {
      getDepartments: builder.query<IDepartments, IGetDepartmentsParams>({
        query: (queryParams: IGetDepartmentsParams) => ({
          url: `departments?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getDepartment: builder.query<IDepartment, string>({
        query: (id: string) => ({
          url: `departments/${id}`,
        }),
        providesTags: ['GetDepartments'],
      }),
      createDepartment: builder.mutation<any, IDepartment>({
        query: (body: IDepartment) => ({
          url: "departments",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDepartments'],
      }),
      updateDepartment: builder.mutation<any, IDepartment>({
        query: ({ id, ...body}: IDepartment) => ({
          url: `departments/${id}`,
          method: "PUT",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetDepartments'],
      }),
      deleteDepartment: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `departments/${id}`,
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
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useLazyGetDepartmentQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentsApi;
