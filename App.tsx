import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Components/Login";
import { LoggedInType } from "./Util/types";


export default function App() {
  const [loggedIn, setLoggedIn] = useState<LoggedInType>({
		status: "success",
		screen: "login",
	});
  

  return (
    <View style={styles.container}>
      {loggedIn.status !== "success" ? (
        <Text>Splash screen</Text>
      ) : loggedIn.screen === "login" ? (
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      ) : (
        <Text>Overview</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    
  },
});
