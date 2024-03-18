import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";
import { act } from "react-dom/test-utils";

const initialState: shoppingCartModel = {
  cartItems: [],
  couponCode: "",
  discount: 0,
};

export const shoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.couponCode = action.payload.couponCode;
      state.discount = action.payload.discount;
    },
    applyOrRemoveCoupon: (state, action) => {
      state.couponCode = action.payload.couponCode;
      state.discount = action.payload.discount;
    },
    updateQuantity: (state, action) => {
      // payload - cartitem that needs to be updated, newquantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const {
  setShoppingCart,
  updateQuantity,
  removeFromCart,
  applyOrRemoveCoupon,
} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
