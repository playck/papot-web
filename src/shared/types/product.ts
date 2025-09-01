import { Product as SupabaseProduct } from "@/types/supabase";

export interface Product {
  id: string;
  name: string;
  description?: string;
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

export function mapSupabaseProductToClient(
  supabaseProduct: SupabaseProduct
): Product {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.name,
    description: supabaseProduct.description || undefined,
    price: supabaseProduct.price,
    discountRate: supabaseProduct.discount_rate || undefined,
    quantity: supabaseProduct.quantity,
    isPublished: supabaseProduct.is_published,
    categoryId: supabaseProduct.category_id || undefined,
    badges: supabaseProduct.badges || undefined,
    uploadedBy: supabaseProduct.uploaded_by,
    createdAt: new Date(supabaseProduct.created_at),
    updatedAt: new Date(supabaseProduct.updated_at),
    imageUrls: supabaseProduct.image_urls || [],
  };
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
