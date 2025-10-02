import {
  ClientOrder,
  OrderWithUser,
  ServerOrderData,
  ServerOrderItemData,
} from "@/shared/types/order";

/**
 * 주문 데이터 변환 어댑터
 */
export class OrderAdapter {
  /**
   * 데이터베이스 주문 데이터를 ClientOrder로 변환
   */
  static toClientOrder(order: OrderWithUser): ClientOrder {
    const profile = order.profiles || {
      user_name: "",
      email: "",
      phone: "",
    };

    return {
      id: order.id,
      orderNumber: order.order_number,
      customerId: order.customer_id,
      customer: {
        name: profile.user_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      },
      items: (order.order_items || []).map((item) => ({
        id: item.id,
        productId: item.product_id,
        product: {
          id: item.product_id,
          name: item.product_name,
          price: item.product_price,
          imageUrls: item.product_image_url ? [item.product_image_url] : [],
        },
        quantity: item.quantity,
        unitPrice: item.unit_price,
        totalPrice: item.total_price,
      })),
      shippingAddress: {
        recipientName: order.recipient_name,
        phone: order.recipient_phone,
        address: order.shipping_address,
        detailAddress: order.shipping_detail_address || "",
        zipCode: order.shipping_zip_code,
        deliveryRequest: order.delivery_request || "",
      },
      summary: {
        totalProductPrice: order.total_product_price,
        shippingFee: order.shipping_fee,
        couponDiscount: order.coupon_discount,
        pointDiscount: order.point_discount,
        finalPrice: order.final_price,
      },
      status: order.status as ClientOrder["status"],
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at),
    };
  }

  /**
   * 데이터베이스 주문 목록을 ClientOrder 배열로 변환
   */
  static toClientOrders(orders: OrderWithUser[]): ClientOrder[] {
    return orders?.map((order) => this.toClientOrder(order));
  }

  /**
   * 주문 번호 생성
   */
  static generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");

    return `ORD-${year}${month}${day}-${random}`;
  }

  /**
   * ClientOrder를 서버 전송용 데이터로 변환
   */
  static toServerOrderData(order: ClientOrder): ServerOrderData {
    return {
      order_number: order.orderNumber,
      customer_id: order.customerId,
      recipient_name: order.shippingAddress.recipientName,
      recipient_phone: order.shippingAddress.phone,
      shipping_address: order.shippingAddress.address,
      shipping_detail_address: order.shippingAddress.detailAddress,
      shipping_zip_code: order.shippingAddress.zipCode,
      delivery_request: order.shippingAddress.deliveryRequest,
      total_product_price: order.summary.totalProductPrice,
      shipping_fee: order.summary.shippingFee,
      coupon_discount: order.summary.couponDiscount,
      point_discount: order.summary.pointDiscount,
      final_price: order.summary.finalPrice,
      status: "pending" as const,
    };
  }

  /**
   * ClientOrder의 items를 서버 전송용 데이터로 변환
   */
  static toServerOrderItemsData(
    order: ClientOrder,
    orderId: string
  ): ServerOrderItemData[] {
    return order.items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.product.name,
      product_price: item.product.price,
      product_image_url: item.product.imageUrls?.[0],
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
    }));
  }
}
