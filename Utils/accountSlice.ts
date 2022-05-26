import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "./types";

interface InitialStateType {
  list: AccountType[];
}

const initialState: InitialStateType = {
  list: [{ label: "Wells Fargo", saved: 500, goal: 1000, date: Date.now() }, { label: "Wells Fargo", saved: 500, goal: 1000, date: Date.now() }],
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { addAccount } = accountSlice.actions;

export default accountSlice.reducer;
