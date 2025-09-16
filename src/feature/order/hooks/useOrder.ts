import { useOrderStore } from "../store/order";
import { OrderAdapter } from "../adapters/OrderAdapter";
import { createOrder } from "@/shared/api/server-api";
import { Order } from "@/shared/types/order";

// 주문 상태 한글 변환 함수
export function getOrderStatusText(status: Order["status"]): string {
  const statusMap = {
    pending: "결제 대기",
    confirmed: "결제 완료",
    processing: "상품 준비중",
    shipped: "배송중",
    delivered: "배송 완료",
    cancelled: "주문 취소",
  };

  return statusMap[status] || "알 수 없음";
}

// 주문 총액 계산 검증 함수
export function validateOrderTotal(order: Order): boolean {
  const calculatedTotal = order.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const expectedTotal =
    order.summary.totalProductPrice +
    order.summary.shippingFee -
    order.summary.pointDiscount;

  return (
    calculatedTotal === order.summary.totalProductPrice &&
    expectedTotal === order.summary.finalPrice
  );
}

export function useOrder() {
  const { order, isProcessing, setOrder, setError, setProcessing } =
    useOrderStore();

  /**
   * 주문 처리 함수
   */
  const handlePayment = async () => {
    if (!order) {
      return { success: false, error: "주문 정보가 없습니다." };
    }

    setProcessing(true);
    setError(null);

    try {
      if (!validateOrderTotal(order)) {
        throw new Error("주문 금액 계산에 오류가 있습니다.");
      }

      const serverOrderData = OrderAdapter.toServerOrderData(order);
      const serverOrderItemsData = OrderAdapter.toServerOrderItemsData(
        order,
        ""
      );

      const result = await createOrder(serverOrderData, serverOrderItemsData);

      if (!result.success) {
        throw new Error(result.error || "주문 생성에 실패했습니다.");
      }

      const updatedOrder = {
        ...order,
        id: result.orderId!,
        status: "confirmed" as const,
      };

      setOrder(updatedOrder);

      return { success: true, orderId: result.orderId };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "결제 처리 중 오류가 발생했습니다.";

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setProcessing(false);
    }
  };

  return {
    order,
    isProcessing,
    handlePayment,
  };
}
