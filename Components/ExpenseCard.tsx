import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Sarabun_700Bold } from "@expo-google-fonts/sarabun";

export default function ExpenseCard() {
  let [fontsLoaded] = useFonts ({ Sarabun_700Bold  });

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons style={styles.expenseEdit} name="lead-pencil" size={20} color="black" />
      <Text style={ styles.expenseText }>$1,100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    aspectRatio: 1,
    margin: 10,
    padding: 40,
    height: 180,
  },
  expenseEdit: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  expenseText: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "bold",
    fontFamily: "Sarabun_700Bold",
  }
});
