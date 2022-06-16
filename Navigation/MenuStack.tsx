import { createStackNavigator } from "@react-navigation/stack";
import ContactForm from "../Screens/ContactForm";
import Menu from "./Menu";

export type MenuStackType = {
  ContactForm: {};
  Menu: {};
};

const Stack = createStackNavigator<MenuStackType>();

function MenuStack() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="ContactForm" component={ContactForm} />
    </Stack.Navigator>
  );
}

export default MenuStack;
