import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar as RNStatusBar,
} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { store } from "./Utils/store";
import { Provider } from "react-redux";
import Overview from "./Screens/Overview";
import Login from "./Screens/Login";
import { RootStackParamList } from "./Utils/types";
import ContactForm from "./Screens/ContactForm";

// Uncomment ReduxStateTest to test various state actions and reducers
// import ReduxStateTest from "./Components/ReduxStateTest";
const urlPrefix = Linking.createURL('/');
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loggedIn, setLoggedIn] = useState({
    status: "",
    screen: "login",
  });
  const config = {
    screens: {
      Login: 'login',
      Overview: 'overview',
      ContactForm: 'contact'
    },
  };
  const linking = {
    prefixes: [urlPrefix],
    config,
  };
  
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            {/* Uncomment ReduxStateTest to test various state actions and reducers */}
            {/* <ReduxStateTest /> */}
            {/* <ExpensesForm /> */}
            <NavigationContainer linking={linking}>
              <RootStack.Navigator>
                {loggedIn.screen === "login" ? (
                  <RootStack.Group screenOptions={{
                      headerShown: false,
                      animation: 'none',
                    }}
                  >
                    <RootStack.Screen name="Login">
                      {props => <Login {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
                    </RootStack.Screen>
                  </RootStack.Group>
                ) : (
                  <>
                  <RootStack.Screen name="Overview" component={Overview} options={{
                    headerShown: false, animationTypeForReplace: 'pop'
                  }}/> 

                  <RootStack.Screen name="ContactForm" component={ContactForm} options={{
                    headerShown: false
                  }}/>
                  </>
                )}
              </RootStack.Navigator>
            </NavigationContainer>
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