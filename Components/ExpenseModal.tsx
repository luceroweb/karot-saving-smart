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
import Modal from "react-native-modal";

const ExpenseModal= () => {    
    const [label, setLabel] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
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
                date: new Date(date) 
            })
        );
    };

    return(        
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                coverScreen={true}
                hasBackdrop={true}
                backdropColor="black"
                backdropOpacity={0.7}
            >                
                <View>
                    {/* This is where the Form starts */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            Add Expenses
                        </Text>
                        <Pressable
                            style={styles.inputStyle}
                            onPress={() => {                                
                                toggleModal()
                            }}
                        >
                            <Text>X</Text>
                        </Pressable>                        
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={styles.textContainer}>Label:</Text>
                        <TextInput
                            style={styles.inputStyle}
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
                            style={styles.inputStyle}
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
                                style={styles.inputStyle}
                                placeholder='put date here'
                                value={date}
                                onChangeText={(text) => {
                                    setDate(text);
                                }}
                            />
                        )}
                    </View>
                    <Pressable
                        style={styles.buttonStyle}
                        onPress={() => {
                            formSubmit()
                            setLabel("")
                            setAmount(0)
                            setDate("")
                            toggleModal()
                        }}
                    >
                        <Text>Confirm</Text>
                    </Pressable>
                    {/* This is where the form ends */}
                </View>
            </Modal>
            <Pressable
                style={styles.iconStyle}
                onPress={() => {
                    toggleModal()
                }}
            >
                <Text>+</Text>
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
        flexDirection: "row",        
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    inputStyle: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderColor: "#000",
    },
    buttonStyle: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderColor: "#000",
    },
    iconStyle: {
        color: 'blue',
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

export default ExpenseModal;