import { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity,
    Button,
    Platform,
    Modal 
} from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch} from "react-redux";
import { GlobalStateType } from "../Utils/types";
import { addExpense } from "../Utils/expenseSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ExpenseModal= () => {    
    const [label, setLabel] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
        <View 
            style={styles.container}
        >
            <Modal
                visible={modalVisible}
                transparent={true}               
            >           
                {/* This is where the Form starts */}             
                <View style={styles.modalSize}>
                    <View style={styles.titleContainer}>
                        <View style={{alignSelf: "flex-end"}}>
                            <TouchableOpacity
                                style={styles.xIcon}
                                onPress={() => {                                
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Feather 
                                    name="x-circle" 
                                    size={30} 
                                    color="black" 
                                    style={{paddingRight: 10}}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.titleText}>
                                Add Expense
                            </Text>
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={[styles.textContainer, {paddingRight: 40}]}>Label:</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={label}
                            onChangeText={(text) => {
                                setLabel(text)
                            }}                
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={[styles.textContainer, {paddingRight: 20}]}>Amount:</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={"" + amount}
                            onChangeText={(number) => {
                                setAmount(Number(number))
                            }}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={[styles.textContainer, {paddingRight: 5}]}>Due Date:</Text>
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
                                value={date}
                                onChangeText={(text) => {
                                    setDate(text);
                                }}
                            />
                        )}
                    </View>
                    <TouchableOpacity                       
                        onPress={() => {
                            formSubmit()
                            setLabel("")
                            setAmount(0)
                            setDate("")
                            setModalVisible(false)
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{fontSize: 16}}>Confirm</Text>
                    </TouchableOpacity>
                    {/* This is where the form ends */}
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <AntDesign 
                    name="pluscircle" 
                    size={48} 
                    color="#4D62BF" 
                />
            </TouchableOpacity> 
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
        paddingBottom: 30
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
        paddingLeft: 10
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
        backgroundColor: "#828282"
    },
    iconStyle: {
        height: 40,
		width: 40,
        borderRadius: 20,
		justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "blue",
        borderColor: "#000",
        marginRight:"2%",
        marginBottom:"2%",
    },
    iconTextStyle: {
        color: "#fff",
        textAlign: "center",
        fontSize: 30
    },
    subContainer: {
        flexDirection: "row",
        paddingBottom: 10
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
        backgroundColor: "#DADADA"
    }
});

export default ExpenseModal;