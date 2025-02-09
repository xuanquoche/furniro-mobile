import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { router, Tabs } from "expo-router";
import React from "react";
import { Alert, Platform, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import TabBar from "@/components/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, Home, User, Logout, AddSquare } from "iconsax-react-native";
import { customFetch } from "@/apis";

const Drawer = createDrawerNavigator();

function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function CustomDrawerContent(props: any) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          console.log("User logged out");
          await AsyncStorage.removeItem("access_token");
          await customFetch("auth/logout", "POST");
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerItemContainer}>
        <View style={styles.shadowBox}>
          <DrawerItem
            label="Home"
            onPress={() => router.replace("/(tabs)/home")}
            icon={() => <Home size="24" color="black" />}
          />
        </View>
        <View style={styles.shadowBox}>
          <DrawerItem
            label="Shop"
            onPress={() => router.replace("/(tabs)/events")}
            icon={() => <Calendar size="24" color="black" />}
          />
        </View>
        <View style={styles.shadowBox}>
          <DrawerItem
            label="Create"
            onPress={() => router.replace("/(tabs)/map")}
            icon={() => <AddSquare size="32" color="black" />}
          />
        </View>
        <View style={styles.shadowBox}>
          <DrawerItem
            label="Profile"
            onPress={() => router.replace("/(tabs)/profile")}
            icon={() => <User size="24" color="black" />}
          />
        </View>

        <View style={[styles.shadowBox, styles.logoutButton]}>
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            icon={() => <Logout size="24" color="white" />}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerItemContainer: {
    marginTop: 10,
  },
  shadowBox: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "red",
  },
});
