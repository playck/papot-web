import { createClient } from "@/services/supabase/server";
import {
  ProductListParams,
  ProductListResponse,
  convertProductDataToClient,
} from "../types/product";
import { Product as SupabaseProduct } from "@/types/supabase";

// 상품 목록 조회
export async function getProducts(
  params: ProductListParams = {}
): Promise<ProductListResponse> {
  const supabase = await createClient();

  const {
    category,
    search,
    limit = 20,
    offset = 0,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_published", true);

  // 카테고리 필터
  if (category) {
    query = query.eq("category_id", parseInt(category));
  }

  // 검색 필터
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // 정렬
  const dbSortBy = sortBy === "createdAt" ? "created_at" : sortBy;
  query = query.order(dbSortBy, { ascending: sortOrder === "asc" });

  // 페이지네이션 쿼리
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("상품 목록 조회 실패:", error.message);
    return {
      products: [],
      total: 0,
      hasMore: false,
    };
  }

  const products = (data || []).map((item: SupabaseProduct) =>
    convertProductDataToClient(item)
  );

  return {
    products,
    total: count || 0,
    hasMore: offset + limit < (count || 0),
  };
}

// 상품 상세 조회
export async function getProduct(id: string): Promise<SupabaseProduct | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error) {
    // 상품을 찾을 수 없음
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("상품 조회 실패:", error.message);
    return null;
  }

  return data as SupabaseProduct;
}

// 카테고리 목록 조회
export async function getCategories(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_published", true)
    .not("category", "is", null);

  if (error) {
    console.error("카테고리 목록 조회 실패:", error.message);
    return [];
  }

  const categories = [...new Set(data.map((item) => item.category))].sort();
  return categories;
}
