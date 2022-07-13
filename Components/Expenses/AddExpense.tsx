import { StyleSheet, TouchableOpacity } from "react-native";
import { setModalMode, setExpenseModalVisibility } from "../../Utils/appSlice";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const AddExpense = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.plusModal}
      onPress={() => {
        dispatch(setExpenseModalVisibility(true));
        dispatch(setModalMode("add"));
      }}
    >
      <AntDesign name="pluscircle" size={48} color="#4D62BF" />
    </TouchableOpacity>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  plusModal: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
