import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AccountType } from "../Utils/types";

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<AccountType>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  blankAccount: AccountType;
}
const AddAccountButton = ({
  setIsVisible,
  setAccount,
  setMode,
  blankAccount,
}: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
          setAccount(blankAccount);
          setMode("add");
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
