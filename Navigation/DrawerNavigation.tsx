import { createDrawerNavigator } from "@react-navigation/drawer";
import Overview from "../Screens/Overview";
// import Menu from "../../screens/Menu";
// import MenuStack from "../MenuStack";
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Overview" component={Overview} />
      {/* <Drawer.Screen
        name="MenuStack"
        options={{ title: "Menu", headerShown: false }}
        component={MenuStack}
      /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
