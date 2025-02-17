import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "@/styles/globalStyles";
import { AttachSquare, SearchNormal1, CloseSquare } from "iconsax-react-native";
import CategoryList from "@/components/home/category-list";
import ProductList from "@/components/home/product-list";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Product } from "@/types/product";
import { searchProduct } from "@/apis/search-product";
import { Link } from "expo-router";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await searchProduct({
          keyword: searchQuery,
          current: 1,
          pageSize: 10,
        });

        if (response.statusCode === 200) {
          setProducts(response.data.result);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <View style={[globalStyles.container]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          paddingHorizontal: 30,
        }}
      >
        {!isSearching ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <AttachSquare size="32" color="#FF8A65" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>HomeScreen</Text>
          </>
        ) : (
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderBottomWidth: 1,
              borderColor: "#FF8A65",
              paddingHorizontal: 10,
              fontSize: 16,
            }}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        )}

        <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
          {isSearching ? (
            <CloseSquare size="32" color="#FF8A65" />
          ) : (
            <SearchNormal1 size="32" color="#FF8A65" />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ height: 60, marginTop: 20 }}>
        <CategoryList />
      </View>

      <View style={{ marginTop: 10, flex: 1 }}>
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
        ) : searchQuery.trim() !== "" ? (
          products.length > 0 ? (
            products.map((item, index) => (
              <Link
                href={`/(product)/detail/${item._id}`}
                style={{ padding: 10, borderBottomWidth: 1 }}
              >
                <Text style={{ fontSize: 16 }}>{item.product_name}</Text>
              </Link>
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>No products found</Text>
          )
        ) : (
          <ProductList />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
