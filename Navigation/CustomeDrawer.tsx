import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import Profile from "../Screens/Profile";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}
          >
            <AntDesign name="left" size={24} color="#000" />
          </TouchableOpacity>
          <Profile />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});

export default CustomDrawer;
