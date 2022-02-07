import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IDepartments} from "../../types/departments.types";

export interface IGetDepartmentsParams {
  limit: number;
  page: number;
}

export const departmentsApi = createApi({
  reducerPath: 'api/departments',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`}),
  endpoints: (builder) => {
    return {
      getDepartments: builder.query<IDepartments, IGetDepartmentsParams>({
        query: (queryParams: IGetDepartmentsParams) => ({
          url: `departments?${build(queryParams)}`,
        })
      }),
    }
  }
});

export const {useGetDepartmentsQuery} = departmentsApi;
