import { createSlice } from "@reduxjs/toolkit";
import { AppDataType } from "./types";

const initialState: AppDataType = {
	appReady: false,
	modalMode: "add",
	accountModalVisibility: false,
	expenseModalVisibility: false,
	expenseDetailsModalVisiblity: false,
};

export const appSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setAppReady(state, action) { 
			state.appReady = action.payload; 
		  },
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

export const { setAppReady,setModalMode, setAccountModalVisibility,setExpenseModalVisibility, setExpenseDetailsModalVisiblity } = appSlice.actions;

export default appSlice.reducer;




// Action creators are generated for each case reducer function 
