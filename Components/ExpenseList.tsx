import { View } from "react-native";
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
      <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
      {generateExpenses}
      </View>
      </>
  )
}
export default ExpenseList