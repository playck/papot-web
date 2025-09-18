import {
  Cart as DbCart,
  CartItem as DbCartItem,
  CartInsert,
  CartItemInsert,
} from "../../types/supabase";

// 클라이언트에서 사용하는 장바구니 아이템 타입
export interface ClientCartItem {
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

export type CartItem = ClientCartItem;

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemById: (id: string) => CartItem | undefined;
}

export type CartStore = CartState & CartActions;

// 데이터베이스 관련 타입들
export type DatabaseCart = DbCart;
export type DatabaseCartItem = DbCartItem;
export type CreateCartData = CartInsert;
export type CreateCartItemData = CartItemInsert;
