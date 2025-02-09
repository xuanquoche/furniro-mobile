import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<
    "/login" | "/(tabs)/home" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const { access_token, addToken } = useAuthStore();

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          addToken(token);
        }
      } catch (error) {
        console.error("Error loading access token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccessToken();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setInitialRoute(access_token ? "/(tabs)/home" : "/login");
    }
  }, [access_token, isLoading]);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}
