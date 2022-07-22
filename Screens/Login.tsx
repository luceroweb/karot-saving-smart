import React, { useEffect, FC, useState, useRef, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";
import logoCombinedImage from "../Images/logo/logo_combined.png";
import GoogleSignIn from "../Images/btn_google_signin_dark_normal_web.png";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStateType } from "../Utils/types";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setIsLoggedIn } from "../Utils/userDataSlice";
import * as SplashScreen from "expo-splash-screen";

WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

const Login: FC = () => {
  const splashImagesAnimation = useRef(new Animated.Value(0)).current;
  const loginButtonAnimation = useRef(new Animated.Value(0)).current;

  const userData = useSelector<GlobalStateType>((state) => state.user.data);
  const appReady = useSelector<GlobalStateType>((state) => state.app.appReady);

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
      dispatch(setIsLoggedIn(true));
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
      Animated.timing(splashImagesAnimation, {
        delay: 2000,
        toValue: -100,
        duration: 2000,
        useNativeDriver: Platform.OS === "web" ? false : true,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
      }).start();
      // }).start(() => setLoggedIn({ screen: "login" }));

      Animated.timing(loginButtonAnimation, {
        delay: 4000,
        toValue: 1,
        duration: 1200,
        useNativeDriver: Platform.OS === "web" ? false : true,
      }).start();
      // }).start(() => setLoggedIn({ screen: "login" }));
    };

    if (appReady) playSplashAnimation();
  }, [appReady]);

  // hide splash screen after logo image is loaded to prevent flickers
  const onLogoImageReady = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return appReady ? (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1.6, y: 1 }}
        colors={["#2383C9", "#5A1E70"]}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.splashImageContainer,
            {
              transform: [{ translateY: splashImagesAnimation }],
            },
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
            onLoadEnd={onLogoImageReady}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: loginButtonAnimation,
          }}
        >
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync({ showInRecents: false });
            }}
            style={styles.loginButton}
          >
            <Image
              style={{
                maxWidth: "90%",
                width: 191,
                height: 46,
              }}
              resizeMode="contain"
              source={GoogleSignIn}
              fadeDuration={0}
              onLoadEnd={onLogoImageReady}
              accessible
              accessibilityLabel="Sign In with Google"
            />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  ) : null;
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
    justifyContent: "center",
  },
  splashImageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
