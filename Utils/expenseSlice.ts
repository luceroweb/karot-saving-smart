import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "./types";

interface InitialStateType {
  list: ExpenseType[];
}

const initialState: InitialStateType = {
  list: [],
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
