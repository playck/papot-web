"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderAdapter } from "@/feature/order/adapters/OrderAdapter";
import { getUserOrders } from "../../../shared/api/client-api";
import { ClientOrder, OrderWithUser } from "../../../shared/types/order";

export function useUserOrders(userId: string | undefined) {
  return useQuery<ClientOrder[]>({
    queryKey: ["userOrders", userId],
    queryFn: async () => {
      const orders = await getUserOrders(userId!);
      return OrderAdapter.toClientOrders(orders as OrderWithUser[]);
    },
    enabled: !!userId,
  });
}
