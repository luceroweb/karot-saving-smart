import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Sarabun_700Bold, Sarabun_400Regular, Sarabun_300Light } from "@expo-google-fonts/sarabun";

export default function Tile() {
  let [fontsLoaded] = useFonts ({ Sarabun_700Bold, Sarabun_400Regular, Sarabun_300Light });
  const [budgetDetails, setBudgetDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={ styles.budgetSubTextTop}>Your budget is:</Text>
        <Text style={ styles.budgetText }>$750</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" onPress={() => setBudgetDetails(!budgetDetails)}/>
        <Text style={ styles.budgetSubTextBottom }>Based on your fixed expenses</Text>
      </View>
      {
      budgetDetails ?
        <View>
            <Text>Bottom part</Text>
        </View>
      :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    margin: 10,
    padding: 40,
    height: 180,
  },
  tileEdit: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  budgetText: {
    textAlign: "center",
    fontSize: 60,
    fontFamily: "Sarabun_700Bold",
  },
  budgetSubTextTop: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Sarabun_400Regular",
  },
  budgetSubTextBottom: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sarabun_300Light",
  },
});
