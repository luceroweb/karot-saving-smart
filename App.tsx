import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreenAnimation from './Components/SplashScreenAnimation';

interface LoggedIn {
  status: string;
  screen: string;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState<LoggedIn>({
    status: "",
    screen: "splash",
  });
  return (
    <View style={styles.container}>
      {
        loggedIn.screen === "splash"
          ? <SplashScreenAnimation setLoggedIn={setLoggedIn} />
          : <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Login Screen</Text>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

