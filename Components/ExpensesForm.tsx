import { FC, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch} from "react-redux";
import { ExpenseType, GlobalStateType } from "../Utils/types";
import { addExpense } from "../Utils/expenseSlice";


const ExpensesForm = () => {
    const [label, setLabel] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const expenses = useSelector((state: GlobalStateType) => state.expenses.list);
    const dispatch = useDispatch();
    console.log(label);
    console.log(amount);

    const formSubmit = () => {
        dispatch(addExpense({ label, goal: amount, date: Date() }))
    }
    console.log(expenses);

    return(
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.textContainer}>Label:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
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
                <Text>{Date()}</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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