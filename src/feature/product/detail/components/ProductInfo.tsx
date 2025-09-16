import { Package } from "lucide-react";
import { formatKoreanPrice } from "@/shared/utils/price";
import ProductActions from "./ProductActions";

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
  const hasDiscount = discountedPrice && discountedPrice < originalPrice;
  const finalPrice = hasDiscount ? discountedPrice! : originalPrice;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
          {title}
        </h1>
        <ProductActions title={title} productId={productId} />
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

      {/* 구매 액션 */}
      <ProductActions
        productId={productId}
        title={title}
        price={finalPrice}
        imageUrl={imageUrl}
        showPurchaseSection={true}
      />
    </div>
  );
}
