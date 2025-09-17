"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useOrderStore } from "@/feature/order/store/order";
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
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/signin");
      return;
    }

    const orderData = {
      orderNumber: `${dayjs().format("YYYYMMDD")}${String(
        Math.floor(Math.random() * 100)
      ).padStart(2, "0")}`,
      items: [item],
      totalAmount: item.price * item.quantity,
      userId: user.id,
    };

    createDirectOrder(orderData);

    router.push("/order");
  };

  return {
    buyNow,
  };
}
