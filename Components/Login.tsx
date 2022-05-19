import React, { useEffect, useState,FC} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, View, Text,Image,TouchableOpacity } from "react-native";
import { LoginPropsType } from "../Util/types";
import TitleKarotSavingSmart from "../Images/logo/title_karot-saving-smart.png";
import logoWhiteAndGoldBunny from "../Images/logo/logo_white-and-gold-bunny.png";
WebBrowser.maybeCompleteAuthSession();

const Login: FC<LoginPropsType> = ({ loggedIn, setLoggedIn }: LoginPropsType) => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"1038262737574-iddu4aellun0nlvpd5auvie2o35p39pu.apps.googleusercontent.com",
		webClientId:
			"1038262737574-j0un3526ir5mkdo2cno1fl7o0v3jlnla.apps.googleusercontent.com",
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { authentication, type } = response;
			console.log(response)
			setLoggedIn({
				status: type,
				screen: loggedIn.screen,
			});
		}
	}, []);

	return (
		<View style={styles.container}>
			<Image source={logoWhiteAndGoldBunny} style={styles.logoImage} />
			<Image source={TitleKarotSavingSmart} style={styles.titleImage} />
			<TouchableOpacity
				style={styles.touchableOpacity}
				disabled={!request}
				onPress={() => {
					promptAsync();
				}}
			>
				<Text style={styles.login}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoImage: {
		width: 173.2,
		height: 190.63,
	},
	titleImage: {
		width: 208,
		height: 84,
		margin: 10,
	},
	touchableOpacity: {
		backgroundColor: "#fff",
		width: 207,
		height: 51,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	login: {
		fontWeight: "700",
		fontSize: 30,
		fontFamily: "Sukhumvit Set",
	},
});
export default Login;