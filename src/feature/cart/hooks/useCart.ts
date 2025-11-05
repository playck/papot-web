import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/hooks/useAuth";
import type { CartItem, DatabaseCartItem } from "@/shared/types/cart";
import {
  getUserCart,
  createUserCart,
  getCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart as clearCartAPI,
} from "@/shared/api/client-api";

const convertDbItemToClient = (dbItem: DatabaseCartItem): CartItem => ({
  id: dbItem.id,
  productId: dbItem.product_id,
  name: dbItem.product_name,
  price: dbItem.unit_price,
  imageUrl: dbItem.product_image || undefined,
  quantity: dbItem.quantity,
});

export const cartKeys = {
  all: ["cart"] as const,
  user: (userId: string) => [...cartKeys.all, "user", userId] as const,
};

interface CartQueryData {
  cart: { id: string } | null;
  items: CartItem[];
}

export default function useCart() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 장바구니 조회
  const cartQuery = useQuery({
    queryKey: cartKeys.user(user?.id || ""),
    queryFn: async () => {
      if (!user?.id) {
        return {
          cart: null,
          items: [],
        };
      }

      const cart = await getUserCart(user.id);

      if (!cart) {
        return {
          cart: null,
          items: [],
        };
      }

      // 장바구니 아이템들 조회
      const dbItems = await getCartItems(cart.id);
      const cartItems = dbItems.map(convertDbItemToClient);

      return {
        cart,
        items: cartItems,
      };
    },
    enabled: !!user?.id,
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<CartItem, "id">) => {
      if (!user?.id) throw new Error("로그인이 필요합니다");

      let cartId = cartQuery.data?.cart?.id;

      if (!cartId) {
        const cart = await createUserCart(user.id);

        if (!cart) throw new Error("장바구니 생성 실패");
        cartId = cart.id;
      }

      await addItemToCart(
        cartId,
        item.productId,
        item.name,
        item.imageUrl || null,
        item.price,
        item.quantity
      );

      return item;
    },
    onMutate: async (newItem) => {
      const queryKey = cartKeys.user(user?.id || "");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: CartQueryData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          items: [...old.items, { ...newItem, id: `temp-${Date.now()}` }],
        };
      });

      return { previousData };
    },
    onError: (err, newItem, context) => {
      const queryKey = cartKeys.user(user?.id || "");
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      const queryKey = cartKeys.user(user?.id || "");
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => {
      await updateCartItemQuantity(itemId, quantity);
      return { itemId, quantity };
    },
    onMutate: async ({ itemId, quantity }) => {
      const queryKey = cartKeys.user(user?.id || "");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: CartQueryData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((item: CartItem) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      const queryKey = cartKeys.user(user?.id || "");
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      const queryKey = cartKeys.user(user?.id || "");
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await removeCartItem(itemId);
      return itemId;
    },
    onMutate: async (itemId) => {
      const queryKey = cartKeys.user(user?.id || "");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: CartQueryData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((item: CartItem) => item.id !== itemId),
        };
      });

      return { previousData };
    },
    onError: (err, itemId, context) => {
      const queryKey = cartKeys.user(user?.id || "");
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      const queryKey = cartKeys.user(user?.id || "");
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async (cartId: string) => {
      await clearCartAPI(cartId);
      return cartId;
    },
    onMutate: async () => {
      const queryKey = cartKeys.user(user?.id || "");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: CartQueryData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          items: [],
        };
      });

      return { previousData };
    },
    onError: (err, cartId, context) => {
      const queryKey = cartKeys.user(user?.id || "");
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      const queryKey = cartKeys.user(user?.id || "");
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const syncCart = () => {
    queryClient.invalidateQueries({ queryKey: cartKeys.user(user?.id || "") });
  };

  return {
    items: cartQuery.data?.items || [],
    cartId: cartQuery.data?.cart?.id,
    isLoading:
      cartQuery.isLoading ||
      addItemMutation.isPending ||
      updateQuantityMutation.isPending ||
      removeItemMutation.isPending ||
      clearCartMutation.isPending,
    error: cartQuery.error?.message,

    totalItems:
      cartQuery.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    totalPrice:
      cartQuery.data?.items?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ) || 0,

    loadCart: () =>
      queryClient.invalidateQueries({
        queryKey: cartKeys.user(user?.id || ""),
      }),
    handleAddItemToCart: (_: unknown, item: Omit<CartItem, "id">) =>
      addItemMutation.mutate(item),
    handleUpdateQuantity: (itemId: string, quantity: number) =>
      updateQuantityMutation.mutate({ itemId, quantity }),
    handleRemoveItem: (itemId: string) => removeItemMutation.mutate(itemId),
    handleClearCart: (cartId: string) => clearCartMutation.mutate(cartId),
    syncCart,

    getItemById: (id: string) =>
      cartQuery.data?.items?.find((item) => item.id === id),

    mutations: {
      addItem: addItemMutation,
      updateQuantity: updateQuantityMutation,
      removeItem: removeItemMutation,
      clearCart: clearCartMutation,
    },
  };
}
