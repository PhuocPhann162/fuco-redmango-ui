import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

export const emptyUserState: userModel = {
  fullName: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  id: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.streetAddress = action.payload.streetAddress;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.postalCode = action.payload.postalCode;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
