import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContactForm from "./Components/ContactForm";

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
    <View >
      {/* {loggedIn.status!=="success"?
      <Text>Splash screen</Text>
    : loggedIn.screen === "login" ?
      <Text>Login screen</Text>
      : <Text>Overview</Text>
      
    } */}
      <StatusBar style="auto" /> 
      
    <ContactForm />
    </View>
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
