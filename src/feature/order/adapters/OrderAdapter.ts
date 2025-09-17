import {
  Order,
  CreateOrderData,
  CreateOrderItem,
  ServerOrderData,
  ServerOrderItemData,
} from "@/shared/types/order";

/**
 * 주문 데이터 변환 어댑터
 */
export class OrderAdapter {
  /**
   * Order 타입을 CreateOrderData 타입으로 변환
   */
  static toCreateOrderData(order: Order): CreateOrderData {
    return {
      customerId: order.customerId,
      orderNumber: order.orderNumber,
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
      },
      items: order.items.map(this.toCreateOrderItem),
      shippingAddress: {
        recipientName: order.shippingAddress.recipientName,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        detailAddress: order.shippingAddress.detailAddress,
        zipCode: order.shippingAddress.zipCode,
        deliveryRequest: order.shippingAddress.deliveryRequest,
      },
      summary: {
        totalProductPrice: order.summary.totalProductPrice,
        shippingFee: order.summary.shippingFee,
        couponDiscount: order.summary.couponDiscount,
        pointDiscount: order.summary.pointDiscount,
        finalPrice: order.summary.finalPrice,
      },
    };
  }

  /**
   * OrderItem을 CreateOrderItem으로 변환
   */
  private static toCreateOrderItem(
    orderItem: Order["items"][0]
  ): CreateOrderItem {
    return {
      productId: orderItem.productId,
      productName: orderItem.product.name,
      productPrice: orderItem.product.price,
      productImageUrl: orderItem.product.imageUrls?.[0],
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
      totalPrice: orderItem.totalPrice,
    };
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
   * Order를 서버 전송용 데이터로 변환
   */
  static toServerOrderData(order: Order): ServerOrderData {
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
   * Order의 items를 서버 전송용 데이터로 변환
   */
  static toServerOrderItemsData(
    order: Order,
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
