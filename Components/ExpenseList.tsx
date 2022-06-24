
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";
import ExpenseDetailView from "./ExpenseDetailView";
import { setSelectedId } from "../Utils/expenseSlice";

const ExpenseList = () => {
	const dispatch = useDispatch();
	const [showModal, SetShowModal] = useState<boolean>(false);
	const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
	const generateExpenses = expenses.map((expense, index) => (
		<TouchableOpacity
			key={index}
			onPress={() => {
				SetShowModal(!showModal);
				dispatch(setSelectedId(index));
			}}
		>
			<ExpenseCard expense={expense} />
		</TouchableOpacity>
	));
	return (
		<>
			{ showModal ? (
					<ExpenseDetailView SetShowModal={SetShowModal} />
			) : (
			
			<View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
				{generateExpenses}
			</View>
			)}
		
		</>
	);
};
export default ExpenseList;
