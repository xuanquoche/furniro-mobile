import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreen from "./splash";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(product)" options={{ headerShown: true }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
