import { View, StyleSheet, Text } from "react-native";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { useFonts, Sarabun_300Light, Sarabun_600SemiBold } from "@expo-google-fonts/sarabun";

const AccountsDropDown: FC = () => {
  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  let [fontsLoaded] = useFonts({
    Sarabun_300Light,
    Sarabun_600SemiBold
  });

  listOfAccounts && console.log(listOfAccounts);

  const generateList = listOfAccounts.map((account, index) => (
    <View key={index} style={styles.container}>
      <Text style={styles.label}>{account.label}</Text>
      <Text style={styles.saved}>${account.saved.toLocaleString()}</Text>
    </View>
  ));

  return (
    <View>
      {generateList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 12,
  },
  label: {
    fontFamily: "Sarabun_300Light",
    width: 160,
  },
  saved: {
    color: "#05C473",
    fontFamily: "Sarabun_600SemiBold",
    width: 80,
    textAlign: "right",
  },
});

export default AccountsDropDown;
