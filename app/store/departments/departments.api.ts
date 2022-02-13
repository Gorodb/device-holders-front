import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IDepartment, IDepartments} from "../../types/departments.types";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";

export interface IGetDepartmentsParams {
  limit: number;
  page: number;
}

export const departmentsApi = createApi({
  reducerPath: 'api/departments',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`}),
  tagTypes: ['Get', 'GetDepartments'],
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
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
          headers: { Authorization: authorisation },
        }),
        providesTags: ['GetDepartments'],
      }),
      createDepartment: builder.mutation<any, IDepartment>({
        query: (body: IDepartment) => ({
          url: "departments",
          method: "POST",
          headers: { Authorization: authorisation },
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
          headers: { Authorization: authorisation },
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
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useLazyGetDepartmentQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentsApi;
