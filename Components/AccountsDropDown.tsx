import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import AddAccountButton from "./AddAccountButton";
import { AccountType, GlobalStateType } from "../Utils/types";
import AccountModal from "./AccountModal";

const AccountsDropDown: FC = () => {
  const blankAccount: AccountType = {
    label: "",
    saved: 0,
    goal: 0,
    date: Date.now(),
  };

  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountType>(blankAccount);
  const [mode, setMode] = useState<string>("add");

  const [unselectedAccounts, setUnselectedAccounts] = useState<any>();

  const generateList = listOfAccounts.map((account, index, listOfAccounts) => (
    <TouchableOpacity
      key={index}
      style={styles.container}
      onPress={() => {
        const filteredArray: AccountType[] =
          listOfAccounts.filter((item, i) => i !== index) || [];
        setMode("edit");
        setAccount(account);
        setUnselectedAccounts(filteredArray);
        setIsVisible(true);
      }}
    >
      <Text style={styles.label}>{account.label}</Text>
      <Text style={styles.saved}>${account.saved.toLocaleString()}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.dropDownWrapper}>
      <Text style={styles.heading}>Accounts</Text>
      {generateList}
      <AccountModal
        account={account}
        unselectedAccounts={unselectedAccounts}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        mode={mode}
      />
      <AddAccountButton
        setAccount={setAccount}
        setIsVisible={setIsVisible}
        setMode={setMode}
        blankAccount={blankAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    padding: 15,
  },
  heading: {
    fontFamily: "Sarabun_700Bold",
    fontSize: 18,
    lineHeight: 28,
  },
});

export default AccountsDropDown;
