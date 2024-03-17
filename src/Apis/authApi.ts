import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7016/api/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
        query: (userCredentials) => ({
          url: "auth/login",
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: userCredentials,
        }),
      })
  }),
});

export default authApi;
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
