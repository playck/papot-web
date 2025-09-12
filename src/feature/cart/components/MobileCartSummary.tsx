import { formatKoreanPrice } from "@/shared/utils/price";
import { useCartStore } from "@/feature/cart/store/cart";

export default function MobileCartSummary() {
  const { totalPrice } = useCartStore();

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000; // 5만원 이상 무료배송
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">총 결제 금액</span>
        <span className="text-xl font-bold text-gray-900">
          {formatKoreanPrice(finalTotal)}원
        </span>
      </div>

      <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
        주문하기
      </button>
    </div>
  );
}
