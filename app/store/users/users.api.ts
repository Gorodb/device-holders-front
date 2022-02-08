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
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`}),
  tagTypes: ['Get'],
  endpoints: (builder) => {
    const authorisation = 'Bearer ' + Cookies.get(CookiesEnum.authorisation)
    return {
      getUsers: builder.query<IUsers, IGetUsersParams>({
        query: (queryParams: IGetUsersParams) => ({
          url: `users/get?${build(queryParams)}`,
          headers: { Authorization: authorisation },
        }),
        providesTags: ['Get'],
      }),
      getUser: builder.query<IUser, string>({
        query: (id: string) => ({
          url: `users/get/${id}`,
          headers: { Authorization: authorisation },
        }),
      }),
      uploadPhoto: builder.mutation<any, any>({
        query: (body) => {
          return {
            url: "files/upload",
            method: "POST",
            headers: {
              // 'Content-Type': 'multipart/form-data',
              // 'Accept': 'application/json',
              "Authorization": authorisation,
            },
            body,
            crossDomain: true,
            responseType: "json"
          }
        },
      }),
      createUsers: builder.mutation<any, IUser>({
        query: (body: IUser) => ({
          url: "users/post",
          method: "POST",
          headers: { Authorization: authorisation },
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get'],
      }),
      updateUsers: builder.mutation<any, IUser>({
        query: ({ id, ...body}) => ({
          url: `users/put/${id}`,
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
          url: `users/${id}`,
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

export const {useGetUsersQuery, useGetUserQuery, useUploadPhotoMutation, useUpdateUsersMutation, useCreateUsersMutation, useDeleteUsersMutation} = usersApi;
