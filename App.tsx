import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text, View, Button } from "react-native";

interface LoggedIn {
  status: string;
  screen: string;
}

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loggedIn, setLoggedIn] = useState<LoggedIn>({
    status: "success",
    screen: "login",
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1038262737574-iddu4aellun0nlvpd5auvie2o35p39pu.apps.googleusercontent.com",
    webClientId:
      "1038262737574-j0un3526ir5mkdo2cno1fl7o0v3jlnla.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication, type } = response;
      setLoggedIn({
        status: type,
        screen: loggedIn.screen,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn.status !== "success" ? (
        <Text>Splash screen</Text>
      ) : loggedIn.screen === "login" ? (
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
