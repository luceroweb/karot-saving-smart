import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "./Header";
import CustomDrawer from "./CustomDrawer";
import Overview from "../Screens/Overview";
import ContactForm from "../Screens/ContactForm";
import Login from "../Screens/Login";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const drawerOptions = {
    drawerActiveBackgroundColor: "#FFF",
    drawerActiveTintColor: "#000",
    drawerLabelStyle: {
      marginLeft: -15,
      fontFamily: "Sarabun_400Regular",
      fontSize: 20,
    },
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
        ...drawerOptions,
      }}
    >
      <Drawer.Screen
        name="Overview"
        component={Overview}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactForm"
        component={ContactForm}
        options={{
          drawerIcon: () => (
            <FontAwesome name="phone" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Login}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="person" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
