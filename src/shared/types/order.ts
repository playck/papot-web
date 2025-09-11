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

export interface OrderSideBar {
  totalProductPrice: number;
  shippingFee: number;
  couponDiscount: number;
  pointDiscount: number;
  finalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  summary: OrderSideBar;
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

export interface CreateOrderRequest {
  customer: OrderCustomer;
  items: Omit<OrderItem, "id" | "product">[];
  shippingAddress: ShippingAddress;
}
