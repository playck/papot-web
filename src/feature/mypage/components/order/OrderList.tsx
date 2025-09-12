"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useUserOrders } from "@/shared/hooks/useUserOrders";
import { useAuth } from "@/shared/hooks/useAuth";
import PageLoader from "@/shared/components/PageLoader";
import PageError from "@/shared/components/PageError";
import { OrderItem } from "./OrderItem";

export function OrderList() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: orders, isLoading, error } = useUserOrders(user?.id);

  if (isLoading) {
    return (
      <PageLoader title="주문 내역" subtitle="주문 내역을 불러오는 중..." />
    );
  }

  if (error) {
    return (
      <PageError
        title="주문 내역을 불러올 수 없습니다"
        message="잠시 후 다시 시도해주세요."
        showHomeButton={false}
        showRefreshButton={true}
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
          <ShoppingBag size={32} className="text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          주문 내역이 없습니다
        </h3>
        <p className="text-neutral-600 mb-6">첫 주문을 시작해보세요!</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          상품 둘러보기
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
