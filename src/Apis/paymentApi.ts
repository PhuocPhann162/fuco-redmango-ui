import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapifuco.azurewebsites.net/api/",
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: `stripePayment`,
        method: "POST",
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export default paymentApi;
export const { useInitiatePaymentMutation } = paymentApi;
