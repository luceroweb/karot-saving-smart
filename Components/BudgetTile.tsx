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
        <Text style={styles.budgetSubTextTop}>Your budget is:</Text>
        <Text style={styles.budgetText}>
          $750
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="black"
            onPress={() => setBudgetDetails(!budgetDetails)}
          />
        </Text>
        <Text style={styles.budgetSubTextBottom}>
          Based on your fixed expenses
        </Text>
      </View>
      {budgetDetails ?
        <View style={styles.incomeContainer}>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Rent</Text>
            <Text style={styles.incomeText}>$1100</Text>
            <Text style={styles.dateText}>Due on 05/01/2022</Text>
          </View>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Car</Text>
            <Text style={styles.incomeText}>$450</Text>
            <Text style={styles.dateText}>Due on 05/15/2022</Text>
          </View>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Bills</Text>
            <Text style={styles.incomeText}>$560</Text>
            <Text style={styles.dateText}>Due on 05/21/2022</Text>
          </View>
          <View style={styles.incomeRow}>
            <Text style={styles.incomeText}>Other</Text>
            <Text style={styles.incomeText}>$390</Text>
            <Text style={styles.dateText}>Due on 05/07/2022</Text>
          </View>
          {
          Platform.OS === "ios" ?
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            :
            <Pressable style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          }
        </View>
       : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    boxShadow: "0px 5px 15px gray",
    elevation: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 40,
    minHeight: 180,
    width: 380,
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
  incomeContainer: {
    paddingTop: 20,
  },
  incomeRow: {
    flexDirection: "row",
  },
  incomeText: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Sarabun_400Regular",
    width: 60,
  },
  dateText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sarabun_400Regular",
    width: 180,
  },
  editButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "lightgray",
    margin: 30,
    padding: 15,
    width: 180,
  },
  editText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sarabun_400Regular",
  }
});
