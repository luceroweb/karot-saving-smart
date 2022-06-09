import React, { useEffect, FC, useState, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from "react-native";
import karotBunny from "../Images/karot-bunny-logo.png";
import karotSlogan from "../Images/karot-slogan.png";
import logoCombinedImage from '../Images/logo/logo_combined.png';
import {
	useFonts,
	Sarabun_700Bold,
	Sarabun_400Regular,
	Sarabun_300Light,
} from "@expo-google-fonts/sarabun";
import { LinearGradient } from "expo-linear-gradient";
import { LoginPropsType, GlobalStateType } from "../Utils/types";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../Utils/userDataSlice";
import * as SplashScreen from 'expo-splash-screen';

WebBrowser.maybeCompleteAuthSession();

const Login: FC<LoginPropsType> = ({
	loggedIn,
	setLoggedIn,
}: LoginPropsType) => {
	let [fontsLoaded] = useFonts({
		Sarabun_700Bold,
		Sarabun_400Regular,
		Sarabun_300Light,
	});
  const splashImagesAnimation = useRef(new Animated.Value(0)).current;
  const [appReady, setAppReady] = useState<boolean>(false);
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

	useEffect(() => {
    const playSplashAnimation = async (): Promise<void> => {
      // app is ready, hide SplashScreen, start animation
      await SplashScreen.hideAsync();
      
      Animated.timing(splashImagesAnimation, {
        delay: 2000,
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.bezier(0.65, 0, 0.35, 1)
      }).start(() => setLoggedIn({ status: '', screen: 'login' }));
    }
    const loadAssets = async (): Promise<void> => {
      try {
        // Prevent the static SplashScreen image from auto-hiding so we can manually hide it
        await SplashScreen.preventAutoHideAsync();
        // preload any images, fonts, sounds, addtional assets
        await Asset.loadAsync([
          require("../Images/logo/logo_combined.png")
        ])
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true);
      }
    }

    if (appReady) {
      playSplashAnimation();
    } else {
      loadAssets();
    }
  }, [appReady]);

	

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1.6, y: 1 }}
				colors={["#2383C9", "#5A1E70"]}
				style={styles.container}
			>
				<Animated.View style={[styles.splashImageContainer,
        {
          transform: [
            { translateY: splashImagesAnimation }
          ]
        }
      ]}
      >
        <Image 
          style={{
            maxWidth: 215,
            width: "50%",
            height: 352,
          }}
          resizeMode="contain"
          source={logoCombinedImage}
          fadeDuration={0}
        />
      </Animated.View>
			{/* <Image source={logoCombinedImage} style={styles.bunnyLogo} />
				<Image source={karotSlogan} style={styles.karotSlogan} /> */}
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
  splashImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
