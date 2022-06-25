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
		  state.list = action.payload;
		},
	},
});

export const { addExpense, setSelectedId,editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
