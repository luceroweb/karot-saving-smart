import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as Linking from "expo-linking";
import useAssets from "../Utils/useAssets";
import { GlobalStateType } from "../Utils/types";
import DrawerNavigation from "./DrawerNavigation";
import AuthStack from "./AuthStack";

const urlPrefix = Linking.createURL("/");

const RootNavigation = () => {
  useAssets();

  const isLoggedIn = useSelector<GlobalStateType>(
    (state) => state.user.data.loggedIn
  );

  const config = {
    screens: {
      Login: "login",
      Logout: "logout",
      Overview: "overview",
      ContactForm: "contact",
    },
  };

  const linking = {
    prefixes: [urlPrefix],
    config,
  };

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
