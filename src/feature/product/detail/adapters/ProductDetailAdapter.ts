import type { Database } from "@/types/supabase";
import { Product as ProductType } from "@/shared/types/product";
import { ProductAdapter } from "./ProductAdapter";

type DatabaseProduct = Database["public"]["Tables"]["products"]["Row"];

/**
 * 상품 상세 표시 정보 타입
 */
export interface ProductDetailInfo extends ProductType {
  discountedPrice: number;
  hasDiscount: boolean;
  formattedPrice: string;
  formattedDiscountedPrice: string | null;
}

/**
 * 상품 상세 정보 어댑터
 */
export class ProductDetailAdapter {
  /**
   * ProductData를 클라이언트 Product로 변환
   */
  static toClient(data: DatabaseProduct): ProductDetailInfo {
    const baseProduct = ProductAdapter.toClient(data);
    const discountedPrice = this.calculateDiscountedPrice(baseProduct);

    return {
      ...baseProduct,
      discountedPrice,
      hasDiscount: discountedPrice > 0,
      formattedPrice: baseProduct.price.toLocaleString(),
      formattedDiscountedPrice:
        discountedPrice > 0 ? discountedPrice.toLocaleString() : null,
    };
  }

  /**
   * 상품 목록 변환
   */
  static toClientList(data: DatabaseProduct[]): ProductDetailInfo[] {
    return data.map(this.toClient);
  }

  /**
   * 할인된 가격 계산
   */
  private static calculateDiscountedPrice(product: ProductType): number {
    const noDiscountPrice = !product.discountRate || product.discountRate <= 0;
    if (noDiscountPrice) {
      return 0;
    }
    return Math.round(product.price * (1 - product.discountRate! / 100));
  }
}
