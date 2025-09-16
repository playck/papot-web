import { createClient } from "@/services/supabase/server";
import { Product as SupabaseProduct } from "@/types/supabase";
import {
  ProductListParams,
  ProductListResponse,
  convertProductDataToClient,
} from "../types/product";
import {
  ServerOrderData,
  ServerOrderItemData,
  CreateOrderResponse,
} from "../types/order";

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

// 주문 생성
export async function createOrder(
  orderData: ServerOrderData,
  orderItemsData: ServerOrderItemData[]
): Promise<CreateOrderResponse> {
  const supabase = await createClient();

  try {
    const { data: orderResult, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select("id")
      .single();

    if (orderError) {
      return { success: false, error: orderError.message };
    }

    const orderId = orderResult.id;

    // 주문 아이템들에 orderId 추가
    const itemsWithOrderId = orderItemsData.map((item) => ({
      ...item,
      order_id: orderId,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsWithOrderId);

    if (itemsError) {
      // 주문 생성은 성공했지만 아이템 생성 실패 시 주문 삭제
      await supabase.from("orders").delete().eq("id", orderId);

      return { success: false, error: itemsError.message };
    }

    return { success: true, orderId };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "주문 생성 중 오류가 발생했습니다.",
    };
  }
}
