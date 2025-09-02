import {
  ProductImageWrapper,
  ProductInfo,
} from "@/feature/product/detail/components";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // TODO: 실제 제품 데이터를 가져오는 로직 구현 필요
  const mockImageUrls = [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1753660770721-a50a6185efc9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 이미지 섹션 */}
        <ProductImageWrapper
          imageUrls={mockImageUrls}
          productName="[브랜드위크] 화분"
        />

        {/* 제품 정보 섹션 */}
        <div className="space-y-6">
          <ProductInfo
            title="[브랜드위크] 화분"
            originalPrice={30900}
            discountedPrice={25647}
            discountRate={61}
            productId={params.id}
            pointRate={0.1}
            shippingFee={3000}
            shippingThreshold={70000}
            deliveryDate="9/8(일)"
          />
        </div>
      </div>
    </div>
  );
}
