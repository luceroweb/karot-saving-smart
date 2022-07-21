import React, { useState, useCallback, useEffect, memo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  Modal,
} from "react-native";
import uuid from "react-native-uuid";
import { DatePickerModal } from "react-native-paper-dates"; //date picker for web
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker"; //date picker for android/ios

import { GlobalStateType } from "../Utils/types";
import { addExpense, deleteExpense, editExpense } from "../Utils/expenseSlice";
import {
  setExpenseModalVisibility,
  setExpenseDetailsModalVisiblity,
} from "../Utils/appSlice";
import { addAccount, deleteAccount, editAccount } from "../Utils/accountSlice";

const ExpenseModal = memo(() => {
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const appData = useSelector((state: GlobalStateType) => state.app);

  const { modalMode, modalType, selectedAccount, selectedExpense } = appData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (modalType === "account") {
      if (selectedAccount) {
        setLabel(selectedAccount.label);
        setAmount(selectedAccount.saved.toString());
      }
    } else {
      if (selectedExpense) {
        setLabel(selectedExpense.label);
        setAmount(selectedExpense.saved.toString());
      }
    }
  }, [modalType, selectedAccount, selectedExpense]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const handleConfirm = (date: Date) => {
    setDate(Number(date));
    hideDatePicker();
    onDismissSingle();
  };

  const onChangeTextAmount = (number: any) => {
    let newText: any = "";
    let newNumber = "0123456789.";
    for (let i = 0; i < number.length; i++) {
      if (newNumber.indexOf(number[i]) > -1) {
        newText = newText + number[i];
      } else {
        alert("please enter number values only");
        return;
      }
    }
    setAmount(newText);
  };

  const saveAccount = () => {
    if (modalMode === "add") {
      dispatch(
        addAccount({
          label: label,
          saved: amount,
          goal: amount,
          date: date > 0 ? Number(date) : Date.now(),
          id: uuid.v4().toString(),
        })
      );
    } else {
      if (selectedAccount) {
        dispatch(
          editAccount({
            ...selectedAccount,
            label,
            saved: amount,
            goal: amount,
            date: date > 0 ? Number(date) : Date.now(),
          })
        );
      }
    }
    setLabel("");
    setAmount("");
    dispatch(setExpenseModalVisibility(false));
  };

  const saveExpense = () => {
    if (modalMode === "add") {
      dispatch(
        addExpense({
          label: label,
          saved: amount,
          goal: amount,
          date: date > 0 ? Number(date) : Date.now(),
          id: uuid.v4().toString(),
        })
      );
    } else {
      if (selectedExpense) {
        dispatch(
          editExpense({
            ...selectedExpense,
            label: label,
            saved: amount,
            goal: amount,
            date: date > 0 ? Number(date) : Date.now(),
          })
        );
      }
    }
    setLabel("");
    setAmount("");
    dispatch(setExpenseModalVisibility(false));
    dispatch(setExpenseDetailsModalVisiblity(false));
  };

  const onSubmit = () => {
    if (label.length > 0 && +amount > 0) {
      if (modalType === "account") {
        saveAccount();
      } else {
        saveExpense();
      }
    } else {
      alert("There is an empty value in one of the inputs");
    }
  };

  const displayConfirm = () => (
    <Modal
      style={{ justifyContent: "center", alignItems: "center" }}
      transparent
    >
      <View style={styles.confirmContainer}>
        <View>
          <Text style={styles.buttonText}>Delete {label}?</Text>
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                if (modalType === "account") {
                  console.log({ selectedAccount });
                  if (selectedAccount) {
                    dispatch(deleteAccount(selectedAccount));
                  }
                } else {
                  if (selectedExpense) {
                    dispatch(deleteExpense(selectedExpense));
                  }
                }
                setConfirm(false);
                setLabel("");
                setAmount("");
                dispatch(setExpenseDetailsModalVisiblity(false));
              }}
            >
              <Text style={{ fontSize: 16, alignSelf: "center" }}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setConfirm(false);
                setExpenseModalVisibility(true);
              }}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 16, alignSelf: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {confirm && displayConfirm()}
      <Modal visible={appData?.expenseDetailsModalVisiblity} transparent={true}>
        {/* This is where the Form starts */}
        <View style={styles.modalSize}>
          <View style={styles.titleContainer}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={styles.xIcon}
                onPress={() => {
                  dispatch(setExpenseDetailsModalVisiblity(false));
                }}
              >
                <Feather
                  name="x-circle"
                  size={30}
                  color="black"
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.titleText}>
                {`${modalMode === "add" ? "Add" : "Update"} ${
                  modalType === "expense" ? "Expense" : "Account"
                }`}
              </Text>
            </View>
          </View>
          <View style={styles.subContainer}>
            <Text style={[styles.textContainer, { paddingRight: 40 }]}>
              Label:
            </Text>
            <TextInput
              style={styles.inputStyle}
              value={label}
              onChangeText={(text) => {
                setLabel(text);
              }}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={[styles.textContainer, { paddingRight: 20 }]}>
              Amount:
            </Text>
            <TextInput
              style={styles.inputStyle}
              value={amount.toString()}
              onChangeText={(number) => onChangeTextAmount(number)}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={[styles.textContainer, { paddingRight: 5 }]}>
              Due Date:
            </Text>
            {Platform.OS === "web" ? (
              <View>
                <Button title="Pick the date" onPress={() => setOpen(true)} />
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={new Date()}
                  onConfirm={onConfirmSingle}
                />
              </View>
            ) : (
              <View>
                <Button title="Pick the date" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            )}
          </View>

          <TouchableOpacity onPress={onSubmit} style={styles.buttonStyle}>
            <Text style={{ fontSize: 16 }}>
              {modalMode === "add" ? "Confirm" : "Update"}
            </Text>
          </TouchableOpacity>
          {modalMode === "edit" && (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setConfirm(true);
                dispatch(setExpenseModalVisibility(false));
              }}
            >
              <Text style={{ fontSize: 16, alignSelf: "center" }}>Delete</Text>
            </TouchableOpacity>
          )}

          {/* This is where the form ends */}
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  titleText: {
    fontSize: 35,
  },
  inputStyle: {
    width: 150,
    height: 30,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  xIcon: {
    alignSelf: "flex-end",
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    alignSelf: "center",
    width: 80,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#828282",
    marginBottom: 5,
  },
  subContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  textContainer: {
    paddingLeft: 20,
    fontSize: 20,
  },
  modalSize: {
    justifyContent: "center",
    alignSelf: "center",
    width: 350,
    height: 300,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 210,
    padding: 10,
    borderColor: "#000",
    backgroundColor: "#DADADA",
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
});

export default ExpenseModal;

