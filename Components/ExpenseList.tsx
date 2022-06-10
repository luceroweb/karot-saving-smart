import { View, StyleSheet } from "react-native";
import { useSelector} from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = () => {
    const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
    const generateExpenses = expenses.map((expense, index) => (
        <ExpenseCard expense={expense} key={index}/>
        
    ))
  return (
      <>
      <View style={styles.container}>
      {generateExpenses}
      </View>
      </>
  )
}
export default ExpenseList

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        flexWrap: "wrap",
        justifyContent: "center",
    },   
  });
  