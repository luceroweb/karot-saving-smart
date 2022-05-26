import { createSlice } from "@reduxjs/toolkit";
import { RemainingBudgetType } from "./types";

interface InitialStateType {
  remainingBudget: RemainingBudgetType;
}

const initialState: InitialStateType = {
  remainingBudget: {
    accountsTotal: 0,
    expensesTotal: 0,
    totalRemaining: 0,
  },
};

export const budgetSlice = createSlice({
  name: "remainingBudget",
  initialState,
  reducers: {
    recalculateBudget: (state, action) => {
      state.remainingBudget = {
        accountsTotal: action.payload.accountsTotal,
        expensesTotal: action.payload.expensesTotal,
        totalRemaining:
          action.payload.accountsTotal - action.payload.expensesTotal,
      };
    },
  },
});

export const { recalculateBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
