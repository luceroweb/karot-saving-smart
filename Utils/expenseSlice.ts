import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "./types";

interface InitialStateType {
  list: ExpenseType[];
}

const initialState: InitialStateType = {
  list: [
    // example expense data
    // may want to change date type Date to String
    // {
    //   label: "Food",
    //   saved: 237.51,
    //   goal: 300,
    //   date: new Date().toLocaleDateString("en-US", {month: "long", year: "numeric"}),
    // },
  ],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
