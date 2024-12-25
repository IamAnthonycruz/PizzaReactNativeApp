import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrdersDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";
export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: order, isLoading, error } = useOrdersDetails(id);
  useUpdateOrderSubscription(id);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Not found</Text>;
  }
  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
