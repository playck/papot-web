import { ClientOrder } from "@/shared/types/order";

/**
 * 주문 상태를 한글로 변환하는 함수
 */
export function getOrderStatusText(status: ClientOrder["status"]): string {
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

/**
 * 주문 총액 계산을 검증하는 함수
 */
export function validateOrderTotal(order: ClientOrder): boolean {
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
