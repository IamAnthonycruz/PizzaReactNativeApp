import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import products from "assets/data/products";
import ProductListItem from "@/components/ProductListItem";

const MenuScreen = () => {
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
