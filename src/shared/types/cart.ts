import {
  Cart as DbCart,
  CartItem as DbCartItem,
  CartInsert,
  CartItemInsert,
} from "../../types/supabase";

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
