import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "a1f8b5c3-d2e4-4c6b-a3d2-77c4f23a8f56",
    title: "Lvingroom",
  },
  {
    id: "b7e5d4c2-9f31-42da-a8b3-c67f9e8d12a4",
    title: "Bedroom",
  },
  {
    id: "c3a9f7e1-5b8d-4762-9d5e-23a1b8c4f671",
    title: "OK Item",
  },
  {
    id: "d4c5b7a2-6e8f-47a1-b9d2-f65c3a8e7b91",
    title: "LP Item",
  },
  {
    id: "e8b9d3f2-7a5c-41e3-b6d4-c21f7a8b56d9",
    title: "IK Item",
  },
  {
    id: "f2d6a7c8-3b5e-49a1-8c9d-4e7f1b3a2d65",
    title: "OPP Item",
  },
];

const categoriesOptions = [
  { id: "Sof67a71c30285fba3d326bf439as", title: "Sofas" },
  { id: "67a71c1f285fba3d326bf437", title: "Table" },
  { id: "67a71c18285fba3d326bf435", title: "Chair" },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const CategoryList = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "#CFCFCF" : "#E8E8E8";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={categoriesOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    width: 120,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default CategoryList;
