import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  useFonts,
  Sarabun_300Light,
  Sarabun_600SemiBold,
  Sarabun_700Bold,
} from "@expo-google-fonts/sarabun";
import AddAccountButton from "./AddAccountButton";
import { AccountType, GlobalStateType } from "../Utils/types";
import AccountModal from "./AccountModal";

const AccountsDropDown: FC = () => {
  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountType | undefined>();
  const [unselectedAccounts, setUnselectedAccounts] = useState<any>();

  const generateList = listOfAccounts.map((account, index, listOfAccounts) => (
    <TouchableOpacity
      key={index}
      style={styles.container}
      onPress={() => {
        const filteredArray: AccountType[] = listOfAccounts.filter((item, i) => i !== index) || [];
        setIsVisible(true);
        setAccount(account);
        setUnselectedAccounts(filteredArray);
      }}
    >
      <Text style={styles.label}>{account.label}</Text>
      <Text style={styles.saved}>${account.saved.toLocaleString()}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.dropDownWrapper}>
      <Text style={styles.heading}>Income</Text>
      <View style={styles.horizontalRule}></View>
      {generateList}
      {/* {account && ( */}
        <AccountModal
          account={account?account:{label:"",saved:0,goal:0,date:Date.now()}}
          unselectedAccounts={unselectedAccounts}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          mode='add'
        />
      {/* )} */}
      <AddAccountButton 
          setIsVisible={setIsVisible}/>
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
