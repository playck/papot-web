import { Product } from "./product";

export interface OrderItem {
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

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: OrderCustomer;
  items: OrderItem[];
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
  items: Omit<OrderItem, "id" | "product">[];
  shippingAddress: ShippingAddress;
}

// 서버로 전송할 주문 데이터 타입
export interface ServerOrderData {
  order_number: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  shipping_detail_address: string;
  shipping_zip_code: string;
  delivery_request?: string;
  total_product_price: number;
  shipping_fee: number;
  coupon_discount: number;
  point_discount: number;
  final_price: number;
  status: "pending";
}

// 서버로 전송할 주문 아이템 데이터 타입
export interface ServerOrderItemData {
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image_url?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}
