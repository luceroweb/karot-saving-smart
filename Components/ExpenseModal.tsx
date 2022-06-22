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
import uuid from "react-native-uuid";
import { DatePickerModal } from "react-native-paper-dates"; //date picker for web
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { GlobalStateType,ExpenseType } from "../Utils/types";
import { addExpense,editExpense } from "../Utils/expenseSlice";
import { recalculateBudget } from "../Utils/remainingBudgetSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker"; //date picker for android/ios
interface Props {
	expenseMode:string;
	setExpenseMode:React.Dispatch<React.SetStateAction<string>>;
	modalVisible:boolean; 
	setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
	unselectedExpenses:ExpenseType[] | undefined;
	amount:number;
	setAmount:React.Dispatch<React.SetStateAction<number>>;
	label:string;
	setLabel:React.Dispatch<React.SetStateAction<string>>;
	expense:ExpenseType;
}
const ExpenseModal = ({expenseMode,setExpenseMode,modalVisible,setModalVisible,unselectedExpenses,amount,setAmount,label,setLabel,expense}:Props) => {
	
  const [date, setDate] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
  const onChangeTextAmount = (number:any) => {
    let newText:any="";
    let newNumber = '0123456789.';
    for (let i=0; i < number.length; i++) {
      if(newNumber.indexOf(number[i]) > -1 ) {
        newText = newText + number[i];
      }
      else {
        alert("please enter number values only");
      }
    }
    setAmount(Number(newText))
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
			dispatch(
				recalculateBudget({
					expenses: [...expenses, newExpense],
					accounts: accounts,
				})
			);
			setModalVisible(false);
		} else {
			alert("There is an empty value in one of the inputs");
		}
	};
	const runEditExpense = () => {
		const expenseUpdate:ExpenseType = {
			label: label,
			saved: amount,
			goal: expense.goal,
			date: expense.date,
		};
		dispatch(editExpense([
			...unselectedExpenses, 
			expenseUpdate]));
		setModalVisible(false);
		dispatch(
			recalculateBudget({
				accounts: accounts,
				expenses: [...unselectedExpenses, expenseUpdate],
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
							<Text style={styles.titleText}>{expenseMode==="add" ?"Add Expense":"Update Expense"}</Text>
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
							value={expenseMode !== "add" ? amount?.toString() : undefined}
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
					{expenseMode==="add" ?
					<TouchableOpacity
					onPress={() => {
						runAddExpense();
						setLabel("");
						setAmount(0);
						setDate(0);
						setModalVisible(false);
					}}
					style={styles.buttonStyle}
				>
					<Text style={{ fontSize: 16 }}>Confirm</Text>
				</TouchableOpacity>:
					<TouchableOpacity
					onPress={() => {
						runEditExpense();
						setLabel("");
						setAmount(0);
						setDate(0);
						setModalVisible(false);
					}}
					style={styles.buttonStyle}
				>
					<Text style={{ fontSize: 16 }}>Update</Text>
				</TouchableOpacity>
					}
					
					{/* This is where the form ends */}
				</View>
			</Modal>
			<TouchableOpacity
				onPress={() => {
					setModalVisible(true);
					setExpenseMode("add");
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
