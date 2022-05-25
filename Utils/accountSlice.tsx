import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "./types";

interface InitialStateType {
  accounts: AccountType[];
}

const initialState: InitialStateType = {
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
