import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import {
  authApi,
  menuItemApi,
  orderApi,
  paymentApi,
  shoppingCartApi,
  userApi,
} from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./authSlice";
import couponApi from "../../Apis/couponApi";
import reviewApi from "../../Apis/reviewApi";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware)
      .concat(couponApi.middleware)
      .concat(userApi.middleware)
      .concat(reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
