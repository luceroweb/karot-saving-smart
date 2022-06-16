import { View, StyleSheet, ScrollView } from "react-native";
import { FC } from "react";
import ExpenseList from "../Components/ExpenseList";
import BudgetCard from "../Components/BudgetCard";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import ProfileIcon from "../Components/ProfileIcon";
import ExpenseModal from "../Components/ExpenseModal";

import type { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { RootStackParamList } from "../Utils/types";

type Props = NativeStackScreenProps<RootStackParamList, "Overview">

const Overview: FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
				<ProfileIcon
          navigation={navigation}/>
			</View>
      <ScrollView style={styles.scrollViewContainer}>
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
