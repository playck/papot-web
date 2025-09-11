import { Product } from "@/types/supabase";
import { Product as ProductType } from "@/shared/types/product";

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
 * 상품 상세 정보 어댑터 */
export class ProductDetailAdapter {
  /**
   * ProductData를 클라이언트 Product로 변환 (표시 정보 포함)
   */
  static toClient(data: Product): ProductDetailInfo {
    const baseProduct: ProductType = {
      id: data.id,
      name: data.name,
      description: data.description || undefined,
      detailDescription: data.detail_description || undefined,
      price: data.price,
      discountRate: data.discount_rate || undefined,
      quantity: data.quantity,
      isPublished: data.is_published ?? false,
      categoryId: data.category_id || undefined,
      badges: Array.isArray(data.badges)
        ? data.badges.filter(
            (badge): badge is string => typeof badge === "string"
          )
        : undefined,
      uploadedBy: data.uploaded_by || "",
      createdAt: new Date(data.created_at || new Date()),
      updatedAt: new Date(data.updated_at || new Date()),
      imageUrls: data.image_urls || [],
    };

    // 할인 가격 계산
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
  static toClientList(data: Product[]): ProductDetailInfo[] {
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
