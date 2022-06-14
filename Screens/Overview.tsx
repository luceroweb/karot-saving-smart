import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ProfileIcon from "../Components/ProfileIcon";
import { AntDesign } from "@expo/vector-icons";
import ExpenseModal from "../Components/ExpenseModal";

function Overview() {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
				<ProfileIcon/>
			</View>
      <ScrollView>
        <View style={styles.budgetCardHolder}>      
          <BudgetCard />
        </View>
        <View style={styles.expenseCardHolder}>
          <ExpenseList />
        </View>
      </ScrollView>
      <View style={styles.plusModal}>
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
    alignSelf: "center"
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
