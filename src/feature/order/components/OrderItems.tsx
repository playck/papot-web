"use client";

import Image from "next/image";
import { ClientOrderItem } from "@/shared/types/order";
import { formatKoreanPrice } from "@/shared/utils/price";

interface OrderItemsProps {
  items: ClientOrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 mb-2">주문상품</h2>

      <div>
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 py-3">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100">
                {item.product.imageUrls.length > 0 ? (
                  <Image
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                    이미지 없음
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900 text-md truncate">
                {item.product.name}
              </h3>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-neutral-500">개당</span>
                <div className="font-semibold text-neutral-900">
                  {formatKoreanPrice(item.totalPrice)}
                </div>
              </div>
              <div className="text-sm text-neutral-500 mt-0.5">
                {item.quantity}개
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-4 border-t border-neutral-200">
        <div className="flex justify-end">
          <div className="text-lg font-semibold text-neutral-900">
            <span className="text-neutral-700">총 </span>
            {formatKoreanPrice(
              items.reduce((sum, item) => sum + item.totalPrice, 0)
            )}
            <span> 원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
