import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "./types";

interface InitialStateType {
  list: AccountType[];
}

const initialState: InitialStateType = {
  list: []
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    editAccount: (state, action) => {
      state.list = action.payload;
    },
    deleteAccount: (state, action) => {
      const filteredAccounts = state.list.filter(
        (account) => account.id !== action.payload
      );
      state.list = filteredAccounts;
    }
  },
});

export const { addAccount, editAccount, deleteAccount } = accountSlice.actions;

export default accountSlice.reducer;
