import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreenAnimation from './components/SplashScreenAnimation';
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
          colors={['#2383C9', '#5A1E70']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.8, y: 1.1 }}
          style={styles.linearGradientContainer}
        >
        {loggedIn.screen === "login"
          ? <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Login screen</Text>
          : <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Overview</Text>}
        <StatusBar style="auto" />
        </LinearGradient>
      </View>
    </SplashScreenAnimation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradientContainer: {
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  }
});
