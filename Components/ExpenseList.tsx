import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";
import ExpenseDetailView from "./ExpenseDetailView";
import { setSelectedId } from "../Utils/expenseSlice";
import { setExpenseDetailsModalVisiblity } from "../Utils/appSlice";

interface Props {
	setAmount: React.Dispatch<React.SetStateAction<number>>;
	setLabel: React.Dispatch<React.SetStateAction<string>>;
	expense: ExpenseType;
	setExpense: React.Dispatch<React.SetStateAction<ExpenseType>>;
}
const ExpenseList = ({ setAmount, setLabel, expense, setExpense }: Props) => {
	const dispatch = useDispatch();
	const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
	const appData = useSelector((state: GlobalStateType) => state.app);
	useEffect(() => {
		setAmount(expense ? expense.saved : 0);
		setLabel(expense ? expense.label : "");
	}, [expense]);
	const generateExpenses = expenses.map((expense, index) => (
    <TouchableOpacity
		key={index}
		onPress={() => {
			dispatch(setExpenseDetailsModalVisiblity(true));
			dispatch(setSelectedId(index));
			setExpense(expense);
		}}
    >
		<ExpenseCard expense={expense} />
    </TouchableOpacity>
	));
	return (
    <>
		{appData.expenseDetailsModalVisiblity ? (
			<ExpenseDetailView />
		) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {generateExpenses}
			</View>
		)}
    </>
);
};
export default ExpenseList;
