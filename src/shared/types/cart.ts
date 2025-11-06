import type { Database } from "../../types/supabase";

type DbCart = Database["public"]["Tables"]["carts"]["Row"];
type DbCartItem = Database["public"]["Tables"]["cart_items"]["Row"];
type CartInsert = Database["public"]["Tables"]["carts"]["Insert"];
type CartItemInsert = Database["public"]["Tables"]["cart_items"]["Insert"];

// 장바구니 아이템 타입
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  selectedOptions?: {
    color?: string;
    size?: string;
  };
}

// 데이터베이스 관련 타입
export type DatabaseCart = DbCart;
export type DatabaseCartItem = DbCartItem;
export type CreateCartData = CartInsert;
export type CreateCartItemData = CartItemInsert;
