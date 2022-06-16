import {
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";

interface Props {
  title: string;
  LeftIcon?: () => JSX.Element;
  containerStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
}

const Header: FC<Props> = ({
  title,
  LeftIcon,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {LeftIcon?.()}
      <Text style={[styles.title, titleStyles]}>{title}</Text>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    paddingVertical: 12,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 12,
  },
});
