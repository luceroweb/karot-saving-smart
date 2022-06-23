
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";
import ExpenseDetailView from "./ExpenseDetailView";
import { setSelectedId } from "../Utils/expenseSlice";
import { setExpenseDetailsModalVisiblity } from "../Utils/appSlice";

interface Props {
	setUnselectedExpenses:React.Dispatch<React.SetStateAction<ExpenseType[] | undefined>>;
	setAmount:React.Dispatch<React.SetStateAction<number>>;
	setLabel:React.Dispatch<React.SetStateAction<string>>;
	expense:ExpenseType;
	setExpense:React.Dispatch<React.SetStateAction<ExpenseType>>
}
const ExpenseList = ({setUnselectedExpenses,setAmount,setLabel,expense,setExpense}:Props) => {
	const dispatch = useDispatch();
	const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
	const appData = useSelector((state: GlobalStateType) => state.app);
	useEffect(() => {
		setAmount(expense ? expense.saved : 0);
		setLabel(expense ? expense.label : "");
	}, [expense]);
	const generateExpenses = expenses.map((expense, index,listOfExpenses) => (
		<TouchableOpacity
			key={index}
			onPress={() => {
				const filteredExpenses:ExpenseType[] =
					listOfExpenses.filter((expense,i)=> i !== index) || []
				
				dispatch(setExpenseDetailsModalVisiblity(true));
				dispatch(setSelectedId(index));
				setUnselectedExpenses(filteredExpenses);
				setExpense(expense)
			}}
		>
			<ExpenseCard expense={expense} />
		</TouchableOpacity>
	));
	return (
		<>
			{ appData.expenseDetailsModalVisiblity ? (
					<ExpenseDetailView />
			) : (
			
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{generateExpenses}
			</View>
			)}
		
		</>
	);
};
export default ExpenseList;
