"use client";

import { supabase } from "@/services/supabase/client";
import {
  Product,
  ProductListParams,
  ProductListResponse,
  convertProductDataToClient,
} from "../types/product";
import { Product as SupabaseProduct } from "@/types/supabase";

// 상품 목록 조회
export async function getProducts(
  params: ProductListParams = {}
): Promise<ProductListResponse> {
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

  // 페이지네이션
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`상품 목록 조회 실패: ${error.message}`);
  }

  const products: Product[] = (data || []).map((item: SupabaseProduct) =>
    convertProductDataToClient(item)
  );

  return {
    products,
    total: count || 0,
    hasMore: offset + limit < (count || 0),
  };
}

// 상품 상세 조회
export async function getProduct(id: string): Promise<Product | null> {
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
    throw new Error(`상품 조회 실패: ${error.message}`);
  }

  return convertProductDataToClient(data as SupabaseProduct);
}

// 카테고리 목록 조회
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_published", true)
    .not("category", "is", null);

  if (error) {
    throw new Error(`카테고리 목록 조회 실패: ${error.message}`);
  }

  const categories = [...new Set(data.map((item) => item.category))].sort();
  return categories;
}

// 주문 목록 조회 (임시 Mock 데이터)
export async function getUserOrders(userId: string) {
  // 실제 API 구현 전까지 Mock 데이터 사용
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "order-1",
          orderNumber: "2024091201",
          customerId: userId,
          status: "delivered",
          createdAt: new Date("2024-09-01"),
          updatedAt: new Date("2024-09-05"),
          items: [
            {
              id: "item-1",
              productId: "1",
              product: {
                id: "1",
                name: "프리미엄 유기농 쌀",
                price: 25000,
                imageUrls: ["/images/rice.jpg"],
              },
              quantity: 2,
              unitPrice: 25000,
              totalPrice: 50000,
            },
          ],
          summary: {
            totalProductPrice: 50000,
            shippingFee: 3000,
            couponDiscount: 0,
            pointDiscount: 0,
            finalPrice: 53000,
          },
        },
        {
          id: "order-2",
          orderNumber: "2024090801",
          customerId: userId,
          status: "shipped",
          createdAt: new Date("2024-08-28"),
          updatedAt: new Date("2024-09-01"),
          items: [
            {
              id: "item-2",
              productId: "2",
              product: {
                id: "2",
                name: "신선한 계란",
                price: 8000,
                imageUrls: ["/images/eggs.jpg"],
              },
              quantity: 1,
              unitPrice: 8000,
              totalPrice: 8000,
            },
            {
              id: "item-3",
              productId: "3",
              product: {
                id: "3",
                name: "유기농 우유",
                price: 4500,
                imageUrls: ["/images/milk.jpg"],
              },
              quantity: 3,
              unitPrice: 4500,
              totalPrice: 13500,
            },
          ],
          summary: {
            totalProductPrice: 21500,
            shippingFee: 3000,
            couponDiscount: 1500,
            pointDiscount: 0,
            finalPrice: 23000,
          },
        },
      ]);
    }, 500);
  });
}

// 사용자 프로필 정보 조회
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`프로필 조회 실패: ${error.message}`);
  }

  return data;
}

// 유저 정보 업데이트
export interface UpdateProfileData {
  user_name?: string;
  phone?: string;
}

export async function updateUserProfile(
  userId: string,
  profileData: UpdateProfileData
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(`프로필 업데이트 실패: ${error.message}`);
  }

  return data;
}
