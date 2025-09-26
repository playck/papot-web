"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../api/client-api";
import { ClientOrder } from "../types/order";

export function useUserOrders(userId: string | undefined) {
  return useQuery<ClientOrder[]>({
    queryKey: ["userOrders", userId],
    queryFn: () => getUserOrders(userId!),
    enabled: !!userId,
  });
}
