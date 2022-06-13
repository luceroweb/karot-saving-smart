import { useState, useCallback } from "react";
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
import { DatePickerModal } from "react-native-paper-dates"; //date picker for web
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { addExpense } from "../Utils/expenseSlice";
import { recalculateBudget } from "../Utils/remainingBudgetSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker"; //date picker for android/ios

const ExpenseModal = () => {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const accounts = useSelector((state: GlobalStateType) => state.accounts.list);
  const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
  const remainingBudget = useSelector(
    (state: GlobalStateType) => state.budgets.remaining
  );
  const dispatch = useDispatch();
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
    onDismissSingle;
  };
  const formSubmit = () => {
    setLabel(label);
    setAmount(amount);
    const newExpense = {
      label: label,
      saved: amount,
      goal: amount,
      date: Number(date),
    };
    dispatch(addExpense(newExpense ));
    dispatch(
      recalculateBudget({
        expenses: [...expenses, newExpense],
        accounts: accounts,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true}>
        {/* This is where the Form starts */}
        <View style={styles.modalSize}>
          <View style={styles.titleContainer}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={styles.xIcon}
                onPress={() => {
                  setModalVisible(!modalVisible);
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
              <Text style={styles.titleText}>Add Expense</Text>
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
              value={"" + amount}
              onChangeText={(number) => {
                setAmount(Number(number));
              }}
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
          <TouchableOpacity
            onPress={() => {
              formSubmit();
              setLabel("");
              setAmount(0);
              setDate(0);
              setModalVisible(false);
            }}
            style={styles.buttonStyle}
          >
            <Text style={{ fontSize: 16 }}>Confirm</Text>
          </TouchableOpacity>
          {/* This is where the form ends */}
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <AntDesign name="pluscircle" size={48} color="#4D62BF" />
      </TouchableOpacity>
    </View>
  );
};

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
    fontSize: 25,
  },
  inputStyle: {
    width: 150,
    height: 30,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingLeft: 10,
  },
  xIcon: {
    alignSelf: "flex-end",
  },
  buttonStyle: {
    alignSelf: "center",
    width: 80,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#828282",
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
});

export default ExpenseModal;
