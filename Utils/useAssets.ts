import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  Sarabun_300Light,
  Sarabun_400Regular,
  Sarabun_600SemiBold,
  Sarabun_700Bold,
} from "@expo-google-fonts/sarabun";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { GlobalStateType } from "./types";
import { setAppReady } from "./appSlice";

export default function useAssets() {
  const appReady = useSelector<GlobalStateType>(
    (state) => state.app.appReady
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAssets = async (): Promise<void> => {
      try {
        // preload any images, fonts, sounds, addtional assets
        await Font.loadAsync({
          Sarabun_300Light,
          Sarabun_400Regular,
          Sarabun_600SemiBold,
          Sarabun_700Bold,
        });
        await Asset.loadAsync([
          require("../Images/logo/logo_combined.png"), 
          require("../Images/btn_google_signin_dark_normal_web.png")
      ]);
      } catch (e) {
        // handle errors
      } finally {
        dispatch(setAppReady(true));
      }
    };

    if (!appReady) loadAssets();
  }, [appReady]);
}