"use client";

import { Order } from "@/shared/types/order";

interface StatusBadgeProps {
  status: Order["status"];
}

const getStatusInfo = (status: Order["status"]) => {
  switch (status) {
    case "pending":
    case "confirmed":
      return {
        label: "주문 완료",
        className: "bg-primary-100 text-primary-700",
      };
    case "processing":
      return {
        label: "배송 준비중",
        className: "bg-secondary-100 text-secondary-700",
      };
    case "shipped":
      return {
        label: "배송 중",
        className: "bg-blue-100 text-blue-700",
      };
    case "delivered":
      return {
        label: "도착 완료",
        className: "bg-green-100 text-green-700",
      };
    case "cancelled":
      return {
        label: "주문 취소",
        className: "bg-neutral-100 text-neutral-600",
      };
    default:
      return {
        label: "알 수 없음",
        className: "bg-neutral-100 text-neutral-600",
      };
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = getStatusInfo(status);

  return (
    <span
      className={`px-3 py-1 h-fit rounded-full text-sm font-medium ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
}
