"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { Package } from "lucide-react";
import { ClientOrder } from "@/shared/types/order";
import StatusBadge from "@/shared/components/StatusBadge";
import { formatKoreanPrice } from "@/shared/utils/price";

interface OrderItemProps {
  order: ClientOrder;
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="py-4 border-b border-neutral-100 last:border-b-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-neutral-500 font-normal">
          {dayjs(order.createdAt).format("YYYY.MM.DD")}
        </span>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              {item.product.imageUrls?.[0] ? (
                <Image
                  src={item.product.imageUrls[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Package size={24} className="text-neutral-400" />
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-neutral-900 mb-1">
                {item.product.name}
              </h4>
              <p className="text-sm text-neutral-600 mb-1">
                수량: {item.quantity}개
              </p>
              <span className="text-sm text-neutral-900 font-semibold">
                {formatKoreanPrice(item.totalPrice)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-sm text-neutral-600">총 결제금액</span>
        <span className="text-base text-neutral-900 font-bold">
          {formatKoreanPrice(order.summary.finalPrice)}
        </span>
      </div>
    </div>
  );
}
