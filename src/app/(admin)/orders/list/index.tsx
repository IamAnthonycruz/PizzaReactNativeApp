import { Text, FlatList, ActivityIndicator } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderListener } from "@/api/orders/subscription";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });
  useInsertOrderListener();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
