import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseType } from "./types";

interface InitialStateType {
  list: ExpenseType[];
  selectedId: string | undefined;
}

const initialState: InitialStateType = {
  list: [],
  selectedId: undefined,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    setSelectedId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedId = action.payload;
    },
    editExpense: (state, action) => {
      const updateExpense = state.list.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      state.list = updateExpense;
    },
    deleteExpense: (state, action: PayloadAction<ExpenseType>) => {
      const filteredExpense = state.list.filter(
        (expense) => expense.id !== action.payload.id
      );
      state.list = filteredExpense;
    },
  },
});

export const { addExpense, setSelectedId, editExpense, deleteExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;

