"use client";

import { Bookmark, Share2, Package, Heart } from "lucide-react";
import { useState } from "react";
import Counter from "@/shared/components/Counter";
import useShare from "@/shared/hooks/useShare";
import { formatKoreanPrice } from "@/shared/utils/price";
import AddToCartButton from "./AddToCartButton";

interface ProductInfoProps {
  title: string;
  originalPrice: number;
  discountedPrice?: number;
  discountRate?: number;
  productId?: string;
  pointRate?: number;
  shippingFee?: number;
  shippingThreshold?: number;
  deliveryDate?: string;
  imageUrl?: string;
}

export default function ProductInfo({
  title,
  originalPrice,
  discountedPrice,
  discountRate,
  productId,
  pointRate = 1,
  shippingFee = 3000,
  shippingThreshold = 70000,
  deliveryDate = "9/8(일)",
  imageUrl,
}: ProductInfoProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { share } = useShare();

  const handleBookmarkClick = async () => {
    try {
      // TODO: 실제 북마크 API 호출
      setBookmarked(!bookmarked);
      console.log(`북마크 ${!bookmarked ? "추가" : "제거"}: ${productId}`);
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleBuyNow = () => {
    console.log(`바로 구매: ${productId}, 수량: ${quantity}개`);
    // TODO: 실제 구매 페이지로 이동
  };

  const hasDiscount = discountedPrice && discountedPrice < originalPrice;
  const finalPrice = hasDiscount ? discountedPrice! : originalPrice;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleBookmarkClick}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
          >
            <Bookmark
              className={`w-6 h-6 ${
                bookmarked
                  ? "text-primary-600 fill-primary-600"
                  : "text-neutral-600"
              }`}
            />
          </button>

          <button
            onClick={() => share({ title })}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="공유하기"
          >
            <Share2 className="w-6 h-6 text-neutral-600" />
          </button>
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="space-y-2">
        {hasDiscount && discountRate && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-neutral-400 line-through">
              {formatKoreanPrice(originalPrice)}원
            </span>
            <span className="px-2 py-1 bg-primary-600 text-white text-sm font-medium rounded">
              {discountRate}%
            </span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-bold text-neutral-900">
            {formatKoreanPrice(hasDiscount ? discountedPrice! : originalPrice)}
          </span>
          <span className="text-xl text-neutral-600">원</span>
          {hasDiscount && (
            <span className="text-lg text-primary-600 font-medium">
              쿠폰적용시
            </span>
          )}
        </div>
      </div>

      {/* 혜택 정보 */}
      <div className="space-y-3 pt-5 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">혜택</span>
          <span className="text-sm font-medium text-primary-600">
            {pointRate}P 적립 (WELCOME 0.1% 적립)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">배송</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-neutral-900">
              {formatKoreanPrice(shippingFee)}원
            </span>
            <span className="text-xs text-neutral-500">
              ({formatKoreanPrice(shippingThreshold)}원 이상 구매시 무료배송)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">일반배송</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg">
            <Package className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-600">
              {deliveryDate} 도착 예정
            </span>
            <div className="w-4 h-4 rounded-full bg-neutral-300 flex items-center justify-center ml-1">
              <span className="text-xs text-neutral-600">i</span>
            </div>
          </div>
        </div>
      </div>

      {/* 수량 선택 및 구매 버튼 */}
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
              {formatKoreanPrice(finalPrice * quantity)}
            </span>
            <span className="text-lg text-neutral-600 ml-1">원</span>
          </div>
        </div>

        <div className="flex gap-3">
          <AddToCartButton
            productId={productId}
            title={title}
            price={finalPrice}
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

        <button
          onClick={handleBookmarkClick}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 ${
              bookmarked ? "text-red-500 fill-red-500" : "text-neutral-600"
            }`}
          />
          {bookmarked ? "찜 해제" : "찜하기"}
        </button>
      </div>
    </div>
  );
}
