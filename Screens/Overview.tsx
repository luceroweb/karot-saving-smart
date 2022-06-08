import { View, StyleSheet, Platform} from "react-native";
import ExpenseCard from "../Components/ExpenseCard";
import BudgetCard from "../Components/BudgetCard";
import ExpenseModal from "../Components/ExpenseModal";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ProfileIcon from "../Components/ProfileIcon";
function Overview() {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
				<ProfileIcon/>
			</View>
      <View style={styles.budgetCardHolder}>      
        <BudgetCard />
      </View>
      <View style={styles.expenseCardHolder}>
        <ExpenseCard />
      </View>
      <View style={[styles.plusModal, {paddingTop: Platform.OS === "web" ?  550 : 30}, {paddingRight: Platform.OS === "web" ? 100 : 30}]}>
        <ExpenseModal />
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
  budgetCardHolder: {
    marginTop: 30,
    width: "100%",
  },
  expenseCardHolder: {
    marginTop: 20,
  },
  icon:{
    alignSelf:"flex-start",
    marginLeft:"2%",
    marginTop:"2%",
  },
  plusModal: {
    alignSelf: "flex-end",
    padding: 30
  }
});

export default Overview;
