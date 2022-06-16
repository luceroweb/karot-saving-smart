import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { setIsLoggedIn } from "../Utils/userDataSlice";
import Header from "./Header";
import { MenuStackType } from "./MenuStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Menu = () => {
  const dispatch = useDispatch();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackType, "Menu">>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Menu"
        LeftIcon={() => (
          <FontAwesome5 name="bars" size={18} onPress={nav.openDrawer} />
        )}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          nav.navigate({
            name: "Contact",
            key: "Contact",
          })
        }
      >
        <Text style={styles.text}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => dispatch(setIsLoggedIn(false))}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: { flex: 1 },
  btn: {
    backgroundColor: "#f00",
    padding: 12,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 20, fontWeight: "600" },
});
