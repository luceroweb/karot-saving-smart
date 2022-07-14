import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { setSelectedId } from "../Utils/expenseSlice";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import { Feather } from "@expo/vector-icons";
import {
  setModalMode,
  setExpenseModalVisibility,
  setExpenseDetailsModalVisiblity,
} from "../Utils/appSlice";

const { width } = Dimensions.get("window");

export default function ExpenseDetailView() {
  const dispatch = useDispatch();

  const expenses = useSelector((state: GlobalStateType) => state.expenses);

  const expense = expenses.list[expenses.selectedId];

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1.6, y: 1 }}
      colors={["#2383C9", "#102745"]}
      style={styles.linearGradient}
    >
      <TouchableOpacity
        onPress={() => {
          dispatch(setExpenseModalVisibility(true));
          dispatch(setModalMode("edit"));
        }}
        style={styles.expenseContainer}
      >
        <Feather
          style={styles.exitIcon}
          name="x-circle"
          size={24}
          color="#FFFFFF"
          onPress={() => {
            dispatch(setSelectedId(-1));
            dispatch(setExpenseDetailsModalVisiblity(false));
          }}
        />
        <Text style={styles.budgetTextTop}>{expense.label}</Text>
        <Text style={styles.budgetText}>
          {new Date(expense.date).toLocaleDateString()}
        </Text>
        <View style={styles.modal}>
          <Text style={styles.savingText}>${expense.saved}</Text>
          <Text style={styles.budgetTextBottom}>
            ${expense.saved} of ${expense.goal}
          </Text>
          <View style={styles.bar}>
            <Progress.Bar
              progress={expense.saved / expense.goal || 0}
              color="#05C473"
              unfilledColor="#DBDBDB"
              borderColor="#DBDBDB"
              width={width * 0.7 > 285 ? 285 : width * 0.7}
              height={10}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.transactionsExpenses}>
        <Text style={styles.RecentTransactions}>Recent Transactions</Text>
        <Text style={{ textAlign: "center", padding: 10 }}>none</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 23,
    alignSelf: "center",
    width: width - 30 > 380 ? 380 : width - 30,
    marginTop: Platform.OS === "web" ? "-35%" : "-30%",
  },
  expenseContainer: {
    padding: 10,
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
    fontSize: 14,
    fontFamily: "Sarabun_300Light",
    padding: 10,
    paddingBottom: 0,
  },
  toggleArrow: {
    marginLeft: 22,
  },
  bar: {
    alignItems: "center",
  },
  exitIcon: {
    paddingRight: 10,
    paddingTop: 10,
    alignSelf: "flex-end",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    margin: 20,
    padding: 20,
  },
  transactionsExpenses: {
    backgroundColor: "#ffffff",
    borderRadius: 23,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  RecentTransactions: {
    textAlign: "center",
    padding: 10,
    fontSize: 17,
    fontFamily: "Sarabun_400Regular",
    color: "#000000",
    backgroundColor: "#EEEEEE",
    borderRadius: 23,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
