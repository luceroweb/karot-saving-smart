import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExpenseCard(expense: any, index: number) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.expenseAmount}>${expense.expense.saved}</Text>
        <Text style={styles.expenseLabel}>{expense.expense.label}</Text>
        <Text style={styles.expenseDate}>{new Date(expense.expense.date).toLocaleDateString()}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "Sarabun_700Bold",
    position: "absolute",
    top: 52,
  },
  expenseLabel: {
    fontSize: 20,
    lineHeight: 23,
    fontFamily: "Sarabun_600SemiBold",
    alignSelf: "flex-start",
    marginLeft: 22,
    position: "absolute",
    bottom: 37,
  },
  expenseDate: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: "Sarabun_300Light",
    alignSelf: "flex-start",
    marginLeft: 22,
    position: "absolute",
    bottom: 17,
  },
});
