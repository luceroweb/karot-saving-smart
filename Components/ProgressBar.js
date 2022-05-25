import React from "react";
import { View, StyleSheet } from "react-native";

function ProgressBar() {
  let total = 25000;
  let savedSoFar = 10000;

  let progressPercentage = (savedSoFar * 100) / total;
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <View
        style={[
          styles.fill,
          { width: progressPercentage > 7 ? `${progressPercentage}%` : "7%" },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 14,
    marginTop: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#DBDBDB",
    borderRadius: 20,
  },
  fill: {
    position: "absolute",
    height: "100%",
    width: "90%",
    backgroundColor: "#316BB4",
    alignSelf: "start",
    borderRadius: 20,
  },
});

export default ProgressBar;
