import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAccount } from "../Utils/accountSlice";
import { GlobalStateType } from "../Utils/types";
import { Feather } from '@expo/vector-icons';

const AddAccountModal = () => {
    const [amount, setAmount] = useState("");
    const [label, setLabel] = useState("");
    const dispatch = useDispatch();
    const accounts = useSelector((state: GlobalStateType) => state.accounts.list);

    const runAddAccount = () => {
      const newAccount = {
        label: label,
        saved: amount,
        goal: null,
        date: Date.now(),
      };
      dispatch(addAccount(newAccount));
    }

  return (
    <View>
      <View style={styles.container}>
      <Feather 
        style={styles.exitIcon} 
        name="x-circle" 
        size={24} 
        color="black"
       />
        <View style={styles.textInputs}>
          {/* This will include the text input for the amount */}
          <TextInput 
            style={styles.amountInput} 
            placeholder="amount"
            onChangeText={setAmount}
            value={amount}
          />
          {/* This will include the text input for the category */}
          <TextInput 
            style={styles.categoryInput} 
            placeholder="label"
            onChangeText={setLabel}
            value={label}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText} onPress={() => {runAddAccount(); console.log(accounts)}}>Add to List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    textAlign: "center"
  },
  categoryInput: {
    width: 130,
    height: 34,
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center"
  },
  addButton: {
    width: 130,
    height: 34,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: 'white',
    textAlign: "center"
  },
  buttonText:{
    textAlign: "center",
    fontSize: 17,
    color: "#000000",
    width: 200,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20
  },
  textInputs:{
      marginTop: 37,
      alignSelf: 'center'
  }, 
  exitIcon:{
    paddingRight: 10,
    paddingTop: 10,
    alignSelf: "flex-end"

  }
});

export default AddAccountModal;
