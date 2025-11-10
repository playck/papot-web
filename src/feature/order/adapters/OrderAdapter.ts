import {
  ClientOrder,
  OrderWithUser,
  ServerOrderData,
  ServerOrderItemData,
  DatabaseOrderItem,
} from "@/shared/types/order";

/**
 * 주문 데이터 변환 어댑터
 */
export class OrderAdapter {
  /**
   * 주문 필수 필드 검증
   */
  private static validateOrder(order: OrderWithUser): void {
    if (!order) {
      throw new Error("주문 데이터가 없습니다.");
    }
    if (!order.id) {
      throw new Error("주문 ID가 없습니다.");
    }
    if (!order.order_number) {
      throw new Error("주문 번호가 없습니다.");
    }
    if (!order.recipient_name) {
      throw new Error("수령인 이름이 없습니다.");
    }
    if (!order.recipient_phone) {
      throw new Error("수령인 연락처가 없습니다.");
    }
    if (!order.shipping_address) {
      throw new Error("배송 주소가 없습니다.");
    }
    if (!order.shipping_zip_code) {
      throw new Error("우편번호가 없습니다.");
    }
    if (
      order.total_product_price === null ||
      order.total_product_price === undefined
    ) {
      throw new Error("상품 총액이 없습니다.");
    }
    if (order.final_price === null || order.final_price === undefined) {
      throw new Error("최종 결제 금액이 없습니다.");
    }
    if (!order.status) {
      throw new Error("주문 상태가 없습니다.");
    }
    if (!order.created_at) {
      throw new Error("주문 생성일이 없습니다.");
    }
  }

  /**
   * 주문 아이템 필수 필드 검증
   */
  private static validateOrderItem(item: DatabaseOrderItem): void {
    if (!item.id) {
      throw new Error("주문 아이템 ID가 없습니다.");
    }
    if (!item.product_id) {
      throw new Error("상품 ID가 없습니다.");
    }
    if (!item.product_name) {
      throw new Error("상품명이 없습니다.");
    }
    if (item.quantity === null || item.quantity === undefined) {
      throw new Error("수량이 없습니다.");
    }
    if (item.unit_price === null || item.unit_price === undefined) {
      throw new Error("단가가 없습니다.");
    }
    if (item.total_price === null || item.total_price === undefined) {
      throw new Error("총액이 없습니다.");
    }
  }

  /**
   * 데이터베이스 주문 데이터를 ClientOrder로 변환
   */
  static toClientOrder(order: OrderWithUser): ClientOrder {
    this.validateOrder(order);

    const isGuest = !order.customer_id || !order.profiles;

    const profile = order.profiles || {
      user_name: "",
      email: "",
      phone: "",
    };

    return {
      id: order.id,
      orderNumber: order.order_number,
      customerId: order.customer_id || null,
      customer: {
        name: isGuest
          ? order.recipient_name
          : profile.user_name || order.recipient_name,
        email: isGuest ? order.guest_email || "" : profile.email || "",
        phone: isGuest
          ? order.recipient_phone
          : profile.phone || order.recipient_phone,
      },
      items: (order.order_items || []).map((item) => {
        this.validateOrderItem(item);

        // 검증 후 필수 필드는 null이 아님이 보장됨
        return {
          id: item.id,
          productId: item.product_id!,
          product: {
            id: item.product_id!,
            name: item.product_name,
            price: item.product_price || item.unit_price,
            imageUrls: item.product_image_url ? [item.product_image_url] : [],
          },
          quantity: item.quantity,
          unitPrice: item.unit_price,
          totalPrice: item.total_price,
        };
      }),
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
        shippingFee: order.shipping_fee || 0,
        couponDiscount: order.coupon_discount || 0,
        pointDiscount: order.point_discount || 0,
        finalPrice: order.final_price,
      },
      status: order.status as ClientOrder["status"],
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at || order.created_at),
    };
  }

  /**
   * 데이터베이스 주문 목록을 ClientOrder 배열로 변환
   */
  static toClientOrders(orders: OrderWithUser[]): ClientOrder[] {
    if (!orders || !Array.isArray(orders)) {
      return [];
    }

    return orders
      .map((order) => {
        try {
          return this.toClientOrder(order);
        } catch (error) {
          console.error("주문 변환 중 오류:", error, order);
          return null;
        }
      })
      .filter((order): order is ClientOrder => order !== null);
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
    const isGuest = !order.customerId;

    return {
      order_number: order.orderNumber,
      customer_id: order.customerId || null, // 비회원은 null
      is_guest: isGuest,
      guest_email: isGuest ? order.customer.email || null : null,
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
