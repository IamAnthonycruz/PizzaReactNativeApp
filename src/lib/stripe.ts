import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });
  if (data) {
    return data;
  }
  Alert.alert("Error fetching", error);
  return {};
};
export const intialisePaymnetSheet = async (amount: number) => {
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );
  if (paymentIntent || !publishableKey) return;
  await initPaymentSheet({
    merchantDisplayName: "anthony",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });
};
export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();
  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};
