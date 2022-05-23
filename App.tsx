import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Components/Login";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
      start={{x: 0, y: 0}} end={{x: 1.6, y: 1}} colors={['#2383C9', '#5A1E70']}
        style={styles.container}
      >
      <Login />
      <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '100%'
  },
});
