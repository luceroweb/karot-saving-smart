import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Sarabun_700Bold, Sarabun_400Regular, Sarabun_300Light } from "@expo-google-fonts/sarabun";
import ProgressBar from './ProgressBar';

export default function Tile() {
  let [fontsLoaded] = useFonts ({ Sarabun_700Bold, Sarabun_400Regular, Sarabun_300Light });
  const [budgetDetails, setBudgetDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={ styles.budgetSubTextTop}>Your budget is:</Text>
        <Text style={ styles.budgetText }>$750
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" onPress={() => setBudgetDetails(!budgetDetails)}/>
        </Text>
        <Text style={ styles.budgetSubTextBottom }>Based on your fixed expenses</Text>
      </View>
      {
      budgetDetails ?
      <View>
        <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Rent</Text>
            <Text style={styles.incomeText}>$1100</Text>
            <Text style={styles.incomeText}>Due on 05/01/2022</Text>
        </View>
        <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Car</Text>
            <Text style={styles.incomeText}>$450</Text>
            <Text style={styles.incomeText}>Due on 05/15/2022</Text>
        </View>
        <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Bills</Text>
            <Text style={styles.incomeText}>$560</Text>
            <Text style={styles.incomeText}>Due on 05/21/2022</Text>
        </View>
        <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Other</Text>
            <Text style={styles.incomeText}>$390</Text>
            <Text style={styles.incomeText}>Due on 05/07/2022</Text>
        </View>
        <ProgressBar />
      </View>
      :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 40,
    minHeight: 180,
    width: "90%",
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
  incomeRow: {
    flexDirection: "row",
  },
  incomeText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sarabun_400Regular",
  },
});
