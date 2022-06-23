import { createSlice } from "@reduxjs/toolkit";
import { AppType } from "./types";

const initialState: AppType = {
	modalMode: "add",
	accountModalVisibility: false,
	expenseModalVisibility: false,
	expenseDetailsModalVisiblity: false,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setModalMode: (state, action) => {
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
	},
});

export const { setModalMode, setAccountModalVisibility,setExpenseModalVisibility, setExpenseDetailsModalVisiblity } = appSlice.actions;

export default appSlice.reducer;
