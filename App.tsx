import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreenAnimation from './Components/SplashScreenAnimation';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={['#2383C9', '#5A1E70']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.8, y: 1.1 }}
        style={StyleSheet.absoluteFill}
      />
      {loggedIn.screen === "splash" ? <SplashScreenAnimation setLoggedIn={setLoggedIn} />
       : <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Login screen</Text>}
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

