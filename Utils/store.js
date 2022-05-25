import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import expenseReducer from "./expenseSlice";
import remainingBudgetReducer from "./remainingBudgetSlice";
import userDataReducer from "./userDataSlice";

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    expenses: expenseReducer,
    remainingBudget: remainingBudgetReducer,
    userData: userDataReducer,
  },
});
