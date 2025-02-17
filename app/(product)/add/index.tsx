import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { TextInput, Button, HelperText, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { fetchWithAuth } from "@/apis";
import { router, useLocalSearchParams } from "expo-router";
import { Modalize } from "react-native-modalize";
import { addImage } from "@/apis/add-image";

export default function AddProductScreen() {
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    categories: "",
    images: [] as (string | undefined)[],
    size: "S",
    color: "",
    brand: "",
    thumbnail: "" as string | undefined,
    quantity: 0 as number,
    original_price: 0,
    discount: 0 as number,
    status: 0 as number,
  });

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Out of Stock", value: "OUT_OF_STOCK" },
  ];

  const categoriesOptions = [
    { label: "Sofas", value: "Sof67a71c30285fba3d326bf439as" },
    { label: "Table", value: "67a71c1f285fba3d326bf437" },
    { label: "Chair", value: "67a71c18285fba3d326bf435" },
  ];

  const sizeOptions = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];

  const colors = [
    { name: "Orange", code: "#FFA500" },
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#FF0000" },
    { name: "Yellow", code: "#FFD700" },
    { name: "Blue", code: "#0000FF" },
  ];

  const handleSubmit = async () => {
    const response = await fetchWithAuth("products", "POST", product);
    console.log("product values", product);
    if (response.statusCode === 201) {
      router.replace("/(tabs)/home");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri],
      }));
    }
  };

  const pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const thumbnailFetch = await addImage({
        body: { file: result.assets[0].uri },
      });
      setProduct((prev) => ({
        ...prev,
        thumbnail: thumbnailFetch.data.filePath,
      }));
    }
  };

  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
    >
      <TextInput
        label="Product Name"
        value={product.product_name}
        onChangeText={(text) => setProduct({ ...product, product_name: text })}
        mode="outlined"
      />

      <TextInput
        label="Description"
        value={product.product_description}
        onChangeText={(text) =>
          setProduct({ ...product, product_description: text })
        }
        mode="outlined"
        multiline
      />

      <Button
        mode="contained"
        onPress={pickThumbnail}
        style={{ marginVertical: 10 }}
      >
        Chọn Thumbnail
      </Button>

      {product.thumbnail ? (
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      ) : null}

      <Button
        mode="contained"
        onPress={pickImage}
        style={{ marginVertical: 10 }}
      >
        Chọn Ảnh
      </Button>

      <ScrollView horizontal>
        {product.images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width: 100, height: 100, marginRight: 10 }}
          />
        ))}
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: product.color,
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 50,
            }}
          ></View>
          <TouchableOpacity
            onPress={openModal}
            style={{ padding: 15, backgroundColor: "#6200EE", borderRadius: 5 }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Choose Color</Text>
          </TouchableOpacity>
        </View>

        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          childrenStyle={{ height: 370 }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Color
            </Text>
            {colors.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
                onPress={() => {
                  setProduct({ ...product, color: item.code });
                  modalizeRef.current?.close();
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: item.code,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>
      </View>

      <TextInput
        label="Brand"
        value={product.brand}
        onChangeText={(text) => setProduct({ ...product, brand: text })}
        mode="outlined"
      />

      <TextInput
        label="Quantity"
        value={product.quantity.toString()}
        onChangeText={(text) =>
          setProduct({ ...product, quantity: parseInt(text) })
        }
        keyboardType="numeric"
        mode="outlined"
      />

      <TextInput
        label="Original Price"
        value={product.original_price.toString()}
        onChangeText={(text) =>
          setProduct({ ...product, original_price: parseInt(text) })
        }
        keyboardType="numeric"
        mode="outlined"
      />

      <TextInput
        label="Discount (%)"
        value={product.discount.toString()}
        onChangeText={(text) =>
          setProduct({ ...product, discount: parseInt(text) })
        }
        keyboardType="numeric"
        mode="outlined"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontWeight: "semibold", fontSize: 18 }}>Status</Text>
        <Picker
          selectedValue={product.status}
          onValueChange={(value) => setProduct({ ...product, status: value })}
        >
          {statusOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontWeight: "semibold", fontSize: 18 }}>
          Pick Category
        </Text>
        <Picker
          selectedValue={product.categories}
          onValueChange={(value) =>
            setProduct({ ...product, categories: value })
          }
        >
          {categoriesOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontWeight: "semibold", fontSize: 18 }}>Pick Size</Text>
        <Picker
          selectedValue={product.size}
          onValueChange={(value) => setProduct({ ...product, size: value })}
        >
          {sizeOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 20, bottom: 30 }}
      >
        Submit
      </Button>
    </ScrollView>
  );
}
