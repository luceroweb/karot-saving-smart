import { createDrawerNavigator } from "@react-navigation/drawer";
import Overview from "../Screens/Overview";
import ContactForm from "../Screens/ContactForm";
import Login from "../Screens/Login";
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Overview" component={Overview} />
      <Drawer.Screen name="ContactForm" component={ContactForm} />
      <Drawer.Screen name="Logout" component={Login} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
