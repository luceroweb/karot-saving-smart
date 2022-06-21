
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";
import ExpenseDetailView from "./ExpenseDetailView";
import { setSelectedId } from "../Utils/expenseSlice";

interface Props {
	setExpenseMode:React.Dispatch<React.SetStateAction<string>>;
	setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
	setUnselectedExpenses:React.Dispatch<React.SetStateAction<ExpenseType[] | undefined>>;
	setAmount:React.Dispatch<React.SetStateAction<number>>;
	setLabel:React.Dispatch<React.SetStateAction<string>>;
	expense:ExpenseType;
	setExpense:React.Dispatch<React.SetStateAction<ExpenseType>>
}
const ExpenseList = ({setExpenseMode,setModalVisible,setUnselectedExpenses,setAmount,setLabel,expense,setExpense}:Props) => {
	const dispatch = useDispatch();
	const [showModal, SetShowModal] = useState<boolean>(false);
	const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
	
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
				SetShowModal(!showModal);
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
			{ showModal ? (
					<ExpenseDetailView 
					SetShowModal={SetShowModal}
					setExpenseMode={setExpenseMode}
					setModalVisible={setModalVisible} />
			) : (
			
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{generateExpenses}
			</View>
			)}
		
		</>
	);
};
export default ExpenseList;
