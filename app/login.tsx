import { View, Text, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/InputComponent";
import { Lock, Sms } from "iconsax-react-native";
import { appColors } from "@/constants/appColors";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/components";
import { Validate } from "@/utils/validate";
import { customFetch } from "@/apis";
import { useAuthStore } from "@/store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect, router } from "expo-router";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  const addUser = useAuthStore((state) => state.addUser);

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    const loginData = {
      username: email,
      password: password,
    };
    if (emailValidation) {
      const response = await customFetch("auth/login", "POST", loginData);

      console.log("response login: ", response);

      if (response) {
        addUser(response);
        await AsyncStorage.setItem("access_token", response.data.access_token);
        router.replace("/(tabs)/home");
      }
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../assets/images/logo.png")} />
        <Text>Login</Text>
      </View>
      <View style={{ flex: 1 }}>
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={(val) => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={(val) => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />

        <SectionComponent>
          <RowComponent justify="space-between">
            <RowComponent onPress={() => setIsRemember(!isRemember)}>
              <Switch
                trackColor={{ true: appColors.primary }}
                thumbColor={appColors.white}
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <SpaceComponent width={4} />
              <TextComponent text="Remember me" />
            </RowComponent>
            <ButtonComponent
              text="Forgot Password?"
              onPress={() => navigation.navigate("ForgotPassword")}
              type="text"
            />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPassword")}
            type="text"
          />
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent
            disable={isDisable}
            onPress={handleLogin}
            text="SIGN IN"
            type="primary"
          />
        </SectionComponent>
      </View>
    </View>
  );
};

export default LoginScreen;
