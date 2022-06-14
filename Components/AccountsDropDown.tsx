import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";

import { AccountType, GlobalStateType } from "../Utils/types";
import AccountModal from "./AccountModal";

const AccountsDropDown: FC = () => {
  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  const [isVisible, setIsVisible] = useState(false);
  const [account, setAccount] = useState<AccountType | undefined>();
  const [mode, setMode] = useState<"edit" | "add">("edit");

  const generateList = listOfAccounts.map((account) => (
    <TouchableOpacity
      key={account.id}
      style={styles.container}
      onPress={() => {
        setMode("edit");
        setAccount(account);
        setIsVisible(true);
      }}
    >
      <Text style={styles.label}>{account.label}</Text>
      <Text style={styles.saved}>${account.saved.toLocaleString()}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.dropDownWrapper}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Income</Text>
        <TouchableOpacity
          onPress={() => {
            setAccount({
              label: "",
              id: uuid.v4().toString(),
              saved: 0,
              goal: 0,
              date: Date.now(),
            });
            setMode("add");
            setIsVisible(true);
          }}
        >
          <Text>Add entry</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule}></View>
      {generateList}
      {account && (
        <AccountModal
          account={account}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          mode={mode}
          setAccount={setAccount}
        />
      )}
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
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AccountsDropDown;
