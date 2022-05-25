import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "./types";

interface InitialStateType {
  expenses: ExpenseType[];
}

const initialState: InitialStateType = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
    },
  },
});

export const { addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
