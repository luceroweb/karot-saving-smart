import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
// cannot deep require import according to
// https://github.com/oblador/react-native-progress#progressbar
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function ExpenseCard(expense: any, index: number) {
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={["#2383C9", "#102745"]}
          style={styles.linearGradient}
        >
          <Text style={styles.expenseLabel}>{expense.expense.label}</Text>
          <Text style={styles.expenseDate}>{new Date(expense.expense.date).toLocaleDateString()}</Text>
          <Text style={styles.expenseAmount}>${expense.expense.saved}</Text>
          <View style={styles.bar}>
            <Progress.Bar
                  progress={expense.expense.saved / expense.expense.goal || 0}
                  unfilledColor="#DBDBDB"
                  borderColor="rgba(0,0,0,0)"
                  borderRadius={5}
                  width={100}
                  height={6}
                  color="#05C473"
                />
          </View>
          <Text style={styles.expenseProgress}>${expense.expense.saved} of ${expense.expense.goal} saved</Text>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    aspectRatio: 1,
    width: width / 2.5 > 180 ? 180 : width / 2.5,
    margin: 5,
  },
  expenseAmount: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 34,
    fontFamily: "Sarabun_700Bold",
    color: "white",
    position: "absolute",
    paddingVertical: 73,
  },
  expenseLabel: {
    fontSize: 20,
    lineHeight: 23,
    fontFamily: "Sarabun_600SemiBold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 19,
    position: "absolute",
    top: 16,
  },
  expenseDate: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: "Sarabun_300Light",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 19,
    position: "absolute",
    top: 40,
  },
  expenseProgress: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Sarabun_300Light",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 19,
    position: "absolute",
    bottom: 16,
  },
  linearGradient: {
    alignItems: "center",
		justifyContent: "center",
		borderRadius: 23,
    width:"100%",
    aspectRatio: 1,
		alignSelf: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 19,
    position: "absolute",
    bottom: 36,
  },
});

