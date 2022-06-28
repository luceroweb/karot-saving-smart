import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import { setModalMode, setExpenseModalVisibility } from "../Utils/appSlice";
import ExpenseModal from "../Components/ExpenseModal";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
function Overview() {
  const blankExpense: ExpenseType = {
    label: "",
    saved: 0,
    goal: 0,
    date: Date.now(),
    id: uuid.v4().toString(),
  };
  const dispatch = useDispatch();

  const userData = useSelector((state: GlobalStateType) => state.user.data);
  const [label, setLabel] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [expense, setExpense] = useState<ExpenseType>(blankExpense);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.budgetCardHolder}>
          <BudgetCard />
        </View>
        <View style={styles.expenseCardHolder}>
          <ExpenseList
            setAmount={setAmount}
            setLabel={setLabel}
            expense={expense}
            setExpense={setExpense}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setExpenseModalVisibility(true));
            dispatch(setModalMode("add"));
          }}
        >
          <AntDesign name="pluscircle" size={48} color="#4D62BF" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.plusModal}>
        <ExpenseModal
          amount={amount}
          setAmount={setAmount}
          label={label}
          setLabel={setLabel}
          expense={expense}
        />
      </View>
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
