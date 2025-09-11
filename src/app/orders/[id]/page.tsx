"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import OrderItems from "@/feature/order/components/OrderItems";
import OrderCustomer from "@/feature/order/components/OrderCustomer";
import ShippingAddress from "@/feature/order/components/ShippingAddress";
import OrderSideBar from "@/feature/order/components/OrderSidebar";
import PageLoader from "@/shared/components/PageLoader";
import PageError from "@/shared/components/PageError";
import { useOrderStore } from "@/feature/order/store/order";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const {
    order,
    isLoading,
    error,
    isProcessing,
    fetchOrder,
    processPayment,
    reset,
  } = useOrderStore();

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }

    return () => {
      reset();
    };
  }, [orderId, fetchOrder, reset]);

  if (isLoading) {
    return (
      <PageLoader title="주문 정보" subtitle="주문 내용을 불러오는 중입니다" />
    );
  }

  if (error || !order) {
    return <PageError message={error || "주문 정보를 찾을 수 없습니다."} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">주문/결제</h1>
          <p className="text-neutral-600 mt-2">주문번호: {order.orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 사이드 - 주문 정보 */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItems items={order.items} />
            <OrderCustomer customer={order.customer} />
            <ShippingAddress shippingAddress={order.shippingAddress} />
          </div>

          {/* 오른쪽 사이드 - 결제 요약 */}
          <div className="lg:col-span-1">
            <OrderSideBar
              summary={order.summary}
              onProceedToPayment={processPayment}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
