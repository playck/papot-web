"use client";

import { ProductDetailInfo, ProductImageWrapper, ProductInfo } from "./index";

interface ProductDetailClientProps {
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

export default function ProductDetailClient({
  product,
  productId,
}: ProductDetailClientProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 왼쪽: 이미지 + 상세정보 */}
      <div className="space-y-12">
        <ProductImageWrapper
          imageUrls={product.imageUrls}
          productName={product.name}
        />

        {/* 상세 정보 섹션 */}
        <div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded px-6 py-3 shadow-sm border border-primary-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-primary-700 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">
                상품 상세정보
              </h2>
            </div>
          </div>

          <div className="bg-white">
            <ProductDetailInfo htmlContent={product.detailDescription} />
          </div>
        </div>
      </div>

      {/* 오른쪽: 제품 구매정보 */}
      <div className="sticky top-24 self-start">
        <ProductInfo
          title={product.name}
          originalPrice={product.price}
          discountedPrice={product.discountedPrice}
          discountRate={product.hasDiscount ? product.discountRate : undefined}
          productId={productId}
          pointRate={0.1}
          deliveryDate="9/2(화)"
        />
      </div>
    </div>
  );
}
