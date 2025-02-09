import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { fetchWithAuth } from "@/apis";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatNumber";
import { useToast } from "react-native-toast-notifications";

const ProductDetailScreen = () => {
  const [size, setSize] = useState(null);
  const [openSize, setOpenSize] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const toast = useToast();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchWithAuth(`products/${id}`, "GET");

      if (response.statusCode === 200) {
        setProduct(response.data);
      }
    };
    fetchProduct();
  }, []);

  const handleDelte = async () => {
    const response = await fetchWithAuth(`products/${id}`, "DELETE");
    if (response.statusCode !== 200) {
      toast.show("Delete failed", { type: "danger" });
    }
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product?.thumbnail,
        }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <View style={styles.row}>
          <DropDownPicker
            open={openSize}
            value={size}
            items={[
              { label: "S", value: "S" },
              { label: "M", value: "M" },
              { label: "L", value: "L" },
            ]}
            setOpen={setOpenSize}
            setValue={setSize}
            placeholder="Size"
            style={styles.dropdown}
          />
        </View>

        <Text style={styles.brand}>{product?.brand}</Text>
        <Text style={styles.productTitle}>{product?.product_name}</Text>
        <Text style={styles.price}>
          {formatCurrency(
            (product?.original_price ?? 0) -
              ((product?.original_price ?? 0) * (product?.discount ?? 0)) / 100
          )}
        </Text>

        <View style={styles.rating}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="staro" size={16} color="#FFD700" />
          <Text style={styles.reviewText}>(10)</Text>
        </View>

        <Text style={styles.description}>
          Short dress in soft cotton jersey with decorative buttons down the
          front and a wide, frill-trimmed neckline.
        </Text>

        <Link style={styles.addToCartButton} href={`/(product)/edit/${id}`}>
          <Text style={styles.addToCartText}>Edit</Text>
        </Link>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleDelte}>
          <Text style={styles.addToCartText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productTitle: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  reviewText: {
    marginLeft: 5,
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  addToCartButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
