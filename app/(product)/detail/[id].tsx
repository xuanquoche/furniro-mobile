import { fetchWithAuth } from "@/apis";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatNumber";
import { AntDesign } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useToast } from "react-native-toast-notifications";
import Feather from "@expo/vector-icons/Feather";

const ProductDetailScreen = () => {
  const [size, setSize] = useState(null);
  const [openSize, setOpenSize] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const toast = useToast();
  const [isModalVisible, setModalVisible] = useState(false);

  const modalRef = useRef(null);

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

  const handleDelete = async () => {
    const response = await fetchWithAuth(`products/${id}`, "DELETE");
    if (response.statusCode !== 200) {
      toast.show("Delete failed", { type: "danger" });
    }
    router.replace("/(tabs)/home");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      <Image source={{ uri: product?.thumbnail }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product?.product_name}</Text>
        <View style={styles.row}>
          <Text style={styles.brand}>{product?.brand}</Text>
          <Text style={styles.sizeText}>{product?.size}</Text>
        </View>
        <Text style={styles.price}>
          {formatCurrency(
            (product?.original_price ?? 0) -
              ((product?.original_price ?? 0) * (product?.discount ?? 0)) / 100
          )}{" "}
          $
        </Text>

        <View style={styles.rating}>
          {[...Array(4)].map((_, index) => (
            <AntDesign key={index} name="star" size={16} color="#FFD700" />
          ))}
          <AntDesign name="staro" size={16} color="#FFD700" />
          <Text style={styles.reviewText}>(10)</Text>
        </View>

        <Text style={styles.description}>
          Built for life and made to last, this full-zip corduroy jacket is part
          of our Nike Life collection.
        </Text>

        <Text style={styles.sectionTitle}>Shipping & Returns</Text>
        <Text style={styles.description}>
          Free standard shipping and free 60-day returns.
        </Text>

        <Text style={styles.sectionTitle}>Reviews</Text>
        <Text style={styles.reviewScore}>4.5 Ratings</Text>
        <Text style={styles.reviewCount}>293 Reviews</Text>

        <View style={styles.reviewItem}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#eee",
                padding: 10,
                borderRadius: 50,
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <AntDesign name="user" size={24} color="#666" />
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewerName}>Alex Morgan</Text>
              <View style={styles.reviewStars}>
                {[...Array(4)].map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={14}
                    color="#FFD700"
                  />
                ))}
                <AntDesign name="staro" size={14} color="#FFD700" />
              </View>
              <Text style={styles.reviewText}>
                Gucci introduces its heritage, creativity, and innovation into a
                plethora of collections.
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#eee",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 50,
                justifyContent: "center",
                alignContent: "center",
                height: 40,
                marginTop: 10,
              }}
            >
              <AntDesign name="user" size={24} color="#666" />
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewerName}>Alex Morgan</Text>
              <View style={styles.reviewStars}>
                {[...Array(4)].map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={14}
                    color="#FFD700"
                  />
                ))}
                <AntDesign name="staro" size={14} color="#FFD700" />
              </View>
              <Text style={styles.reviewText}>
                Gucci introduces its heritage, creativity, and innovation into a
                plethora of collections.
              </Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.addToBagButton}
            onPress={() => {
              toast.show("Added to bag", { type: "success" });
            }}
          >
            <Text style={styles.addToBagText}>
              Add to Bag - $
              {formatCurrency(
                (product?.original_price ?? 0) -
                  ((product?.original_price ?? 0) * (product?.discount ?? 0)) /
                    100
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.moreButton}>
        <Feather name="more-vertical" size={24} color="black" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} ref={modalRef}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1 }}>
            <Link style={styles.editButton} href={`/(product)/edit/${id}`}>
              <Text style={styles.buttonText}>Edit</Text>
            </Link>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  brand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeText: {
    fontSize: 16,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 25,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  reviewScore: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  reviewContent: {
    marginLeft: 10,
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewStars: {
    flexDirection: "row",
    marginVertical: 3,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToBagButton: {
    backgroundColor: "#6A0DAD",
    padding: 14,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 15,
  },
  addToBagText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  moreButton: {
    padding: 10,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
