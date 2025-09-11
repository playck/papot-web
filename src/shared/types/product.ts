import { Product as SupabaseProduct } from "@/types/supabase";

export interface Product {
  id: string;
  name: string;
  description?: string;
  detailDescription?: string;
  price: number;
  discountRate?: number;
  quantity: number;
  isPublished: boolean;
  categoryId?: number;
  badges?: string[];
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];
}

export interface ProductListParams {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}

// ProductData를 클라이언트 Product로 변환하는 함수
export function convertProductDataToClient(
  supabaseProduct: SupabaseProduct
): Product {
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
