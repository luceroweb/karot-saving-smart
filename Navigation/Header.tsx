import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfileIcon from "../Components/ProfileIcon";

interface Props {
  navigation: NavigationStackProp<{ userId: string }>;
}

const Header: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.icon}>
        <ProfileIcon />
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
  },
  icon: {
    flexDirection: "row",
  },
});
