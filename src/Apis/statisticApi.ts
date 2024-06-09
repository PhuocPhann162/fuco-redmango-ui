import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7016/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Statistics"],
  endpoints: (builder) => ({
    getRevenueStatistic: builder.query({
      query: ({ type, year, month, endYear }) => ({
        url: `statistic/revenue`,
        method: "GET",
        params: {
          ...(type && { type }),
          ...(year && { year }),
          ...(endYear && { endYear }),
          ...(month && { month }),
        },
      }),
      providesTags: ["Statistics"],
    }),
    getOrdersStatistic: builder.query({
      query: ({ type, year, month, endYear }) => ({
        url: `statistic/orders`,
        method: "GET",
        params: {
          ...(type && { type }),
          ...(year && { year }),
          ...(endYear && { endYear }),
          ...(month && { month }),
        },
      }),
      providesTags: ["Statistics"],
    }),
  }),
});

export default statisticApi;
export const { useGetRevenueStatisticQuery, useGetOrdersStatisticQuery } =
  statisticApi;
