import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
// cannot deep require import according to
// https://github.com/oblador/react-native-progress#progressbar
import * as Progress from "react-native-progress";
import AccountsDropDown from "./AccountsDropDown";

export default function BudgetCard() {
  const [budgetDetails, setBudgetDetails] = useState<boolean>(false);
  const moneyRem = useSelector(
    (state: GlobalStateType) => state.budgets.remaining.totalRemaining
  );
  const moneyTotal = useSelector(
    (state: GlobalStateType) => state.budgets.remaining.accountsTotal
  );

  return (
    <View style={styles.container}>
      <View>
        {budgetDetails ? <AccountsDropDown /> : null}
        <Text style={styles.budgetTextTop}>Balance:</Text>
        <Text style={styles.budgetText}>${moneyRem}</Text>
        <Text style={styles.budgetTextBottom}>
          ${moneyRem} left of ${moneyTotal}
        </Text>
        <View style={styles.bar}>
          <Progress.Bar
            progress={moneyRem / moneyTotal || 0}
            unfilledColor="#DBDBDB"
            width={235}
            height={10}
          />
          <MaterialIcons
            style={styles.toggleArrow}
            name={budgetDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="black"
            onPress={() => setBudgetDetails(!budgetDetails)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    minHeight: 180,
  },
  budgetText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Sarabun_700Bold",
  },
  budgetTextTop: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sarabun_400Regular",
  },
  budgetTextBottom: {
    textAlign: "center",
    fontSize: 16,
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
    marginLeft: 46,
  },
});
