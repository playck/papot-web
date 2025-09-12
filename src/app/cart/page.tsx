"use client";

import {
  CartItem,
  CartSummary,
  EmptyCart,
  MobileCartSummary,
} from "@/feature/cart/components";
import { useCartStore } from "@/feature/cart/store/cart";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-32 lg:pb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-8 flex items-center gap-2">
          🛒 장바구니
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 아이템 목록 */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  상품 목록 ({items.length}개)
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  전체 삭제
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isLast={index === items.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 주문 요약 - 데스크톱: 사이드바 */}
          <div className="lg:col-span-1">
            {/* 데스크톱 버전 */}
            <div className="hidden lg:block sticky top-8">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 주문 요약 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <MobileCartSummary />
        </div>
      </div>
    </div>
  );
}
