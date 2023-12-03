import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItem: [],
  search: "",
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initialState,
  reducers: {
    setMenuItem: (state, action) => {
      state.menuItem = action.payload;
    },
    setSearchItems: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setMenuItem, setSearchItems } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
