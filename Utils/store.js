import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import appReducer from "./appSlice";
import expenseReducer from "./expenseSlice";
import remainingBudgetReducer from "./remainingBudgetSlice";
import userDataReducer from "./userDataSlice";

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    expenses: expenseReducer,
    budgets: remainingBudgetReducer,
    user: userDataReducer,
    app: appReducer,
  },
});
