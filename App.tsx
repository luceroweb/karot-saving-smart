import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreenAnimation from './components/SplashScreenAnimation';

interface LoggedIn {
  status: string;
  screen: string;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState<LoggedIn>({
    status: "",
    screen: "login",
  });
  return (
    <SplashScreenAnimation>
      <View style={styles.container}>
        {loggedIn.screen === "login"
          ? <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Login screen</Text>
          : <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Overview</Text>}
        <StatusBar style="auto" />
      </View>
    </SplashScreenAnimation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
