import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, editAccount } from "../Utils/accountSlice";
import { GlobalStateType, AccountType } from "../Utils/types";
import { recalculateBudget } from "../Utils/remainingBudgetSlice";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

interface Props {
  account: AccountType;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string; 
  setAccount:  React.Dispatch<React.SetStateAction<AccountType>>;
  // setAccount: (account: AccountType)=> void;
}

const AccountModal = memo<Props>(
  ({ account, isVisible, setIsVisible, mode, setAccount }) => {
    mode = mode ? mode : "add";

    const [amount, setAmount] = useState<number>(0);
    const [label, setLabel] = useState<string>("");
    const dispatch = useDispatch();
    const accounts = useSelector(
      (state: GlobalStateType) => state.accounts.list
    );
    const expenses = useSelector(
      (state: GlobalStateType) => state.expenses.list
    );
     const blankAccount: AccountType = {
       label: "",
       saved: 0,
       goal: 0,
       date: Date.now(),
       id: ""
   };
    useEffect(() => {
      setAmount(account ? account.saved : 0);
      setLabel(account ? account.label : "");
    }, [account]);

    const runAddAccount = () => {
      const newAccount = {
        label: label,
        saved: amount,
        goal: 0,
        date: Date.now(),
        id: uuid.v4().toString(),
      };
      dispatch(addAccount(newAccount));
      dispatch(
        recalculateBudget({
          expenses: expenses,
          accounts: [...accounts, newAccount],
        })
      );
      setIsVisible(false);
      setAccount(blankAccount);
    };

    const runEditAccount = () => {
      const accountUpdate = {
        ...account,
        label: label,
        saved: amount,
        goal: account.goal,
        date: account.date,
      };
      
      const updatedAccounts = accounts.map((acc) =>
        acc.id === accountUpdate.id ? accountUpdate : acc
      );
      dispatch(editAccount(updatedAccounts));
      dispatch(recalculateBudget({ accounts: updatedAccounts, expenses }));
      setIsVisible(false);
      setAccount(blankAccount);
    };

    const onChanged = (text: any) => {
      let newText: any = "";
      let numbers = "0123456789.";
      for (let i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
          newText = newText + text[i];
        } else {
          alert("please enter numbers only");
        }
      }
      setAmount(Number(newText));
    };

    return (
      <Modal
        visible={isVisible}
        style={{ justifyContent: "center", alignItems: "center" }}
        transparent
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Feather
              style={styles.exitIcon}
              name="x-circle"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.textInputs}>
            {/* This will include the text input for the amount */}
            <TextInput
              style={styles.amountInput}
              placeholder="amount"
              onChangeText={(text) => setAmount(Number(text))}
              value={amount?.toString()}
            />
            {/* This will include the text input for the label */}
            <TextInput
              style={styles.labelInput}
              placeholder="label"
              onChangeText={setLabel}
              value={label}
            />
          </View>
          {mode === "add" ? (
            <TouchableOpacity style={styles.addButton} onPress={runAddAccount}>
              <Text style={styles.buttonText}>Add Account</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={runEditAccount}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
	container: {
		width: 180,
		height: 264,
		backgroundColor: "#D9D9D9",
		borderRadius: 23,
		alignSelf: "center",
	},
	amountInput: {
		width: 130,
		height: 34,
		backgroundColor: "#FFFFFF",
		marginBottom: 2,
		textAlign: "center",
	},
	labelInput: {
		width: 130,
		height: 34,
		backgroundColor: "#FFFFFF",
		marginBottom: 24,
		textAlign: "center",
	},
	addButton: {
		width: 140,
		height: 44,
		borderRadius: 10,
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		backgroundColor: "white",
		textAlign: "center",
		marginBottom: "2%",
	},
	wrapButton: {
		width: 140,
		height: 44,
		borderRadius: 10,
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "column",
		backgroundColor: "white",
		textAlign: "center",
	},
	buttonText: {
		textAlign: "center",
		fontSize: 17,
		color: "#000000",
		paddingTop: 7,
		paddingBottom: 7,
		paddingLeft: 20,
		paddingRight: 20,
		width: "100%",
		fontFamily: "Sarabun_300Light",
	},
	textInputs: {
		marginTop: 37,
		alignSelf: "center",
	},
	exitIcon: {
		paddingRight: 10,
		paddingTop: 10,
		alignSelf: "flex-end",
	},
	confirmContainer: {
		width: 180,
		height: 264,
		backgroundColor: "#D9D9D9",
		borderRadius: 23,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	confirmButton: {
		width: 100,
		height: 30,
		borderRadius: 10,
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		backgroundColor: "white",
		textAlign: "center",
		marginBottom: "2%",
	},
	confirmButtonText: {
		textAlign: "center",
		fontSize: 14,
		color: "#000000",
		width: "100%",
		fontFamily: "Sarabun_300Light",
	},
});

export default AccountModal;
