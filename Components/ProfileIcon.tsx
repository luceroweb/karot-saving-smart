import { StyleSheet,View, TouchableOpacity, Image } from "react-native";
import { useSelector} from "react-redux";
import { GlobalStateType } from "../Utils/types";

function ProfileIcon() {
	const userData = useSelector((state: GlobalStateType) => state.user.data);
	return (
		<View>
			<TouchableOpacity >
				<Image source={{ uri: userData.avatar }} style={styles.profileImage} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 30,
		height: 30,
		borderRadius: 100,
		alignSelf: "center",
	},
	
});

export default ProfileIcon;
