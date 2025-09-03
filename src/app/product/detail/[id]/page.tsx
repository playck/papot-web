import { notFound } from "next/navigation";
import {
  ProductImageWrapper,
  ProductInfo,
} from "@/feature/product/detail/components";
import { getProduct } from "@/shared/api/server-api";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  // 할인된 가격 계산
  const discountedPrice =
    product?.discountRate && product.discountRate > 0
      ? Math.round(product.price * (1 - product.discountRate / 100))
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 이미지 섹션 */}
        <ProductImageWrapper
          imageUrls={product.imageUrls}
          productName={product.name}
        />

        {/* 제품 정보 섹션 */}
        <div className="space-y-6">
          <ProductInfo
            title={product.name}
            originalPrice={product.price}
            discountedPrice={discountedPrice}
            discountRate={
              product?.discountRate && product.discountRate > 0
                ? product.discountRate
                : undefined
            }
            productId={params.id}
            pointRate={0.1}
            deliveryDate="9/2(화)"
          />
        </div>
      </div>
    </div>
  );
}
