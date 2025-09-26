"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { Package } from "lucide-react";
import { ClientOrder } from "@/shared/types/order";
import StatusBadge from "@/shared/components/StatusBadge";

interface OrderItemProps {
  order: ClientOrder;
}

export function OrderItem({ order }: OrderItemProps) {
  const firstItem = order.items[0];

  return (
    <div className="flex  justify-between py-4 border-b border-neutral-100 last:border-b-0">
      {/* 상품 이미지 */}
      <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 relative">
        {firstItem.product.imageUrls?.[0] ? (
          <Image
            src={firstItem.product.imageUrls[0]}
            alt={firstItem.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <Package size={24} className="text-neutral-400" />
        )}
      </div>

      {/* 상품 정보 */}
      <div className="flex-1 ml-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-neutral-500 font-normal">
            {dayjs(order.createdAt).format("YYYY.MM.DD")}
          </span>
          <h4 className="font-medium text-neutral-900 mb-1">
            {firstItem.product.name} {" X "} {firstItem.quantity}개
          </h4>
        </div>
      </div>

      <StatusBadge status={order.status} />
    </div>
  );
}
