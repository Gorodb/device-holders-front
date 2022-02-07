import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {IUser, IUsers} from "../../types/auth.types";
import {IPaginateParams} from "../../types/pagination.types";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";

export interface IGetUsersParams extends IPaginateParams {
  search?: string,
  department?: string,
}

export const usersApi = createApi({
  reducerPath: 'api/usersList',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`}),
  tagTypes: ['Get'],
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
    return {
      getUsers: builder.query<IUsers, IGetUsersParams>({
        query: (queryParams: IGetUsersParams) => ({
          url: `get?${build(queryParams)}`,
          headers: { Authorization: authorisation },
        }),
        providesTags: ['Get'],
      }),
      createUsers: builder.mutation<any, IUser>({
        query: (body: IUser) => ({
          url: "post",
          method: "POST",
          headers: { Authorization: authorisation },
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get'],
      }),
      deleteUsers: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `/${id}`,
          method: "DELETE",
          headers: { Authorization: authorisation },
          crossDomain: true,
          responseType: "json",
        }),
        invalidatesTags: ['Get'],
      })
    }
  }
});

export const {useGetUsersQuery, useCreateUsersMutation, useDeleteUsersMutation} = usersApi;
