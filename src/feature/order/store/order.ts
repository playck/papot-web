import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Order, OrderCustomer, ShippingAddress } from "@/shared/types/order";
import { PurchaseItem } from "@/shared/hooks/usePurchase";

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

  // 바로구매 액션
  createDirectOrder: (orderData: {
    orderNumber: string;
    items: PurchaseItem[];
    totalAmount: number;
    userId: string;
    customer?: OrderCustomer;
    shippingAddress?: ShippingAddress;
  }) => void;

  reset: () => void;
}

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

      // fetchOrder: async (orderId: string) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     console.log("📦 주문 ID로 주문 조회:", orderId);

      //     const orderData = await getOrder(orderId);

      //     if (!orderData) {
      //       throw new Error("주문을 찾을 수 없습니다.");
      //     }

      //     set({ order: orderData });
      //     console.log("✅ 주문 조회 성공:", orderData.orderNumber);
      //   } catch (err) {
      //     const errorMessage =
      //       err instanceof Error
      //         ? err.message
      //         : "주문 정보를 불러오는데 실패했습니다.";
      //     console.error("❌ 주문 조회 실패:", errorMessage);
      //     set({ error: errorMessage });
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },

      createDirectOrder: (orderData) => {
        // 주문 데이터를 Order 형태로 변환 (기본값 제공)
        const order: Order = {
          id: `order-${Date.now()}`,
          orderNumber: orderData.orderNumber,
          customerId: orderData.userId,
          customer: orderData.customer || {
            name: "",
            email: "",
            phone: "",
          },
          items: orderData.items.map((item, index) => ({
            id: `item-${Date.now()}-${index}`,
            productId: item.productId,
            product: {
              id: item.productId,
              name: item.productName,
              price: item.price,
              quantity: 0, // 주문 시점의 재고는 별도 관리
              isPublished: true,
              uploadedBy: "unknown", // 실제 구현 시 상품 정보에서 가져오기
              createdAt: new Date(),
              updatedAt: new Date(),
              imageUrls: item.imageUrl ? [item.imageUrl] : [],
            },
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
          shippingAddress: orderData.shippingAddress || {
            recipientName: "",
            phone: "",
            address: "",
            detailAddress: "",
            zipCode: "",
            deliveryRequest: "",
          },
          summary: {
            totalProductPrice: orderData.totalAmount,
            shippingFee: 0,
            couponDiscount: 0,
            pointDiscount: 0,
            finalPrice: orderData.totalAmount,
          },
          status: "pending" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        console.log("✅ 주문 데이터 변환 완료:", order);
        set({ order, error: null });
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
