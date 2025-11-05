import { useRouter } from "next/navigation";
import { formatKoreanPrice } from "@/shared/utils/price";
import { useAuth } from "@/shared/hooks/useAuth";
import { useCart } from "@/feature/cart/hooks";
import { useOrderStore } from "@/feature/order/store/order";

export default function CartSummary() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalItems, totalPrice } = useCart();
  const { createDirectOrder } = useOrderStore();

  const deliveryFee = totalPrice >= 80000 ? 0 : 3000;
  const finalTotal = totalPrice + deliveryFee;

  const handleOrderClick = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/signin");
      return;
    }

    if (items.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    const orderItems = items.map((item) => ({
      productId: item.productId,
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    createDirectOrder({
      orderNumber: `ORDER-${Date.now()}`,
      items: orderItems,
      totalAmount: totalPrice,
      shippingFee: deliveryFee,
      userId: user.id,
    });

    router.push("/order");
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">상품 개수</span>
          <span className="text-gray-900">{totalItems}개</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">상품 금액</span>
          <span className="text-gray-900">
            {formatKoreanPrice(totalPrice)}원
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">배송비</span>
          <span className="text-gray-900">
            {deliveryFee === 0 ? "무료" : `${formatKoreanPrice(deliveryFee)}원`}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">총 결제 금액</span>
          <span className="text-gray-900">
            {formatKoreanPrice(finalTotal)}원
          </span>
        </div>
      </div>

      <button
        onClick={handleOrderClick}
        disabled={items.length === 0}
        className="w-full mt-6 bg-primary-600 text-white py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        주문하기
      </button>
    </div>
  );
}
