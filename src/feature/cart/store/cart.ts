import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore, CartItem } from "@/shared/types/cart";

const generateCartItemId = (
  productId: string,
  options?: CartItem["selectedOptions"]
) => {
  return `${productId}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (newItem) => {
        const itemId = generateCartItemId(
          newItem.productId,
          newItem.selectedOptions
        );

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === itemId
          );

          let updatedItems: CartItem[];

          if (existingItemIndex >= 0) {
            updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
          } else {
            updatedItems = [...state.items, { ...newItem, id: itemId }];
          }

          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
