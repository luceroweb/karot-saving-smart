import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreenAnimation from "./Components/SplashScreenAnimation";
import { store } from "./Utils/store";
import { Provider } from "react-redux";
import Overview from "./Screens/Overview";

// Uncomment ReduxStateTest to test various state actions and reducers
// import ReduxStateTest from "./Components/ReduxStateTest";

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
    <Provider store={store}>
      <View style={styles.container}>
        {/* Uncomment ReduxStateTest to test various state actions and reducers */}
        {/* <ReduxStateTest /> */}
        {loggedIn.screen === "splash" ? (
          <SplashScreenAnimation setLoggedIn={setLoggedIn} />
        ) : loggedIn.screen === "login" ? (
          <Text>Login screen</Text>
        ) : (
          <Overview />
        )}
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
});
