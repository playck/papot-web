"use client";

import { OrderSideBar as OrderSideBarType } from "@/shared/types/order";
import { formatKoreanPrice } from "@/shared/utils/price";

interface OrderSideBarProps {
  summary: OrderSideBarType;
  isProcessing?: boolean;
  onPayment?: () => void;
}

export default function OrderSideBar({
  summary,
  isProcessing = false,
  onPayment,
}: OrderSideBarProps) {
  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          결제금액
        </h2>

        <div className="space-y-4 mb-4 border-t border-neutral-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">총 상품 금액</span>
            <span className="text-neutral-900">
              {formatKoreanPrice(summary.totalProductPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-700">배송비</span>
            <span className="text-neutral-900">
              {summary.shippingFee === 0
                ? "무료"
                : formatKoreanPrice(summary.shippingFee)}
            </span>
          </div>

          {summary.couponDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">쿠폰 사용</span>
              <span className="text-red-600">
                -{formatKoreanPrice(summary.couponDiscount)}
              </span>
            </div>
          )}

          {summary.pointDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">포인트 사용</span>
              <span className="text-red-600">
                -{formatKoreanPrice(summary.pointDiscount)}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-neutral-900">
              최종 결제 금액
            </span>
            <div className="text-xl font-bold text-primary-600">
              <span>{formatKoreanPrice(summary.finalPrice)}</span>
            </div>
          </div>
          <div className="text-right mt-1">
            <span className="text-sm text-neutral-600">
              {Math.floor(summary.finalPrice / 100)} P 적립 예정
            </span>
          </div>
        </div>

        <div className="text-sm text-neutral-600 mb-6">
          <p className="text-right">
            본인은 만 14세 이상이며, 주문 내용을 확인했습니다.
          </p>
        </div>

        {onPayment && (
          <button
            onClick={onPayment}
            disabled={isProcessing}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-lg">결제하기</span>
          </button>
        )}
      </div>
    </div>
  );
}
