import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";

// const mockStore = configureStore({
//   reducer: {
//     menuItemStore: menuItemReducer,
//     shoppingCartStore: shoppingCartReducer,
//     userAuthStore: userAuthReducer,
//     [menuItemApi.reducerPath]: menuItemApi.reducer,
//     [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [paymentApi.reducerPath]: paymentApi.reducer,
//     [orderApi.reducerPath]: orderApi.reducer,
//     [couponApi.reducerPath]: couponApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//     [reviewApi.reducerPath]: reviewApi.reducer,
//     [statisticApi.reducerPath]: statisticApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(menuItemApi.middleware)
//       .concat(shoppingCartApi.middleware)
//       .concat(authApi.middleware)
//       .concat(paymentApi.middleware)
//       .concat(orderApi.middleware)
//       .concat(couponApi.middleware)
//       .concat(userApi.middleware)
//       .concat(reviewApi.middleware)
//       .concat(statisticApi.middleware),
// });

const mockStore = configureStore({
  reducer: {
    test: (state = {}, action) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      (store) => (next) => (action) => next(action)
    ),
});

export type MockRootState = ReturnType<typeof mockStore.getState>;
export default mockStore;
