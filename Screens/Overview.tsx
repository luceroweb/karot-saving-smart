import { View, StyleSheet,TouchableOpacity, Image, Platform} from "react-native";
import ExpenseCard from "../Components/ExpenseCard";
import BudgetCard from "../Components/BudgetCard";
import ExpenseModal from "../Components/ExpenseModal";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";

function Overview() {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  return (
    <View style={styles.container}>    
      <TouchableOpacity style={styles.icon}>
        <Image 
          source={{ uri: userData.avatar }} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    alignSelf:"center"
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
