import React, { useEffect, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { TextInput, Button, HelperText, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { fetchWithAuth } from "@/apis";
import { router, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";

export default function UpdateProductScreen() {
  const toast = useToast();
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    categories: "",
    images: [] as (string | undefined)[],
    size: 0 as 0 | 1 | 2,
    color: "",
    brand: "",
    thumbnail: "" as string | undefined,
    quantity: 0 as number,
    original_price: 0 as number,
    discount: 0 as number,
    status: 0 as number,
  });

  const { id } = useLocalSearchParams();

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

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetchWithAuth(`products/${id}`, "GET");

        if (response.statusCode === 200) {
          setProduct({
            ...response.data,
            categories: response.data.categories._id,
          });
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async () => {
    const response = await fetchWithAuth(`products/${id}`, "PATCH", product);
    console.log("response", response);
    if (response.statusCode !== 200) {
      toast.show("Hello World", { type: "danger" });
      return;
    }
    router.replace(`/(product)/detail/${id}`);
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
      setProduct((prev) => ({
        ...prev,
        thumbnail: result.assets[0].uri,
      }));
    }
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

      <View style={{ marginVertical: 10 }}>
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

      <View style={{ marginVertical: 10 }}>
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

      <TextInput
        label="Color"
        value={product.color}
        onChangeText={(text) => setProduct({ ...product, color: text })}
        mode="outlined"
      />

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

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 20, bottom: 30 }}
      >
        Update
      </Button>
    </ScrollView>
  );
}
