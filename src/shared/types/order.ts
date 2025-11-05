import type { Database } from "../../types/supabase";

export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];
export type DatabaseOrder = Database["public"]["Tables"]["orders"]["Row"];
export type DatabaseOrderItem =
  Database["public"]["Tables"]["order_items"]["Row"];
export type DatabaseProfile = Database["public"]["Tables"]["profiles"]["Row"];

export interface ClientOrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrls: string[];
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  deliveryRequest?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderSummary {
  totalProductPrice: number;
  shippingFee: number;
  couponDiscount: number;
  pointDiscount: number;
  finalPrice: number;
}

export type OrderSideBar = OrderSummary;

export interface ClientOrder {
  id: string;
  orderNumber: string;
  customerId: string | null; // 비회원은 null
  customer: OrderCustomer;
  items: ClientOrderItem[];
  shippingAddress: ShippingAddress;
  summary: OrderSummary;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

export type ServerOrderData = OrderInsert;

export type ServerOrderItemData = OrderItemInsert;

export interface OrderWithUser extends DatabaseOrder {
  order_items: DatabaseOrderItem[];
  profiles: Pick<DatabaseProfile, "user_name" | "email" | "phone"> | null;
}
