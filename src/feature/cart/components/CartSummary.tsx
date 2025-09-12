import { formatKoreanPrice } from "@/shared/utils/price";
import { useCartStore } from "@/feature/cart/store/cart";

export default function CartSummary() {
  const { totalItems, totalPrice } = useCartStore();

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000; // 5만원 이상 무료배송
  const finalTotal = totalPrice + deliveryFee;

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

      <button className="w-full mt-6 bg-primary-600 text-white py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
        주문하기
      </button>
    </div>
  );
}
