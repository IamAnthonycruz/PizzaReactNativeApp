import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useProductList } from "@/api/products";
const MenuScreen = () => {
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      style={{ backgroundColor: "#f8f8f8" }}
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
};

export default MenuScreen;
