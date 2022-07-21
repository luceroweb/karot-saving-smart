import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { AccountType } from "../Utils/types";
import { useDispatch } from "react-redux";
import {
  setExpenseModalVisibility,
  setModalMode,
  setModalType,
  setSelectedAccount,
} from "../Utils/appSlice";

const AddAccountButton = () => {
  const newAccount = {
    label: "",
    saved: 0,
    goal: 0,
    date: Date.now(),
    id: uuid.v4().toString(),
  };

  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(setModalMode("add"));
          dispatch(setModalType("account"));
          dispatch(setSelectedAccount(newAccount));
          dispatch(setExpenseModalVisibility(true));
        }}
      >
        <AntDesign
          name="plus"
          size={24}
          color="black"
          style={{ width: "100%", textAlign: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddAccountButton;
