import { View, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Home,
  ShoppingCart,
  Location,
  User,
  AddSquare,
} from "iconsax-react-native";
import { Link, router } from "expo-router";
import ButtonComponent from "./ButtonComponent";
import CircleComponent from "./CircleComponent";

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icon: { [key: string]: (color: string) => JSX.Element } = {
    home: (color) => <Home size="32" color={color} />,
    events: (color) => <ShoppingCart size="32" color={color} />,
    map: (color) => <AddSquare size="32" color={color} />,
    profile: (color) => <User size="32" color={color} />,
  };

  return (
    <View style={{ position: "relative", flexDirection: "column" }}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              {icon[route.name](isFocused ? "#673ab7" : "white")}
            </PlatformPressable>
          );
        })}
      </View>
      <CircleComponent styles={styles.fabContainer} color="#719bde">
        <ButtonComponent
          text="+"
          styles={styles.fab}
          textColor="white"
          onPress={() => router.push("/(product)/add")}
        />
      </CircleComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    gap: 10,
  },
  tabButton: {
    backgroundColor: "red",
    width: 40,
    height: 40,
  },
  fabContainer: {
    position: "absolute",
    bottom: 40,
    left: "43%",
    transform: [{ translateY: -20 }],
    zIndex: 100,
    height: 50,
    width: 50,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    color: "white",
  },
});

export default TabBar;
