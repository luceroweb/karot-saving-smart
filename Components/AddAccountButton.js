import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const AddAccountButton = () => {
  return (
    <View>
    <TouchableOpacity>
    <AntDesign name="pluscircle" size={24} color="black" />
    </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({

});

export default AddAccountButton