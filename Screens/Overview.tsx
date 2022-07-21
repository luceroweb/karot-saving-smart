import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import {
  setModalMode,
  setExpenseModalVisibility,
  setModalType,
} from "../Utils/appSlice";
import ExpenseModal from "../Components/ExpenseModal";

function Overview() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.budgetCardHolder}>
          <BudgetCard />
        </View>
        <View style={styles.expenseCardHolder}>
          <ExpenseList />
        </View>
      </ScrollView>
      <View>
        <ExpenseModal />
      </View>
      <TouchableOpacity
        style={styles.plusModal}
        onPress={() => {
          dispatch(setModalType("expense"));
          dispatch(setModalMode("add"));
          dispatch(setExpenseModalVisibility(true));
        }}
      >
        <AntDesign name="pluscircle" size={48} color="#4D62BF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  scrollViewContainer: {
    width: "100%",
    height: "100%",
  },
  budgetCardHolder: {
    marginTop: 30,
    width: "100%",
  },
  expenseCardHolder: {
    marginTop: 20,
    alignSelf: "center",
  },
  plusModal: {
    alignSelf: "flex-end",
    padding: 30,
  },
});

export default Overview;
