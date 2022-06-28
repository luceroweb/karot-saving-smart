import { createSlice } from "@reduxjs/toolkit";
import { ExpenseType } from "./types";

interface InitialStateType {
	list: ExpenseType[];
	selectedId: number;
}

const initialState: InitialStateType = {
	list: [],
	selectedId: -1,
};

export const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		addExpense: (state, action) => {
			state.list = [...state.list, action.payload];
		},
		setSelectedId: (state, action) => {
			state.selectedId = action.payload;
		},
		editExpense: (state, action) => {
      const updateExpense = state.list.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
		  state.list = updateExpense;
		},
	},
});

export const { addExpense, setSelectedId,editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
