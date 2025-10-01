import { createOrder, getUserCart, clearCart } from "@/shared/api/client-api";
import { useAuth } from "@/shared/hooks/useAuth";
import { useOrderStore } from "../store/order";
import { OrderAdapter } from "../adapters/OrderAdapter";
import { validateOrderTotal } from "../utils/order";

export function useOrder() {
  const { order, setOrder, setError, setProcessing } = useOrderStore();
  const { user } = useAuth();

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

      // 주문 완료 후 장바구니 비우기
      if (user?.id) {
        const userCart = await getUserCart(user.id);

        if (userCart?.id) {
          await clearCart(userCart.id);
        }
      }

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
    handlePayment,
  };
}
