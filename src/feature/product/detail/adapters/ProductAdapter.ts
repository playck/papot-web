import type { Database } from "@/types/supabase";
import { Product } from "@/shared/types/product";

type DatabaseProduct = Database["public"]["Tables"]["products"]["Row"];

/**
 * 상품 데이터 변환 어댑터
 */
export class ProductAdapter {
  /**
   * 데이터베이스 상품 데이터를 클라이언트 Product로 변환
   */
  static toClient(supabaseProduct: DatabaseProduct): Product {
    return {
      id: supabaseProduct.id,
      name: supabaseProduct.name,
      description: supabaseProduct.description || undefined,
      detailDescription: supabaseProduct.detail_description || undefined,
      price: supabaseProduct.price,
      discountRate: supabaseProduct.discount_rate || undefined,
      quantity: supabaseProduct.quantity,
      isPublished: supabaseProduct.is_published ?? false,
      categoryId: supabaseProduct.category_id || undefined,
      badges: Array.isArray(supabaseProduct.badges)
        ? supabaseProduct.badges.filter(
            (badge): badge is string => typeof badge === "string"
          )
        : undefined,
      uploadedBy: supabaseProduct.uploaded_by ?? "",
      createdAt: new Date(supabaseProduct.created_at ?? new Date()),
      updatedAt: new Date(supabaseProduct.updated_at ?? new Date()),
      imageUrls: supabaseProduct.image_urls || [],
    };
  }

  /**
   * 데이터베이스 상품 목록을 클라이언트 Product 배열로 변환
   */
  static toClientList(supabaseProducts: DatabaseProduct[]): Product[] {
    return supabaseProducts.map((product) => this.toClient(product));
  }
}
