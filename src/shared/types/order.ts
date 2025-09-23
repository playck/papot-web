import { Product } from "./product";
import {
  Order as DbOrder,
  OrderItem as DbOrderItem,
  OrderInsert,
  OrderItemInsert,
} from "../../types/supabase";

export interface ClientOrderItem {
  id: string;
  productId: string;
  product: Product;
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
  customerId: string;
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

// API 요청/응답 타입들
export interface CreateOrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderData {
  customerId: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: CreateOrderItem[];
  shippingAddress: ShippingAddress;
  summary: OrderSummary;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

export interface CreateOrderRequest {
  customer: OrderCustomer;
  items: Omit<ClientOrderItem, "id" | "product">[];
  shippingAddress: ShippingAddress;
}

export type ServerOrderData = OrderInsert;

export type ServerOrderItemData = OrderItemInsert;
