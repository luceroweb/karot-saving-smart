import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Sarabun_700Bold } from "@expo-google-fonts/sarabun";
import { Raleway_400Regular, Raleway_600SemiBold } from "@expo-google-fonts/raleway";

export default function ExpenseCard() {
  let [fontsLoaded] = useFonts ({
      Sarabun_700Bold,
      Raleway_400Regular,
      Raleway_600SemiBold
    });

  return (
    <View style={styles.container}>
      <Text style={styles.expenseAmount}>$1,100</Text>
      <Text style={styles.expenseLabel}>Rent</Text>
      <Text style={styles.expenseDate}>May 2022</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 23,
    aspectRatio: 1,
    margin: 15,
    padding: 22,
    height: 180,
  },
  expenseAmount: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "bold",
    fontFamily: "Sarabun_700Bold",
    position: "absolute",
    top: 52,
  },
  expenseLabel: {
    fontSize: 20,
    lineHeight: 23,
    fontFamily: "Raleway_600SemiBold",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 37,
  },
  expenseDate: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: "Raleway_400Regular",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 17,
  },
});
