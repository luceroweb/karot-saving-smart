import { View, StyleSheet, ScrollView } from "react-native";
import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import { useSelector } from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import ProfileIcon from "../Components/ProfileIcon";
import ExpenseModal from "../Components/ExpenseModal";
import { useState } from "react";

function Overview() {
  const blankExpense: ExpenseType = {
		label: "",
		saved: 0,
		goal: 0,
		date: Date.now(),
	  };
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  const [unselectedExpenses, setUnselectedExpenses] = useState<ExpenseType[] | undefined>();
  const [expenseMode, setExpenseMode] = useState<string>("add");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);  
	const [expense,setExpense]=useState<ExpenseType>(blankExpense)
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
				<ProfileIcon/>
			</View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.budgetCardHolder}>      
          <BudgetCard />
        </View>
        <View style={styles.expenseCardHolder}>
          <ExpenseList  
          setModalVisible={setModalVisible}
          setExpenseMode={setExpenseMode} 
          setUnselectedExpenses={setUnselectedExpenses}
          setAmount={setAmount}
          setLabel={setLabel}
          expense={expense}
          setExpense={setExpense}/>
        </View>
      </ScrollView>
      <View style={styles.plusModal}>
        <ExpenseModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        expenseMode={expenseMode} 
        setExpenseMode={setExpenseMode} 
        unselectedExpenses={unselectedExpenses}
        amount={amount}
        setAmount={setAmount}
        label={label}
        setLabel={setLabel}
        expense={expense}/>
      </View>
    </View>
  );		
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  scrollViewContainer: {
    width: "100%",
  },
  budgetCardHolder: {
    marginTop: 30,
    width: "100%",
  },
  expenseCardHolder: {
    marginTop: 20,
    alignSelf: "center",
  },
  icon:{
    alignSelf:"flex-end",
    marginRight:"2%",
    marginTop:"2%",
  },
  plusModal: {
    alignSelf: "flex-end",
    padding: 30
  }
});

export default Overview;
