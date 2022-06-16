import { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStateType } from "../Utils/types";

const Profile: FC = () => {
  const userData = useSelector((state: GlobalStateType) => state.user.data);
  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.avatar }} style={styles.profileImage} />
      <Text style={styles.userText}>
        {userData.firstName} {userData.lastName}
      </Text>
      <Text style={styles.userText}>{userData.email}</Text>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    minHeight: 180,
  },
  userText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Sarabun_400Regular",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 100,
    alignSelf: 'center'
  }
});
