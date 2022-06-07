import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { useFonts, Sarabun_700Bold } from "@expo-google-fonts/sarabun";
import {
  Raleway_400Regular,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";

export default function ExpenseCard() {
  let [fontsLoaded] = useFonts({
    Sarabun_700Bold,
    Raleway_400Regular,
    Raleway_600SemiBold,
  });
  const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
  const generateExpenses = expenses.map((expense, index) => (
    <View style={styles.container} key={index}>
      <Text style={styles.expenseAmount}>${expense.saved}</Text>
      <Text style={styles.expenseLabel}>{expense.label}</Text>
      <Text style={styles.expenseDate}>
        {new Date(expense.date).toLocaleDateString()}
      </Text>
    </View>
  ));

  return <>{generateExpenses}</>;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 23,
    aspectRatio: 1,
    margin: 15,
    height: 180,
  },
  expenseAmount: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "bold",
    fontFamily: "Sarabun_700Bold",
    position: "absolute",
    top: 52,
  },
  expenseLabel: {
    fontSize: 20,
    lineHeight: 23,
    fontFamily: "Raleway_600SemiBold",
    alignSelf: "flex-start",
    marginLeft: 22,
    position: "absolute",
    bottom: 37,
  },
  expenseDate: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: "Raleway_400Regular",
    alignSelf: "flex-start",
    marginLeft: 22,
    position: "absolute",
    bottom: 17,
  },
});
