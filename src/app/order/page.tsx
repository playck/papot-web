"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/feature/order/store/order";
import { usePayment } from "@/feature/order/hooks/usePayment";
import { useOrder } from "@/feature/order/hooks/useOrder";
import type { PaymentMethod, PaymentResponse } from "@/shared/types/payment";
import {
  OrderItems,
  OrderCustomer,
  ShippingAddress,
  PaymentMethodSelector,
  OrderSideBar,
} from "@/feature/order/components";

export default function OrderPage() {
  const router = useRouter();
  const { order, isProcessing } = useOrderStore();
  const { createOrderAfterPayment } = useOrder();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("card");
  const [isVerifying, setIsVerifying] = useState(false);

  const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID || "";
  const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || "";

  useEffect(() => {
    if (!order) {
      router.push("/cart");
    }
  }, [order, router]);

  const verifyPayment = async (paymentResponse: PaymentResponse) => {
    if (!paymentResponse.impUid || !order) return;

    setIsVerifying(true);

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          impUid: paymentResponse.impUid,
          merchantUid: paymentResponse.merchantUid,
          expectedAmount: order.summary.finalPrice,
        }),
      });

      const result = await res.json();

      if (result.success && result.verified) {
        await createOrderAfterPayment(paymentResponse.impUid);
      } else {
        alert(result.error || "결제 검증에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 검증 오류:", error);
      alert("결제 검증 중 오류가 발생했습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  const { requestPayment, isProcessing: isPaymentProcessing } = usePayment({
    storeId,
    channelKey,
    onSuccess: (res) => {
      verifyPayment(res);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handlePayment = async () => {
    if (!order) {
      alert("주문 정보를 확인할 수 없습니다.");
      return;
    }

    if (!order.customer.name || !order.customer.phone) {
      alert("주문자 정보를 입력해주세요.");
      return;
    }

    if (
      !order.shippingAddress.recipientName ||
      !order.shippingAddress.address
    ) {
      alert("배송지 정보를 입력해주세요.");
      return;
    }

    await requestPayment({
      merchantUid: order.orderNumber,
      amount: order.summary.finalPrice,
      name: `${order.items[0]?.product?.name || "상품"}${
        order.items.length > 1 ? ` 외 ${order.items.length - 1}건` : ""
      }`,
      buyerName: order.customer.name,
      buyerTel: order.customer.phone,
      buyerEmail: order.customer.email || "",
      buyerAddr: order.shippingAddress.address,
      buyerPostcode: order.shippingAddress.zipCode,
      paymentMethod: selectedPaymentMethod,
    });
  };

  if (!order) {
    return null;
  }

  const isLoading = isProcessing || isPaymentProcessing || isVerifying;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">결제하기</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 좌측: 주문 정보 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
            <OrderItems items={order.items} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <OrderCustomer customer={order.customer} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <ShippingAddress shippingAddress={order.shippingAddress || {}} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />
          </div>
        </div>

        {/* 우측: 결제 금액 & 버튼 */}
        <div className="lg:col-span-1">
          <OrderSideBar
            summary={order.summary}
            isProcessing={isLoading}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
}
