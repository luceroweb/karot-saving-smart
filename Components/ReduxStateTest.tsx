import { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType, AccountType, ExpenseType } from "../Utils/types";
import { setUserData } from "../Utils/userDataSlice";
import { addAccount } from "../Utils/accountSlice";
import { addExpense } from "../Utils/expenseSlice";
import { recalculateBudget } from "../Utils/remainingBudgetSlice";

const ReduxStateTest: FC = () => {
  const userData = useSelector(
    (state: GlobalStateType) => state.userData.userData
  );
  const accounts = useSelector(
    (state: GlobalStateType) => state.accounts.accounts
  );
  const expenses = useSelector(
    (state: GlobalStateType) => state.expenses.expenses
  );
  const remainingBudget = useSelector(
    (state: GlobalStateType) => state.remainingBudget.remainingBudget
  );
  const dispatch = useDispatch();

  console.log(userData, accounts, expenses, remainingBudget);

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
    };
    dispatch(addAccount(newAccount));

    let allAccountsBalance = newAccount.saved;
    accounts.map((item: AccountType) => (allAccountsBalance += item.saved));
    dispatch(
      recalculateBudget({
        accountsTotal: allAccountsBalance,
        expensesTotal: remainingBudget.expensesTotal,
      })
    );
  };

  const runAddExpense = () => {
    const newExpense = {
      label: "gas",
      saved: 80,
      goal: 80,
      date: Date.now(),
    };
    dispatch(addExpense(newExpense));

    let allExpenseTotal = newExpense.saved;
    expenses.map((item: ExpenseType) => (allExpenseTotal += item.saved));
    dispatch(
      recalculateBudget({
        accountsTotal: remainingBudget.accountsTotal,
        expensesTotal: allExpenseTotal,
      })
    );
  };

  return (
    <View>
      <Text>Redux State Test</Text>
      <Text>Balance ${remainingBudget.totalRemaining}</Text>
      <Pressable onPress={runSaveUserData}>
        <Text>Define User</Text>
      </Pressable>
      <Pressable onPress={runAddAccount}>
        <Text>Add Account</Text>
      </Pressable>
      <Pressable onPress={runAddExpense}>
        <Text>Add Expense</Text>
      </Pressable>
    </View>
  );
};

export default ReduxStateTest;
