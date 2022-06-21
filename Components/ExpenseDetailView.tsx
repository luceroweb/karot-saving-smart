import React, { useState } from "react";
import { StyleSheet, Text, View,Platform, TouchableOpacity } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { setSelectedId } from "../Utils/expenseSlice";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Sarabun_700Bold,
  Sarabun_400Regular,
  Sarabun_300Light,
} from "@expo-google-fonts/sarabun";
import * as Progress from "react-native-progress";
import { Feather } from '@expo/vector-icons';
import Moment from "moment"; 

interface Props {
	setExpenseMode:React.Dispatch<React.SetStateAction<string>>;
	SetShowModal:any; 
	setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpenseDetailView({setExpenseMode,SetShowModal,setModalVisible}:Props ) {
	let [fontsLoaded] = useFonts({
		Sarabun_700Bold,
		Sarabun_400Regular,
		Sarabun_300Light,
	});
  const dispatch = useDispatch();
	const selectedId = useSelector(
		(state: GlobalStateType) => state.expenses.selectedId
	);
	const expenseLabel = useSelector(
		(state: GlobalStateType) => state.expenses.list[selectedId].label
	);
	const goalDate = useSelector(
		(state: GlobalStateType) => state.expenses.list[selectedId].date
	);
	const currentSaving = useSelector(
		(state: GlobalStateType) => state.expenses.list[selectedId].saved
	);
	const targetAmount = useSelector(
		(state: GlobalStateType) => state.expenses.list[selectedId].goal
	);
	const moneyTotal = useSelector(
		(state: GlobalStateType) => state.budgets.remaining.accountsTotal
	);
	const milliseconds = goalDate;
	const dateObject = new Date(milliseconds);
	const forMatedDate = dateObject.toLocaleString("en-us", {
		month: "short",
		year: "numeric",
	});
	Moment.locale("en");
	var dt = goalDate;
	return (
		<TouchableOpacity 
		style={styles.container}		
		onPress={()=>{
			setModalVisible(true)
			setExpenseMode("edit")
			SetShowModal(false)}} >
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1.6, y: 1 }}
				colors={["#2383C9", "#102745"]}
				style={styles.linearGradient}
			>
				<Feather
					style={styles.exitIcon}
					name="x-circle"
					size={24}
					color="#FFFFFF"
					onPress={() => {
						dispatch(setSelectedId(-1));
						SetShowModal(false);
					}}
				/>
				<Text style={styles.budgetTextTop}>{expenseLabel}</Text>
				<Text style={styles.budgetText}>
					{Platform.OS === "web" ? forMatedDate : Moment(dt).format("MMM YYYY")}
				</Text>
				<View style={styles.modal}>
					<Text style={styles.savingText}>${currentSaving}</Text>
					<Text style={styles.budgetTextBottom}>
						${currentSaving} of ${targetAmount}
					</Text>
					<View style={styles.bar}>
						<Progress.Bar
							progress={currentSaving / targetAmount || 0}
							color="#05C473"
							unfilledColor="#DBDBDB"
							borderColor="#DBDBDB"
							width={235}
							height={10}
						/>
					</View>
				</View>
				<View style={styles.transactionsExpenses}>
					<Text style={styles.RecentTransactions}> Recent Transactions </Text>
				</View>
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		height: 406,
		width: 380,
		borderRadius: 23,
    alignSelf: "center",
    marginTop:Platform.OS ==="web"?"-35%":"-30%",
	},
	linearGradient: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 23,
		alignSelf: "center",
	},
	budgetText: {
		textAlign: "center",
		fontSize: 17,
		fontFamily: "Sarabun_700Bold",
		color: "#FFFFFF",
	},
	savingText: {
		textAlign: "center",
		fontSize: 40,
		fontFamily: "Sarabun_700Bold",
		color: "#000000",
	},
	budgetTextTop: {
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
		fontFamily: "Sarabun_400Regular",
		color: "#FFFFFF",
	},
	budgetTextBottom: {
		textAlign: "center",
		fontSize: 10,
		fontFamily: "Sarabun_300Light",
		padding: 10,
	},
	toggleArrow: {
		marginLeft: 22,
	},
	bar: {
		flexDirection: "row",
		height: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	exitIcon: {
		paddingRight: 10,
		paddingTop: 10,
		alignSelf: "flex-end",
	},
	modal: {
		backgroundColor: "#FFFFFF",
		borderRadius: 11,
		width: 245,
		height: 155,
		margin: 20,
		padding: 20,
	},
	transactionsExpenses: {
		backgroundColor: "#ffffff",
		borderRadius: 23,
		width: "100%",
	},
	RecentTransactions: {
		textAlign: "center",
		fontSize: 17,
		fontWeight: "bold",
		fontFamily: "Sarabun_400Regular",
		color: "#000000",
		backgroundColor: "#EEEEEE",
		borderRadius: 23,
		width: 380,
		height: 60,
	},
});