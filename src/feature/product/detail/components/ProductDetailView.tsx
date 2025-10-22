import MobileProductDetailView from "./MobileProductDetailView";
import DesktopProductDetailView from "./DesktopProductDetailView";

interface ProductDetailViewProps {
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

export default function ProductDetailView({
  product,
  productId,
}: ProductDetailViewProps) {
  return (
    <>
      {/* 모바일 뷰 */}
      <div className="block lg:hidden">
        <MobileProductDetailView product={product} productId={productId} />
      </div>

      {/* 데스크톱 뷰 */}
      <div className="hidden lg:block">
        <DesktopProductDetailView product={product} productId={productId} />
      </div>
    </>
  );
}
