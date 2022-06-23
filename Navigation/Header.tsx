import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfileIcon from "../Components/ProfileIcon";
import { DrawerHeaderProps } from "@react-navigation/drawer";

const Header: FC<DrawerHeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.icon}>
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
  },
  icon: {
    flexDirection: "row",
  },
});
