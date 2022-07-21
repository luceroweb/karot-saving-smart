import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType, AppDataType, ExpenseType } from "./types";

const initialState: AppDataType = {
  appReady: false,
  modalMode: "add",
  accountModalVisibility: false,
  expenseModalVisibility: false,
  expenseDetailsModalVisiblity: false,
  modalType: "expense",
  selectedAccount: undefined,
  selectedExpense: undefined,
};

export const appSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAppReady(state, action) {
      state.appReady = action.payload;
    },
    setModalMode: (state, action: PayloadAction<"add" | "edit">) => {
      state.modalMode = action.payload;
    },
    setAccountModalVisibility: (state, action) => {
      state.accountModalVisibility = action.payload;
    },
    setExpenseModalVisibility: (state, action) => {
      state.expenseModalVisibility = action.payload;
    },
    setExpenseDetailsModalVisiblity: (state, action) => {
      state.expenseDetailsModalVisiblity = action.payload;
    },
    setModalType: (
      state: AppDataType,
      action: PayloadAction<"expense" | "account">
    ) => {
      state.modalType = action.payload;
    },
    setSelectedExpense: (
      state: AppDataType,
      action: PayloadAction<ExpenseType | undefined>
    ) => {
      state.selectedExpense = action.payload;
    },
    setSelectedAccount: (
      state: AppDataType,
      action: PayloadAction<AccountType | undefined>
    ) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {
  setAppReady,
  setModalMode,
  setAccountModalVisibility,
  setExpenseModalVisibility,
  setExpenseDetailsModalVisiblity,
  setModalType,
  setSelectedAccount,
  setSelectedExpense,
} = appSlice.actions;

export default appSlice.reducer;

// Action creators are generated for each case reducer function
