"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/feature/cart/hooks";
import { ProductDetailInfo, ProductImageWrapper } from "./index";

interface MobileProductDetailViewProps {
  product: {
    id: string;
    imageUrls: string[];
    name: string;
    price: number;
    discountedPrice?: number;
    hasDiscount: boolean;
    discountRate?: number;
    quantity: number;
    detailDescription: string;
  };
  productId: string;
}

export default function MobileProductDetailView({
  product,
  productId,
}: MobileProductDetailViewProps) {
  const { handleAddItemToCart } = useCart();

  const handleAddToCart = () => {
    if (!productId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    handleAddItemToCart("", {
      productId,
      name: product.name,
      price: product.discountedPrice || product.price,
      imageUrl: product.imageUrls[0],
      quantity: 1,
    });

    alert("장바구니에 상품이 추가되었습니다!");
  };

  const handlePurchase = () => {
    // 구매 로직 구현 예정
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 pb-24">
        {/* 상품 이미지 */}
        <div className="mb-6">
          <ProductImageWrapper
            imageUrls={product.imageUrls}
            productName={product.name}
          />
        </div>

        {/* 제목 + 제품 간단정보 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2.5">
            {product.name}
          </h1>

          <div className="space-y-3">
            {/* 가격 정보 */}
            <div className="flex items-center gap-3">
              {product.hasDiscount && product.discountedPrice ? (
                <>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(product.discountedPrice)}원
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}원
                  </span>
                  {product.discountRate && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      {product.discountRate}% 할인
                    </span>
                  )}
                </>
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(product.price)}원
                </span>
              )}
            </div>

            {/* 배송 정보 */}
            <div className="text-sm text-gray-600">
              <p>• 무료배송</p>
            </div>
          </div>
        </div>

        {/* 상세정보 */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded px-4 py-3 shadow-sm border border-primary-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-primary-700 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">상품 상세정보</h2>
          </div>
        </div>

        <div className="bg-white">
          <ProductDetailInfo htmlContent={product.detailDescription} />
        </div>
      </div>

      {/* 하단 플로팅 구매 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* 장바구니 버튼 */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-14 h-12 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>

          {/* 구매 버튼 */}
          <button
            onClick={handlePurchase}
            className="flex-1 h-12 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
