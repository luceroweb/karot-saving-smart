import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

interface Props{
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddAccountButton = ({setIsVisible}:Props) => {
  return (
    <View>
    <TouchableOpacity onPress={()=>setIsVisible(true)}>
    <AntDesign name="plus" size={24} color="black" style={{width:"100%", textAlign:"center"}}/>
    </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({

});

export default AddAccountButton