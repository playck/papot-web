import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Order, OrderCustomer, ShippingAddress } from "@/shared/types/order";

interface OrderState {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  isProcessing: boolean;

  // 액션
  setOrder: (order: Order) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setProcessing: (processing: boolean) => void;

  // 주문 정보 업데이트
  updateCustomer: (customer: OrderCustomer) => void;
  updateShippingAddress: (shippingAddress: ShippingAddress) => void;

  // 주문 관련 액션
  fetchOrder: (orderId: string) => Promise<void>;
  processPayment: () => Promise<void>;

  reset: () => void;
}

// 임시 모의 데이터 함수
const getMockOrder = (id: string): Order => ({
  id,
  orderNumber: "ORD-20240911-001",
  customerId: "user-1",
  customer: {
    name: "김철수",
    email: "kimcs@example.com",
    phone: "010-1234-5678",
  },
  items: [
    {
      id: "item-1",
      productId: "product-1",
      product: {
        id: "product-1",
        name: "프리미엄 유기농 토마토",
        description: "신선하고 달콤한 유기농 토마토입니다",
        price: 15000,
        discountRate: 10,
        quantity: 50,
        isPublished: true,
        uploadedBy: "farmer-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrls: ["/images/tomato.jpg"],
      },
      quantity: 2,
      unitPrice: 13500,
      totalPrice: 27000,
    },
    {
      id: "item-2",
      productId: "product-2",
      product: {
        id: "product-2",
        name: "신선한 상추",
        description: "아삭아삭한 신선한 상추",
        price: 8000,
        quantity: 30,
        isPublished: true,
        uploadedBy: "farmer-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrls: ["/images/lettuce.jpg"],
      },
      quantity: 1,
      unitPrice: 8000,
      totalPrice: 8000,
    },
  ],
  shippingAddress: {
    recipientName: "김철수",
    phone: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    detailAddress: "456호",
    zipCode: "12345",
    deliveryRequest: "문 앞에 놓아주세요",
  },
  summary: {
    totalProductPrice: 35000,
    shippingFee: 0,
    couponDiscount: 2730,
    pointDiscount: 0,
    finalPrice: 32270,
  },
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useOrderStore = create<OrderState>()(
  devtools(
    (set, get) => ({
      order: null,
      isLoading: false,
      error: null,
      isProcessing: false,

      setOrder: (order) => set({ order }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setProcessing: (isProcessing) => set({ isProcessing }),

      updateCustomer: (customer) => {
        const { order } = get();
        if (order) {
          set({
            order: {
              ...order,
              customer,
            },
          });
        }
      },

      updateShippingAddress: (shippingAddress) => {
        const { order } = get();
        if (order) {
          set({
            order: {
              ...order,
              shippingAddress,
            },
          });
        }
      },

      fetchOrder: async (orderId: string) => {
        set({ isLoading: true, error: null });
        try {
          // const orderData = await getOrder(orderId);
          const orderData = getMockOrder(orderId);
          set({ order: orderData });
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "주문 정보를 불러오는데 실패했습니다.";
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      processPayment: async () => {
        const { order } = get();
        if (!order) return;

        set({ isProcessing: true });
        try {
          console.log("결제 처리:", order);
          // await processPayment(order);

          set({
            order: {
              ...order,
              status: "confirmed",
            },
          });
        } catch (err) {
          console.error("결제 처리 오류:", err);
          set({
            error:
              err instanceof Error
                ? err.message
                : "결제 처리 중 오류가 발생했습니다.",
          });
        } finally {
          set({ isProcessing: false });
        }
      },

      reset: () =>
        set({
          order: null,
          isLoading: false,
          error: null,
          isProcessing: false,
        }),
    }),
    {
      name: "order-store",
    }
  )
);
