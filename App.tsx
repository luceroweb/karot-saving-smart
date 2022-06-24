import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar as RNStatusBar,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./Utils/store";
import { Provider } from "react-redux";
import RootNavigation from "./Navigation/RootNavigation";

// Uncomment ReduxStateTest to test various state actions and reducers
// import ReduxStateTest from "./Components/ReduxStateTest";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            {/* Uncomment ReduxStateTest to test various state actions and reducers */}
            {/* <ReduxStateTest /> */}
            <RootNavigation />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  container: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
