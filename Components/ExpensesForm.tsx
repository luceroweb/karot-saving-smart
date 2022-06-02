import { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Pressable,
    Button,
    Platform 
} from "react-native";
import { useSelector, useDispatch} from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { addExpense } from "../Utils/expenseSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ExpensesForm = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [label, setLabel] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
    const dispatch = useDispatch();
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = () => {
        setDate(date);
        hideDatePicker();
    };    

    const formSubmit = () => {
        setLabel(label);
        setAmount(amount);
        dispatch(
            addExpense({ 
                label: label,
                saved: amount,
                goal: amount, 
                date: Date.parse(date) 
            })
        );
    };
    console.log(expenses);

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    Add Expenses
                </Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.textContainer}>Label:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="put label here"
                    value={label}
                    onChangeText={(text) => {
                        setLabel(text)
                    }}                
                />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.textContainer}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={"" + amount}
                    onChangeText={(number) => {
                        setAmount(Number(number) || 0)
                    }}
                />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.textContainer}>Due Date:</Text>
                {Platform.OS !== "web" ? (
                    <View>
                        <Button title="Pick the date" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder='put date here'
                        value={date}
                        onChangeText={(text) => {
                            setDate(text);
                        }}
                    />
                )}
            </View>
            <Pressable
                style={styles.input}
                onPress={() => {
                    formSubmit();
                }}
            >
                <Text>Confirm</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleContainer: {        
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    input: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderColor: "#000",
    },
    subContainer: {
        flexDirection: "row",
        paddingBottom: 10
    },
    textContainer: {
        alignSelf: "center",
        paddingRight: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default ExpensesForm;