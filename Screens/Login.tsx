import React, { useEffect, FC, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import karotBunny from "../Images/karot-bunny-logo.png";
import karotSlogan from "../Images/karot-slogan.png";
import { LinearGradient } from "expo-linear-gradient";
import { LoginPropsType, GlobalStateType } from "../Utils/types";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../Utils/userDataSlice";

WebBrowser.maybeCompleteAuthSession();

const Login: FC<LoginPropsType> = ({
	loggedIn,
	setLoggedIn,
}: LoginPropsType) => {
	const userData = useSelector<GlobalStateType>((state) => state.user.data);
	const dispatch = useDispatch();
	const [accessToken, setAccessToken] = useState<string | undefined>();
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"1038262737574-iddu4aellun0nlvpd5auvie2o35p39pu.apps.googleusercontent.com",
		webClientId:
			"1038262737574-j0un3526ir5mkdo2cno1fl7o0v3jlnla.apps.googleusercontent.com",
	});

	useEffect(() => {
		if (response?.type === "success") {
			setAccessToken(response?.authentication?.accessToken);
		}
	}, [response]);

	useEffect(() => {
		if (response?.type === "success") {
			getUserData();
		}
	}, [accessToken]);

	useEffect(() => {
		if (response?.type === "success") {
			setLoggedIn({
				status: response?.type,
				screen: response?.type === "success" ? "overview" : "login",
			});
		}
	}, [userData]);

	async function getUserData() {
		let userInfoResponse = await fetch(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);

		userInfoResponse.json().then((data) => {
			const responseUserData = {
				firstName: data.given_name,
				lastName: data.family_name,
				avatar: data.picture,
				email: data.email,
			};
			dispatch(setUserData(responseUserData));
		});
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1.6, y: 1 }}
				colors={["#2383C9", "#5A1E70"]}
				style={styles.container}
			>
				<Image source={karotBunny} style={styles.bunnyLogo} />
				<Image source={karotSlogan} style={styles.karotSlogan} />
				<TouchableOpacity
					disabled={!request}
					onPress={() => {
						promptAsync({ showInRecents: false });
					}}
					style={styles.loginButton}
				>
					<Text style={styles.textLogin}>Login</Text>
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},
	bunnyLogo: {
		width: 263,
		height: 263,
	},
	karotSlogan: {
		marginTop: 30,
		marginBottom: 30,
		width: 218,
		height: 83,
	},
	loginButton: {
		flexDirection: "column",
		height: 40,
		width: 80,
		backgroundColor: "white",
		justifyContent: "center",
		borderRadius: 10,
	},
	textLogin: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: "Sarabun_700Bold",
	},
});

export default Login;
