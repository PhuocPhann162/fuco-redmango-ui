import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7016/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Coupons"],
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => ({
        url: "Coupon",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    getCouponById: builder.query({
      query: (id) => ({
        url: `Coupon/${id}`,
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    getCouponByCode: builder.query({
      query: (code) => ({
        url: `Coupon/getByCode/${code}`,
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "Coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: "Coupon",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `Coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useGetCouponByCodeQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
export default couponApi;
