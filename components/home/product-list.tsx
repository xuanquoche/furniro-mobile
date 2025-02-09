import { fetchWithAuth } from "@/apis";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatNumber";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithAuth("products", "GET");
      if (response.statusCode === 200) {
        setProducts(response.data.result);
      }
    };
    fetchData();
  }, []);
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/(product)/detail/${item._id}`)}
          key={item._id}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{item.product_name}</Text>
          <Text style={styles.price}>
            {formatCurrency(
              item.original_price - (item.original_price * item.discount) / 100
            )}{" "}
            vnd
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    width: "48%",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
});

export default ProductList;
