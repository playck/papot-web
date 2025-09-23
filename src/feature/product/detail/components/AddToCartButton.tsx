"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/feature/cart/hooks";

interface AddToCartButtonProps {
  productId?: string;
  title: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  className?: string;
}

export default function AddToCartButton({
  productId,
  title,
  price,
  imageUrl,
  quantity,
  className = "",
}: AddToCartButtonProps) {
  const { handleAddItemToCart } = useCart();

  const handleAddToCart = () => {
    if (!productId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    handleAddItemToCart("", {
      productId,
      name: title,
      price,
      imageUrl,
      quantity,
    });

    alert("장바구니에 상품이 추가되었습니다!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-2 py-4 px-6 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors cursor-pointer ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      장바구니
    </button>
  );
}
