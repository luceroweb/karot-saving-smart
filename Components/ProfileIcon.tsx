import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector} from "react-redux";
import { GlobalStateType } from "../Utils/types";

function ProfileIcon() {
	const userData = useSelector((state: GlobalStateType) => state.user.data);
	return (
		<View style={styles.container}>
			<TouchableOpacity >
				<Image source={{ uri: userData.avatar }} style={styles.profileImage} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
        width: "100%",
	},
	profileImage: {
		width: 30,
		height: 30,
		borderRadius: 100,
		alignSelf: "center",
	},
	
});

export default ProfileIcon;
