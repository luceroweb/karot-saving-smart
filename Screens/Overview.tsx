import React from 'react';
import { StyleSheet, View } from "react-native";
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
    width: 320,
  },
  tileRow: {
      flexDirection: "row",
  }
});
