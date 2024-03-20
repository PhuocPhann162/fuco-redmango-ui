import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7016/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "User",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    lockUnLockUser: builder.mutation({
      query: (id) => ({
        url: `User/lockUnlock`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Users"],
    }),
    roleManagement: builder.mutation({
      query: ({ userId, role }) => ({
        url: `User/updateRole/${userId}`,
        method: "POST",
        body: role,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export default userApi;
export const {
  useGetAllUsersQuery,
  useLockUnLockUserMutation,
  useRoleManagementMutation,
} = userApi;
