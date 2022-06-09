import { StatusBar } from "expo-status-bar";
import { useState} from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  StatusBar as RNStatusBar 
} from "react-native";
import SplashScreenAnimation from "./Components/SplashScreenAnimation";
import { store } from "./Utils/store";
import { Provider } from "react-redux";
import Overview from "./Screens/Overview";
import Login from "./Screens/Login";
import ExpensesForm from "./Components/ExpensesForm";
import AddAccountModal from "./Components/AddAccountModal";

// Uncomment ReduxStateTest to test various state actions and reducers
// import ReduxStateTest from "./Components/ReduxStateTest";

export default function App() {
  const [loggedIn, setLoggedIn] = useState({
    status: "",
    screen: "splash",
  });

  return (
    <Provider store={store}>
      <SafeAreaView>
        <View>
          <AddAccountModal/>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: RNStatusBar.currentHeight || 0
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
