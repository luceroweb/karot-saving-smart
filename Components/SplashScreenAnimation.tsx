import React, { useEffect, useState, useRef, FC } from 'react';
import { Animated, Easing, StyleSheet, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from "expo-asset";
import splashScreenImage from '../Images/splash-screen.png';
import logoImage from '../Images/logo/logo_white-and-gold-bunny.png';
import titleImage from '../Images/logo/title_karot-saving-smart.png';
import logoCombinedImage from '../Images/logo/logo_combined.png';
import { LoggedInType } from '../Utils/types';
interface Props {
  setLoggedIn: ({ status, screen }: LoggedInType) => void;
}

const SplashScreenAnimation: FC<Props> = ({ setLoggedIn }) => {
  const splashImagesAnimation: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [appReady, setAppReady] = useState<boolean>(false);
  const space = 30;

  useEffect(() => {
    const playSplashAnimation = async () => {
      // app is ready, hide the static SplashScreen image
      await SplashScreen.hideAsync();
      // start animated SplashScreen image
      Animated.timing(splashImagesAnimation, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.bezier(0.65, 0, 0.35, 1)
      }).start(() => setLoggedIn({ status: '', screen: 'login' }));
    }
    const loadAssets = async () => {
      try {
        // Prevent the static SplashScreen image from auto-hiding so we can manually hide it
        await SplashScreen.preventAutoHideAsync();
        // load the SplashScreen image so we can use it as an animated image
        await Asset.loadAsync([
          require("../Images/splash-screen.png"),
          require("../Images/logo/logo_white-and-gold-bunny.png"),
          require("../Images/logo/title_karot-saving-smart.png"),
          require("../Images/logo/logo_combined.png")
        ])
        // Load any fonts, sounds, images, addtional assets here
        await new Promise(resolve => setTimeout(() => resolve(null), 2000));
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true);
      }
    }

    if (appReady) {
      // SplashScreen.hideAsync();
      playSplashAnimation();
    } else {
      loadAssets();
    }
  }, [appReady]);

  return (
    <>
      {/* <Image
        source={splashScreenImage}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { height: '100%', width: '100%', borderWidth: 2, borderColor: 'skyblue' }]}
      /> */}
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
    </>
  )
}

const styles = StyleSheet.create({
  splashImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

  }
})

export default SplashScreenAnimation