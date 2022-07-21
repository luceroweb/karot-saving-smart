import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
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
import { Feather } from "@expo/vector-icons";
import Moment from "moment";
import {
  setModalMode,
  setExpenseModalVisibility,
  setExpenseDetailsModalVisiblity,
  setModalType,
} from "../Utils/appSlice";

export default function ExpenseDetailView() {
  let [fontsLoaded] = useFonts({
    Sarabun_700Bold,
    Sarabun_400Regular,
    Sarabun_300Light,
  });
  const dispatch = useDispatch();
  const selectedId = useSelector(
    (state: GlobalStateType) => state.expenses.selectedId
  );

  const expenses = useSelector((state: GlobalStateType) => state.expenses.list);

  const selectedExpense = expenses.find(
    (expense) => selectedId && expense.id === selectedId.toString()
  );

  console.log({ expenses, selectedExpense });

  const expenseLabel = selectedExpense?.label || "";

  const goalDate = selectedExpense?.date || 0;

  const currentSaving = selectedExpense?.saved || 0;

  const targetAmount = selectedExpense?.goal || 0;

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
    <View style={styles.container}>
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
            dispatch(setModalType("expense"));
          }}
        >
          <Feather
            style={styles.exitIcon}
            name="x-circle"
            size={24}
            color="#FFFFFF"
            onPress={() => {
              dispatch(setSelectedId(undefined));
              dispatch(setExpenseDetailsModalVisiblity(false));
            }}
          />
          <Text style={styles.budgetTextTop}>{expenseLabel}</Text>
          <Text style={styles.budgetText}>
            {Platform.OS === "web"
              ? forMatedDate
              : Moment(dt).format("MMM YYYY")}
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
        </TouchableOpacity>

        <View style={styles.transactionsExpenses}>
          <Text style={styles.RecentTransactions}> Recent Transactions </Text>
        </View>
      </LinearGradient>
    </View>
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
    marginTop: Platform.OS === "web" ? "-35%" : "-30%",
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
