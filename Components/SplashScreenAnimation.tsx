import React, { useEffect, useState, useRef, FC } from 'react';
import { Animated, Easing, StyleSheet, Image } from 'react-native';
import {Sarabun_300Light,Sarabun_600SemiBold,Sarabun_700Bold,
} from "@expo-google-fonts/sarabun";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from "expo-asset";
import { LinearGradient } from 'expo-linear-gradient';
import logoCombinedImage from '../Images/logo/logo_combined.png';
import { LoggedInType } from '../Utils/types';
interface Props {
  setLoggedIn: ({ status, screen }: LoggedInType) => void;
}

const SplashScreenAnimation: FC<Props> = ({ setLoggedIn }) => {
  const splashImagesAnimation = useRef(new Animated.Value(0)).current;
  const [appReady, setAppReady] = useState<boolean>(false);

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
        await Font.loadAsync({Sarabun_300Light,
          Sarabun_600SemiBold,
          Sarabun_700Bold,});
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
    <>
      <LinearGradient
        colors={['#2383C9', '#5A1E70']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.8, y: 1.1 }}
        style={StyleSheet.absoluteFill}
      />
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