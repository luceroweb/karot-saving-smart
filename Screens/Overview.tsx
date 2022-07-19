import { View, StyleSheet, ScrollView } from "react-native";
import { FC, useState } from "react";
import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import { ExpenseType } from "../Utils/types";
import ExpenseModal from "../Components/ExpenseModal";
import AddExpense from "../Components/Expenses/AddExpense";
import uuid from "react-native-uuid";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Utils/types";

type Props = NativeStackScreenProps<RootStackParamList, "Overview">;

const Overview: FC<Props> = () => {
  const blankExpense: ExpenseType = {
    label: "",
    saved: 0,
    goal: 0,
    date: Date.now(),
    id: uuid.v4().toString(),
  };

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
      </ScrollView>
      <View>
        <ExpenseModal
          amount={amount}
          setAmount={setAmount}
          label={label}
          setLabel={setLabel}
          expense={expense}
        />
      </View>
      <AddExpense />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 15,
    paddingTop: 0,
  },
  scrollViewContainer: {
    width: "100%",
    height: "100%",
  },
  budgetCardHolder: {
    width: "100%",
  },
  expenseCardHolder: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default Overview;
