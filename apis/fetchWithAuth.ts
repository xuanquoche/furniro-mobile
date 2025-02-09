import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchWithAuth = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: any
) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`fetch with auth ${url} -> error`, error);
  }
};
