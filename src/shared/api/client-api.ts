"use client";

import { supabase } from "@/services/supabase/client";
import {
  Product,
  ProductListParams,
  ProductListResponse,
  convertProductDataToClient,
} from "../types/product";
import { ClientOrder } from "../types/order";
import { Product as SupabaseProduct } from "@/types/supabase";
import {
  CreateOrderResponse,
  ServerOrderData,
  ServerOrderItemData,
} from "../types/order";

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
export async function getUserOrders(userId: string): Promise<ClientOrder[]> {
  // 실제 API 구현 전까지 Mock 데이터 사용
  return new Promise<ClientOrder[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "order-1",
          orderNumber: "2024091201",
          customerId: userId,
          customer: {
            name: "홍길동",
            email: "hong@example.com",
            phone: "010-1234-5678",
          },
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
                quantity: 100,
                isPublished: true,
                uploadedBy: "admin",
                createdAt: new Date("2024-01-01"),
                updatedAt: new Date("2024-01-01"),
              },
              quantity: 2,
              unitPrice: 25000,
              totalPrice: 50000,
            },
          ],
          shippingAddress: {
            recipientName: "홍길동",
            phone: "010-1234-5678",
            address: "서울시 강남구 테헤란로 123",
            detailAddress: "456호",
            zipCode: "12345",
            deliveryRequest: "문 앞에 놓아주세요",
          },
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
          customer: {
            name: "김영희",
            email: "kim@example.com",
            phone: "010-9876-5432",
          },
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
                quantity: 50,
                isPublished: true,
                uploadedBy: "admin",
                createdAt: new Date("2024-01-01"),
                updatedAt: new Date("2024-01-01"),
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
                quantity: 30,
                isPublished: true,
                uploadedBy: "admin",
                createdAt: new Date("2024-01-01"),
                updatedAt: new Date("2024-01-01"),
              },
              quantity: 3,
              unitPrice: 4500,
              totalPrice: 13500,
            },
          ],
          shippingAddress: {
            recipientName: "김영희",
            phone: "010-9876-5432",
            address: "부산시 해운대구 해운대로 456",
            detailAddress: "789호",
            zipCode: "67890",
            deliveryRequest: "경비실에 맡겨주세요",
          },
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
    .eq("id", userId);

  if (error) {
    throw new Error(`프로필 조회 실패: ${error.message}`);
  }

  return data && data.length > 0 ? data[0] : null;
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

// 주문 생성
export async function createOrder(
  orderData: ServerOrderData,
  orderItemsData: ServerOrderItemData[]
): Promise<CreateOrderResponse> {
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
      // 주문 생성은 성공했지만 아이템 추가 실패 시 주문 삭제
      await supabase.from("orders").delete().eq("id", orderId);
      return { success: false, error: itemsError.message };
    }

    return { success: true, orderId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "주문 생성 실패",
    };
  }
}

// =====================================================
// 장바구니 API 함수들
// =====================================================

import {
  CreateCartData,
  CreateCartItemData,
  DatabaseCart,
  DatabaseCartItem,
} from "../types/cart";
import { supabase as supabaseClient } from "@/services/supabase/client";

/**
 * 사용자의 장바구니 조회
 */
export async function getUserCart(
  userId: string
): Promise<DatabaseCart | null> {
  const supabase = supabaseClient;

  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("장바구니 조회 실패:", error);
    return null;
  }

  return data; // 없으면 null, 있으면 데이터 반환
}

/**
 * 장바구니 생성
 */
export async function createUserCart(
  userId: string
): Promise<DatabaseCart | null> {
  const supabase = supabaseClient;

  const cartData: CreateCartData = {
    user_id: userId,
    total_amount: 0,
    total_quantity: 0,
  };

  const { data, error } = await supabase
    .from("carts")
    .insert(cartData)
    .select()
    .single();

  if (error) {
    console.error("장바구니 생성 실패:", error);
    return null;
  }

  return data;
}

/**
 * 장바구니 아이템들 조회
 */
export async function getCartItems(
  cartId: string
): Promise<DatabaseCartItem[]> {
  const supabase = supabaseClient;

  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId);

  if (error) {
    console.error("장바구니 아이템 조회 실패:", error);
    return [];
  }

  return data || [];
}

/**
 * 장바구니에 아이템 추가
 */
export async function addItemToCart(
  cartId: string,
  productId: string,
  productName: string,
  productImage: string | null,
  unitPrice: number,
  quantity: number
): Promise<DatabaseCartItem | null> {
  const supabase = supabaseClient;

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    return await updateCartItemQuantity(
      existingItem.id,
      existingItem.quantity + quantity
    );
  }

  // 새 아이템 추가
  const itemData: CreateCartItemData = {
    cart_id: cartId,
    product_id: productId,
    product_name: productName,
    product_image: productImage,
    quantity,
    unit_price: unitPrice,
    total_price: unitPrice * quantity,
  };

  const { data, error } = await supabase
    .from("cart_items")
    .insert(itemData)
    .select()
    .single();

  if (error) {
    console.error("장바구니 아이템 추가 실패:", error);
    return null;
  }

  await updateCartTotals(cartId);

  return data;
}

/**
 * 장바구니 아이템 수량 업데이트
 */
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<DatabaseCartItem | null> {
  const supabase = supabaseClient;

  if (quantity <= 0) {
    await removeCartItem(itemId);
    return null;
  }

  const { data: item } = await supabase
    .from("cart_items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (!item) return null;

  const { data, error } = await supabase
    .from("cart_items")
    .update({
      quantity,
      total_price: item.unit_price * quantity,
    })
    .eq("id", itemId)
    .select()
    .single();

  if (error) {
    console.error("장바구니 아이템 수량 업데이트 실패:", error);
    return null;
  }

  await updateCartTotals(item.cart_id);

  return data;
}

/**
 * 장바구니 아이템 삭제
 */
export async function removeCartItem(itemId: string): Promise<boolean> {
  const supabase = supabaseClient;

  const { data: item } = await supabase
    .from("cart_items")
    .select("cart_id")
    .eq("id", itemId)
    .single();

  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) {
    console.error("장바구니 아이템 삭제 실패:", error);
    return false;
  }

  if (item) {
    await updateCartTotals(item.cart_id);
  }

  return true;
}

/**
 * 장바구니 비우기
 */
export async function clearCart(cartId: string): Promise<boolean> {
  const supabase = supabaseClient;

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) {
    console.error("장바구니 비우기 실패:", error);
    return false;
  }

  await updateCartTotals(cartId);

  return true;
}

/**
 * 장바구니 총계 업데이트
 */
async function updateCartTotals(cartId: string): Promise<void> {
  const supabase = supabaseClient;

  // 장바구니 아이템들의 총합 계산
  const { data: items } = await supabase
    .from("cart_items")
    .select("quantity, total_price")
    .eq("cart_id", cartId);

  const totalQuantity =
    items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalAmount =
    items?.reduce((sum, item) => sum + item.total_price, 0) || 0;

  await supabase
    .from("carts")
    .update({
      total_quantity: totalQuantity,
      total_amount: totalAmount,
    })
    .eq("id", cartId);
}
