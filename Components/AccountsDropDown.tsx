import { View, StyleSheet, Text } from "react-native";
import { FC } from "react";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import {
  useFonts,
  Sarabun_300Light,
  Sarabun_600SemiBold,
  Sarabun_700Bold,
} from "@expo-google-fonts/sarabun";
import AddAccountButton from "./AddAccountButton";

const AccountsDropDown: FC = () => {
  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  let [fontsLoaded] = useFonts({
    Sarabun_300Light,
    Sarabun_600SemiBold,
    Sarabun_700Bold,
  });

  const generateList = listOfAccounts.map((account, index) => (
      <View key={index} style={styles.container}>
        <Text style={styles.label}>{account.label}</Text>
        <Text style={styles.saved}>${account.saved.toLocaleString()}</Text>
        <AddAccountButton />
      </View>
  ));

  return (
    <View style={styles.dropDownWrapper}>
      <Text style={styles.heading}>Income</Text>
      <View style={styles.horizontalRule}></View>
      {generateList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  label: {
    fontFamily: "Sarabun_300Light",
    width: 160,
    lineHeight: 24,
  },
  saved: {
    color: "#05C473",
    fontFamily: "Sarabun_600SemiBold",
    width: 80,
    textAlign: "right",
    lineHeight: 24,
  },
  dropDownWrapper: {
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
    fontFamily: "Sarabun_700Bold",
    fontSize: 18,
    lineHeight: 28,
  },
  horizontalRule: {
    height: 1,
    width: 240,
    backgroundColor: "#212121",
  },
});

export default AccountsDropDown;
