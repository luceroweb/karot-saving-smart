import { FC } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { setUserData } from "../Utils/userDataSlice";
import { addAccount } from "../Utils/accountSlice";
import { addExpense } from "../Utils/expenseSlice";
import { recalculateBudget } from "../Utils/remainingBudgetSlice";
import uuid from "react-native-uuid";

const ReduxStateTest: FC = () => {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  const accounts = useSelector((state: GlobalStateType) => state.accounts.list);
  const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
  const remainingBudget = useSelector(
    (state: GlobalStateType) => state.budgets.remaining
  );
  const dispatch = useDispatch();

  // Uncomment console.log message to debug Redux state updates/changes
  // console.log(userData, accounts, expenses, remainingBudget);

  const runSaveUserData = () => {
    dispatch(
      setUserData({
        firstName: "Juan",
        lastName: "Lucero",
        avatar: "avatar",
        email: "jlucero@alphaworks.tech",
      })
    );
  };

  const runAddAccount = () => {
    const newAccount = {
      label: "Bank",
      saved: 100,
      goal: 150,
      date: Date.now(),
      id: uuid.v4().toString(),
    };
    dispatch(addAccount(newAccount));

    dispatch(
      recalculateBudget({
        expenses: expenses,
        accounts: [...accounts, newAccount],
      })
    );
  };

  const runAddExpense = () => {
    const newExpense = {
      label: "gas",
      saved: 80,
      goal: 80,
      date: Date.now(),
      id: uuid.v4().toString(),
    };
    dispatch(addExpense(newExpense));

    dispatch(
      recalculateBudget({
        accounts: accounts,
        expenses: [...expenses, newExpense],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.row, styles.h1]}>Redux State Test</Text>
      <View style={styles.row}>
        <Text>Total Balance ${remainingBudget.totalRemaining}</Text>
        <Pressable onPress={runAddAccount} style={styles.button}>
          <Text style={styles.buttonText}>Add Account</Text>
        </Pressable>
        <Text>Accounts Total: ${remainingBudget.accountsTotal}</Text>
        <Pressable onPress={runAddExpense} style={styles.button}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </Pressable>
        <Text>Expense Total: ${remainingBudget.expensesTotal}</Text>
      </View>
      <View style={styles.row}>
        <Pressable onPress={runSaveUserData} style={styles.button}>
          <Text style={styles.buttonText}>Define User</Text>
        </Pressable>
        <Text>
          Name: {userData.firstName} {userData.lastName}
        </Text>
        <Text>Avatar URL: {userData.avatar}</Text>
        <Text>Email: ${userData.email}</Text>
      </View>
    </View>
  );
};

export default ReduxStateTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
  },
  h1: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 3,
    padding: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
