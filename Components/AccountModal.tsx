import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAccount, editAccount } from "../Utils/accountSlice";
import { AccountType } from "../Utils/types";
import { Feather } from "@expo/vector-icons";

interface Props {
  account: AccountType;
  unselectedAccounts: AccountType[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string;
}

const AccountModal = memo<Props>(
  ({ account, unselectedAccounts, isVisible, setIsVisible, mode }) => {
    mode = mode ? mode : "add";

    const [amount, setAmount] = useState<number>(0);
    const [label, setLabel] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
      setAmount(account ? account.saved : 0);
      setLabel(account ? account.label : "");
    }, [account]);

    const runAddAccount = () => {
      const newAccount = {
        label: label,
        saved: amount,
        goal: null,
        date: Date.now(),
      };
      dispatch(addAccount(newAccount));
      setIsVisible(false);
    };

    const runEditAccount = () => {
      const accountUpdate = {
        label: label,
        saved: amount,
        goal: account.goal,
        date: account.date,
      };
      dispatch(editAccount([...unselectedAccounts, accountUpdate]));
      setIsVisible(false);
    };

    const onChanged = (text:any) => {
      let newText:any="";
      let numbers = '0123456789.';
      for (let i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              alert("please enter numbers only");
          }
      }
      setAmount(newText);
  }

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
              onChangeText={text =>onChanged(text)}
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
    height: 244,
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
    width: 130,
    height: 34,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
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
});

export default AccountModal;
