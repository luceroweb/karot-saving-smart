import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";
import useAssets from "../Utils/useAssets";

const RootNavigation = () => {
  useAssets();

  const isLoggedIn = useSelector<GlobalStateType>(
    (state) => state.user.data.loggedIn
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
