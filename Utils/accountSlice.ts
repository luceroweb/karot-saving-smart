import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "./types";

interface InitialStateType {
  list: AccountType[];
}

const initialState: InitialStateType = {
  list: [
    { label: "Wells Fargo", saved: 500, goal: 1000, date: Date.now() },
    {
      label: "Bank of America",
      saved: 15000000000,
      goal: 1000,
      date: Date.now(),
    },
    {
      label: "A Coffee can buried in my back yard behind the fig tree",
      saved: 1500,
      goal: 1000,
      date: Date.now(),
    },
  ],
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
