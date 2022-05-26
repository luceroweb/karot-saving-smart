import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { store } from "./Utils/store";
import { Provider } from "react-redux";
import ReduxStateTest from "./Components/ReduxStateTest";
import Overview from "./Screens/Overview";

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
        {/* Uncomment ReduxStateTetst to test various state actions and reducers */}
        {/* <ReduxStateTest /> */}
        {loggedIn.status !== "success" ? (
          <Text>Splash screen</Text>
        ) : loggedIn.screen === "login" ? (
          <Text>Login screen</Text>
        ) : (
          <Text>Overview</Text>
        )}
        <Overview />
        <StatusBar style="auto" />
      </View>
    </Provider>
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
