"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import Counter from "@/shared/components/Counter";
import useShare from "@/shared/hooks/useShare";
import { usePurchase } from "@/shared/hooks/usePurchase";
import { formatKoreanPrice } from "@/shared/utils/price";
import AddToCartButton from "./AddToCartButton";

interface ProductActionsProps {
  title: string;
  productId?: string;
  price?: number;
  imageUrl?: string;
  showPurchaseSection?: boolean;
}

export default function ProductActions({
  title,
  productId,
  price,
  imageUrl,
  showPurchaseSection = false,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { share } = useShare();
  const { buyNow } = usePurchase();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleBuyNow = () => {
    if (!productId || !price) return;

    buyNow({
      productId,
      productName: title,
      price,
      quantity,
      imageUrl,
    });
  };

  if (!showPurchaseSection) {
    // 헤더 액션 버튼들만 렌더링
    return (
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => share({ title })}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="공유하기"
        >
          <Share2 className="w-6 h-6 text-neutral-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-6 border-t border-neutral-200">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-neutral-900">수량</span>
        <Counter
          initialQuantity={1}
          minQuantity={1}
          maxQuantity={99}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      <div className="flex items-center justify-between py-3 bg-neutral-50 rounded-lg px-4">
        <span className="text-lg font-medium text-neutral-700">
          총 상품금액
        </span>
        <div className="text-right">
          <span className="text-2xl font-bold text-neutral-900">
            {price ? formatKoreanPrice(price * quantity) : "0"}
          </span>
          <span className="text-lg text-neutral-600 ml-1">원</span>
        </div>
      </div>

      <div className="flex gap-3">
        <AddToCartButton
          productId={productId}
          title={title}
          price={price || 0}
          imageUrl={imageUrl}
          quantity={quantity}
          className="flex-1"
        />

        <button
          onClick={handleBuyNow}
          className="flex-1 py-4 px-6 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}
