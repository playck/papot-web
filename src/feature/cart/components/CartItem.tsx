"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatKoreanPrice } from "@/shared/utils/price";
import { useCart } from "@/feature/cart/hooks";
import { Counter } from "@/shared/components";
import type { CartItem as CartItemType } from "@/shared/types/cart";

interface CartItemProps {
  item: CartItemType;
  isLast?: boolean;
}

export default function CartItem({ item, isLast = false }: CartItemProps) {
  const [imageError, setImageError] = useState(false);
  const { handleUpdateQuantity, handleRemoveItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    handleUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className={isLast ? "pt-4 sm:pt-6" : "py-4 sm:py-6"}>
      {/* 데스크톱 레이아웃 */}
      <div className="hidden sm:flex items-start gap-4">
        {/* 상품 이미지 */}
        <Link
          href={`/product/detail/${item.productId}`}
          className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity relative"
        >
          {item.imageUrl && !imageError ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="80px"
              onError={() => {
                console.warn(`장바구니 이미지 로드 실패: ${item.imageUrl}`);
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
        </Link>

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/product/detail/${item.productId}`}
            className="hover:text-primary-600 transition-colors"
          >
            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
          </Link>

          <div className="mt-2 text-lg font-semibold text-gray-900">
            {formatKoreanPrice(item.price)}원
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* 삭제 버튼 */}
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            삭제
          </button>

          {/* 총 가격 */}
          <div className="text-xl font-bold text-gray-900">
            {formatKoreanPrice(item.price * item.quantity)}원
          </div>

          <Counter
            initialQuantity={item.quantity}
            minQuantity={1}
            maxQuantity={99}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="sm:hidden">
        {/* 상단: 이미지 + 상품정보 + 삭제버튼 */}
        <div className="flex items-start gap-3">
          <Link
            href={`/product/detail/${item.productId}`}
            className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity relative"
          >
            {item.imageUrl && !imageError ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
                onError={() => {
                  console.warn(
                    `장바구니 모바일 이미지 로드 실패: ${item.imageUrl}`
                  );
                  setImageError(true);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                이미지 없음
              </div>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              href={`/product/detail/${item.productId}`}
              className="hover:text-primary-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 text-sm leading-5 line-clamp-2">
                {item.name}
              </h3>
            </Link>
            <div className="mt-1 text-base font-semibold text-gray-900">
              {formatKoreanPrice(item.price)}원
            </div>
          </div>

          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors cursor-pointer p-1"
          >
            삭제
          </button>
        </div>

        {/* 하단: 오른쪽에 총가격 + 수량조절 */}
        <div className="flex justify-end">
          <div className="flex flex-col items-end gap-2">
            {/* 총가격 */}
            <div className="text-lg font-bold text-gray-900">
              {formatKoreanPrice(item.price * item.quantity)}원
            </div>
            {/* 수량조절 */}
            <Counter
              initialQuantity={item.quantity}
              minQuantity={1}
              maxQuantity={99}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
