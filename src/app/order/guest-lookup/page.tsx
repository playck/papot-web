"use client";

import { useState } from "react";
import { Search, Package, ArrowLeft } from "lucide-react";
import { Input } from "@/shared/components";
import { getGuestOrder } from "@/shared/api/client-api";
import { formatKoreanPrice } from "@/shared/utils/price";
import { OrderAdapter } from "@/feature/order/adapters/OrderAdapter";
import type { ClientOrder, ClientOrderItem } from "@/shared/types/order";

export default function GuestOrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<ClientOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber) {
      alert("주문번호를 입력해주세요.");
      return;
    }

    if (!phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getGuestOrder(orderNumber, phone);

      if (!result) {
        setError(
          "주문을 찾을 수 없습니다. 주문번호와 휴대폰 번호를 확인해주세요."
        );
        setOrder(null);
        return;
      }

      const convertedOrder = OrderAdapter.toClientOrders([result])[0];
      setOrder(convertedOrder);
    } catch {
      setError("주문 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOrderNumber("");
    setPhone("");
    setOrder(null);
    setError(null);
  };

  if (order) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleReset}
            className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>다시 조회하기</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              주문 정보
            </h1>
            <p className="text-neutral-600">주문 내역을 확인하세요</p>
          </div>

          {/* 주문 정보 카드 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">
                주문 정보
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {order.status === "confirmed"
                  ? "주문완료"
                  : order.status === "shipped"
                  ? "배송중"
                  : order.status === "delivered"
                  ? "배송완료"
                  : order.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600">주문번호</span>
                <span className="font-medium text-neutral-900">
                  {order.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">주문일시</span>
                <span className="font-medium text-neutral-900">
                  {new Date(order.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">결제금액</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatKoreanPrice(order.summary.finalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* 주문 상품 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              주문 상품
            </h2>
            <div className="space-y-4">
              {order.items.map((item: ClientOrderItem) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
                >
                  {item.product.imageUrls?.[0] && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {formatKoreanPrice(item.unitPrice)} × {item.quantity}개
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">
                      {formatKoreanPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              배송 정보
            </h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="text-neutral-600 min-w-20">수령인</span>
                <span className="font-medium text-neutral-900">
                  {order.shippingAddress.recipientName}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-neutral-600 min-w-20">연락처</span>
                <span className="font-medium text-neutral-900">
                  {order.shippingAddress.phone}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-neutral-600 min-w-20">주소</span>
                <span className="font-medium text-neutral-900">
                  ({order.shippingAddress.zipCode}){" "}
                  {order.shippingAddress.address}{" "}
                  {order.shippingAddress.detailAddress}
                </span>
              </div>
              {order.shippingAddress.deliveryRequest && (
                <div className="flex gap-2">
                  <span className="text-neutral-600 min-w-20">배송 요청</span>
                  <span className="text-neutral-900">
                    {order.shippingAddress.deliveryRequest}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 주문 조회 폼
  return (
    <div className="min-h-screen bg-white md:bg-gradient-to-br md:from-primary-50 md:via-background md:to-secondary-50 flex items-center justify-center md:px-4">
      <div className="max-w-md w-full">
        <div className="bg-white md:rounded-2xl md:shadow-lg md:border md:border-border p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              비회원 주문 조회
            </h1>
            <p className="text-sm text-muted-foreground">
              주문번호와 휴대폰 번호로 주문 내역을 확인하세요
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <Input
              label="주문번호"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="250105-1234"
              required
            />

            <Input
              label="휴대폰 번호"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "조회 중..." : "주문 조회"}
            </button>
          </form>

          <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-1 items-start">
            <span className="text-sm shrink-0">💡</span>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>주문번호</strong>는 주문 완료 시 안내된 번호입니다.
              </p>
              <p>휴대폰 번호는 주문 시 입력한 정보와 일치해야 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
