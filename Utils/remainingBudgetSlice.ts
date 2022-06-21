import { createSlice } from "@reduxjs/toolkit";
import { RemainingBudgetType, AccountType, ExpenseType } from "./types";

interface InitialStateType {
  remaining: RemainingBudgetType;
}

const initialState: InitialStateType = {
  remaining: {
    accountsTotal: 0,
    expensesTotal: 0,
    totalRemaining: 0,
  },
};

export const budgetSlice = createSlice({
  name: "remainingBudget",
  initialState,
  reducers: {
    recalculateBudget: (
      state,
      action: { payload: { accounts: AccountType[]; expenses: ExpenseType[] } }
    ) => {
      let accountsTotal = 0;
      action.payload.accounts.map(
        (item: AccountType) => (accountsTotal += item.saved)
      );

      let expensesTotal = 0;
      action.payload.expenses.map(
        (item: ExpenseType) => (expensesTotal += item.saved)
      );

      const totalRemaining = accountsTotal - expensesTotal;

      state.remaining = {
        accountsTotal: accountsTotal,
        expensesTotal: expensesTotal,
        totalRemaining: totalRemaining,
      };
    },
  },
});

export const { recalculateBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
