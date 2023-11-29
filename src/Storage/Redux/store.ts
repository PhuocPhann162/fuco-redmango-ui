import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import {
  authApi,
  menuItemApi,
  orderApi,
  paymentApi,
  shoppingCartApi,
} from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./authSlice";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
