import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/globalStyles";
import { AttachSquare, SearchNormal1 } from "iconsax-react-native";
import CategoryList from "@/components/home/category-list";
import ProductList from "@/components/home/product-list";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.container]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 20,
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <AttachSquare size="32" color="#FF8A65" />
        </TouchableOpacity>
        <Text>HomeScreen</Text>
        <SearchNormal1 size="32" color="#FF8A65" />
      </View>
      <View style={{ height: 50, marginTop: 20 }}>
        <CategoryList />
      </View>
      <View style={{ marginTop: 20 }}>
        <ProductList />
      </View>
    </View>
  );
};

export default HomeScreen;
