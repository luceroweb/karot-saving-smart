import { View, Text, StyleSheet } from "react-native";

function Overview() {
  return (
    <View style={styles.container}>
      <View style={styles.budgetCardHolder}>
        <Text>Budget Card Goes Here</Text>
      </View>
      <View style={styles.expenseCardHolder}>
        <Text>Expense Card Goes Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
  },
  budgetCardHolder: {
    marginTop: 40,
  },
  expenseCardHolder: {
    marginTop: 40,
  },
});

export default Overview;
