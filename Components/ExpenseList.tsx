import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";
import ExpenseDetailView from "./ExpenseDetailView";
import { setSelectedId } from "../Utils/expenseSlice";

const ExpenseList = () => {
	const dispatch = useDispatch();
	const [showModal, SetShowModal] = useState(false);
	const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
	const generateExpenses = expenses.map((expense, index) => (
		<Pressable
			key={index}
			onPress={() => {
				SetShowModal(!showModal);
				dispatch(setSelectedId(index));
			}}
		>
			<ExpenseCard expense={expense} />
		</Pressable>
	));
	return (
		<>
			{showModal && <ExpenseDetailView SetShowModal={SetShowModal} />}
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{generateExpenses}
			</View>
		</>
	);
};
export default ExpenseList;
