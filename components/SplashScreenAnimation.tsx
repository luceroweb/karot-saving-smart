import React, { useEffect, useState, FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from "expo-asset";
import Constants from 'expo-constants';
import splashScreenImage from '../Images/splash-screen.png';

const SplashScreenAnimation: FC = ({ children }) => {
  const fadeAnimation: Animated.Value = new Animated.Value(1);
  const translateYAnimation: Animated.Value = new Animated.Value(0);
  const [appReady, setAppReady] = useState<boolean>(false);
  const [splashAnimationComplete, setSplashAnimationComplete] = useState<boolean>(false);

  useEffect(() => {
    const playSplashAnimation = async () => {
      // app is ready, hide the static SplashScreen image
      await SplashScreen.hideAsync();
      // start animated SplashScreen image
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnimation, {
          toValue: -100,
          duration: 2000,
          useNativeDriver: true,
        })
      ]).start(() => setSplashAnimationComplete(true));
    }
    const loadAssets = async () => {
      try {
        // Prevent the static SplashScreen image from auto-hiding so we can manually hide it
        await SplashScreen.preventAutoHideAsync();
        // load the SplashScreen image so we can use it as an animated image
        await Asset.fromModule(require("../Images/splash-screen.png")).downloadAsync();
        // Load any fonts, sounds, images, addtional assets here
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
    <>
      {appReady && children}
      {!splashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { 
              opacity: fadeAnimation,
              backgroundColor: Constants.manifest?.splash?.backgroundColor,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest?.splash?.resizeMode || "contain",
              transform: [
                { translateY: translateYAnimation },
              ],
            }}
            source={splashScreenImage}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </>
  )
}

export default SplashScreenAnimation