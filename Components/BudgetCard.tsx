import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  Sarabun_700Bold,
  Sarabun_400Regular,
  Sarabun_300Light,
} from "@expo-google-fonts/sarabun";

export default function Tile() {
  let [fontsLoaded] = useFonts({
    Sarabun_700Bold,
    Sarabun_400Regular,
    Sarabun_300Light,
  });
  const [budgetDetails, setBudgetDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        {budgetDetails ? <Text>Accounts List Component here</Text> : null}
        <Text style={styles.budgetTextTop}>Balance:</Text>
        <Text style={styles.budgetText}>
          $346.13
        </Text>
        <Text style={styles.budgetTextBottom}>
          $346.13 left of $475
        </Text>
        <MaterialIcons
            name={budgetDetails ? "keyboard-arrow-up":"keyboard-arrow-down"}
            size={24}
            color="black"
            onPress={() => setBudgetDetails(!budgetDetails)}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottom: "4px solid black",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 40,
    minHeight: 180,
    width: 380,
  },
  budgetText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Sarabun_700Bold",
  },
  budgetTextTop: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sarabun_400Regular",
  },
  budgetTextBottom: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Sarabun_300Light",
    padding: 10,
  },
});
