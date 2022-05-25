import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts = [...state.accounts, action.payload];
    },
  },
});

export const { addAccount } = accountSlice.actions;

export default accountSlice.reducer;
