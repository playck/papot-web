import { useRouter } from "next/navigation";
import { createOrder, getUserCart, clearCart } from "@/shared/api/client-api";
import { useAuth } from "@/shared/hooks/useAuth";
import { useOrderStore } from "../store/order";
import { OrderAdapter } from "../adapters/OrderAdapter";
import { validateOrderTotal } from "../utils/order";

export function useOrder() {
  const router = useRouter();
  const { order, setOrder, setError, setProcessing } = useOrderStore();
  const { user } = useAuth();

  /**
   * 주문 생성 함수 (결제 완료 후 호출)
   * @param impUid - 포트원 결제 고유번호
   */
  const createOrderAfterPayment = async (impUid: string) => {
    if (!order) {
      return { success: false, error: "주문 정보가 없습니다." };
    }

    setProcessing(true);
    setError(null);

    try {
      if (!validateOrderTotal(order)) {
        throw new Error("주문 금액 계산에 오류가 있습니다.");
      }

      const orderData = OrderAdapter.toServerOrderData(order);
      const orderItemsData = OrderAdapter.toServerOrderItemsData(order, impUid);

      const result = await createOrder(orderData, orderItemsData);

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

      router.push(`/order/complete/${result.orderId}`);

      return { success: true, orderId: result.orderId };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "주문 생성 중 오류가 발생했습니다.";

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setProcessing(false);
    }
  };

  return {
    createOrderAfterPayment,
  };
}
