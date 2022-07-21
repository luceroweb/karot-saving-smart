import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAccountButton from "./AddAccountButton";
import { GlobalStateType } from "../Utils/types";
import {
  setExpenseModalVisibility,
  setModalMode,
  setModalType,
  setSelectedAccount,
} from "../Utils/appSlice";

const AccountsDropDown: FC = () => {
  const dispatch = useDispatch();

  const listOfAccounts = useSelector(
    (state: GlobalStateType) => state.accounts.list
  );

  const generateList = listOfAccounts.map((account) => (
    <TouchableOpacity
      key={account.id}
      style={styles.container}
      onPress={() => {
        dispatch(setModalMode("edit"));
        dispatch(setModalType("account"));
        dispatch(setSelectedAccount(account));
        dispatch(setExpenseModalVisibility(true));
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

      <AddAccountButton />
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
