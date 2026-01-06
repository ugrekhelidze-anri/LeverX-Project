"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/User";
import { ILoginResponse, ISignUpData } from "../../types/Auth";

// Backend response wrapper type
interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// RTK QUERY setup for our endpoints, uses tags for caching
export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Employees"],
  endpoints: (builder) => ({
    // Login Endpoint
    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    // Register endpoint
    signUp: builder.mutation<IApiResponse<IUser>, ISignUpData>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    // Get Every Employee
    getUsers: builder.query<IUser[], void>({
      query: () => "/employees",
      transformResponse: (response: IApiResponse<IUser[]>) =>
        response.data || [],
      providesTags: ["Employees"],
    }),
    // Get Single employee with id
    getSingleUser: builder.query<IUser, string | number>({
      query: (id) => `/employees/${id}`,
      transformResponse: (response: IApiResponse<IUser>) => response.data!, // transform to access instnatly instead of accessing an array
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    // Update Single User Role
    updateUserRole: builder.mutation<
      IApiResponse<IUser>,
      { id: number; role: string }
    >({
      query: ({ id, role }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "Employees",
      ],
    }),
    // Update Single User Every Field
    updateUser: builder.mutation<
      IApiResponse<IUser>,
      { id: number; data: Partial<IUser> }
    >({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "Employees",
      ],
    }),
  }),
});

// export normal and lazy queries because some components dont need it to run right away
export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useLazyGetSingleUserQuery,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
} = usersApiSlice;
