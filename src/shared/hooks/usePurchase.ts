"use client";

import { useRouter } from "next/navigation";
import { useOrderStore } from "@/feature/order/store/order";
import { OrderAdapter } from "@/feature/order/adapters/OrderAdapter";
import { useAuth } from "./useAuth";

export interface PurchaseItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export function usePurchase() {
  const router = useRouter();
  const { user } = useAuth();
  const { createDirectOrder } = useOrderStore();

  const buyNow = (item: PurchaseItem) => {
    const orderData = {
      orderNumber: OrderAdapter.generateOrderNumber(),
      items: [item],
      totalAmount: item.price * item.quantity,
      userId: user?.id || null, // 비회원은 null
    };

    createDirectOrder(orderData);

    router.push("/order");
  };

  return {
    buyNow,
  };
}
