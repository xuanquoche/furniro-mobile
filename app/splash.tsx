import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicatorComponent,
  ActivityIndicator,
} from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={{ flex: 1 }}
      imageStyle={{
        resizeMode: "cover",
        height: "100%",
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{
          alignSelf: "center",
          justifyContent: "center",
          marginTop: "100%",
          marginBottom: 50,
        }}
      />

      <ActivityIndicator size="large" />
    </ImageBackground>
  );
};

export default SplashScreen;
