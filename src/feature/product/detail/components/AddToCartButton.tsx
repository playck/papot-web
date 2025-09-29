"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/feature/cart/hooks";
import { useAuth } from "@/shared/hooks/useAuth";

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
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!productId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    // 로그인 상태 확인
    if (!user) {
      if (
        confirm(
          "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        router.push("/signin");
      }
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
