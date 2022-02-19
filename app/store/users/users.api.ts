import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from 'search-params';
import {ICurrentUserUpdate, IUser, IUserCreate, IUsers} from "../../types/auth.types";
import {IPaginateParams} from "../../types/pagination.types";
import {headersUtils} from "../../utils/headers.utils";

export interface IGetUsersParams extends IPaginateParams {
  search?: string,
  department?: string,
}

export const usersApi = createApi({
  reducerPath: 'api/usersList',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
    prepareHeaders: headersUtils
  }),
  tagTypes: ['Get', 'GetUser'],
  endpoints: (builder) => {
    return {
      getUsers: builder.query<IUsers, IGetUsersParams>({
        query: (queryParams: IGetUsersParams) => ({
          url: `users/get?${build(queryParams)}`,
        }),
        providesTags: ['Get'],
      }),
      getUser: builder.query<IUser, string>({
        query: (id: string) => ({
          url: `users/get/${id}`,
        }),
        providesTags: ['GetUser'],
      }),
      uploadPhoto: builder.mutation<any, any>({
        query: (file) => {
          const fd = new FormData()
          fd.append('file', file)
          return {
            url: "files/upload",
            method: "POST",
            body: fd,
            crossDomain: true,
            responseType: "json"
          }
        },
      }),
      createUsers: builder.mutation<any, IUserCreate>({
        query: (body: IUserCreate) => ({
          url: "users/create",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetUser'],
      }),
      updateUsers: builder.mutation<any, IUserCreate>({
        query: ({ id, ...body}) => ({
          url: `users/update/${id}`,
          method: "PUT",
          body,
          crossDomain: true,
          responseType: "json"
        }),
        invalidatesTags: ['Get', 'GetUser'],
      }),
      updateCurrent: builder.mutation<any, ICurrentUserUpdate>({
        query: (body: ICurrentUserUpdate) => ({
          url: `users/update_user`,
          method: "PATCH",
          body,
          crossDomain: true,
          responseType: "json"
        }),
      }),
      deleteUsers: builder.mutation<any, string>({
        query: (id: string) => ({
          url: `users/${id}`,
          method: "DELETE",
          crossDomain: true,
          responseType: "json",
        }),
        invalidatesTags: ['Get'],
      })
    }
  }
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useLazyGetUserQuery,
  useUploadPhotoMutation,
  useUpdateUsersMutation,
  useCreateUsersMutation,
  useDeleteUsersMutation,
  useUpdateCurrentMutation,
} = usersApi;
