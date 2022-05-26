import { View, StyleSheet, Text } from "react-native";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";

const AccountsDropDown: FC = () => {
  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  listOfAccounts && console.log(listOfAccounts);

  const generateList = listOfAccounts.map((account, index) => (
    <View key={index} style={styles.container}>
      <Text style={styles.label}>{account.label}</Text>
      <Text style={styles.saved}>${account.saved}</Text>
    </View>
  ));

  return (
    <View>
      <Text>AccountsDropDown</Text>
      {generateList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  label: {
    marginRight: 50,
  },
  saved: {
    color: "green",
  },
});

export default AccountsDropDown;
