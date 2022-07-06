import { useState, useCallback, useEffect } from "react";
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
import { GlobalStateType, ExpenseType } from "../Utils/types";
import { addExpense, deleteExpense, editExpense } from "../Utils/expenseSlice";
import {
  setExpenseModalVisibility,
  setExpenseDetailsModalVisiblity,
} from "../Utils/appSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker"; //date picker for android/ios
interface Props {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  expense: ExpenseType;
}
const ExpenseModal = ({
  amount,
  setAmount,
  label,
  setLabel,
  expense,
}: Props) => {
  const [date, setDate] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
  const appData = useSelector((state: GlobalStateType) => state.app);
  const dispatch = useDispatch();

  useEffect(()=> {
    appData?.modalMode === "add" && setLabel("");
  }, [appData.expenseModalVisibility])

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

  const onChangeTextAmount = (number: any) => {
    let newText: any = "";
    let newNumber = "0123456789.";
    for (let i = 0; i < number.length; i++) {
      if (newNumber.indexOf(number[i]) > -1) {
        newText = newText + number[i];
      } else {
        alert("please enter number values only");
      }
    }
    setAmount(Number(newText));
  };

  const runAddExpense = () => {
    if (label.length > 0 && amount > 0) {
      setLabel(label);
      setAmount(amount);
      const newExpense = {
        label: label,
        saved: amount,
        goal: amount,
        date: date > 0 ? Number(date) : Date.now(),
        id: uuid.v4().toString(),
      };
      dispatch(addExpense(newExpense));
      dispatch(setExpenseModalVisibility(false));
    } else {
      alert("There is an empty value in one of the inputs");
    }
  };
  const runEditExpense = () => {
    const expenseUpdate: ExpenseType = {
      ...expense,
      label: label,
      saved: amount,
    };
    dispatch(editExpense(expenseUpdate));
    dispatch(setExpenseModalVisibility(false));
  };
  const runDeleteExpenses = () => {
    dispatch(deleteExpense(expense.id));
    dispatch(setExpenseDetailsModalVisiblity(false));
  };
  const displayConfirm = () => (
    <Modal
      style={{ justifyContent: "center", alignItems: "center" }}
      transparent
    >
      <View style={styles.confirmContainer}>
        <View>
          <Text style={styles.buttonText}>Delete {expense.label}?</Text>
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                runDeleteExpenses();
                setConfirm(false);
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
      <Modal visible={appData?.expenseModalVisibility} transparent={true}>
        {/* This is where the Form starts */}
        <View style={styles.modalSize}>
          <View style={styles.titleContainer}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={styles.xIcon}
                onPress={() => {
                  dispatch(setExpenseModalVisibility(false));
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
                {appData?.modalMode === "add"
                  ? "Add Expense"
                  : "Update Expense"}
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
              value={
                appData?.modalMode !== "add" ? amount?.toString() : undefined
              }
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
          {appData?.modalMode === "add" ? (
            <TouchableOpacity
              onPress={() => {
                runAddExpense();
                setLabel("");
                setAmount(0);
                setDate(0);
                dispatch(setExpenseModalVisibility(false));
              }}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 16 }}>Confirm</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonWrap}>
              <TouchableOpacity
                onPress={() => {
                  runEditExpense();
                  dispatch(setExpenseModalVisibility(false));
                }}
                style={styles.buttonStyle}
              >
                <Text style={{ fontSize: 16 }}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  setConfirm(true);
                  dispatch(setExpenseModalVisibility(false));
                }}
              >
                <Text style={{ fontSize: 16, alignSelf: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* This is where the form ends */}
        </View>
      </Modal>
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
    fontSize: 35,
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
