import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7016/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (menuItemId) => ({
        url: `review/getReviews/${menuItemId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getAverageReview: builder.query({
      query: (menuItemId) => ({
        url: `review/getAverage/${menuItemId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetAverageReviewQuery,
  useAddReviewMutation,
} = reviewApi;
export default reviewApi;
