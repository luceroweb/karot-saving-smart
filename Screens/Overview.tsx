import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import BudgetTile from '../Components/BudgetTile';
import Tile from '../Components/Tile';

export default function Overview() {
  return (
    <View style={styles.container}>
      <BudgetTile />
      <View style={styles.tileRow}>
            <Tile />
            <Tile />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tileRow: {
      flexDirection: "row",
  }
});
