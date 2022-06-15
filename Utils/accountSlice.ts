import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
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
      // console.log(action.payload);
      state.list = action.payload;
    },
  },
});

export const { addAccount, editAccount } = accountSlice.actions;

export default accountSlice.reducer;
