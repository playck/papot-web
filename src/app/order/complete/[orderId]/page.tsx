"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useUserProfile } from "@/shared/hooks/useAuth";
import PageLoader from "@/shared/components/PageLoader";
import PageError from "@/shared/components/PageError";
import { formatKoreanPrice } from "@/shared/utils/price";
import { useOrderStore } from "@/feature/order/store/order";
import { useUserOrderList } from "@/feature/order/hooks/useOrder";

export default function OrderCompletePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.id);
  const { data: orders, isLoading, error } = useUserOrderList(user?.id);
  const { order: storeOrder } = useOrderStore();
  const orderId = params.orderId as string;

  // 회원: 서버에서 가져온 주문, 비회원: store의 주문
  const currentOrder = user?.id
    ? orders?.find((order) => order.id === orderId)
    : storeOrder?.id === orderId
    ? storeOrder
    : null;

  useEffect(() => {
    // 비회원인데 store에 주문 정보가 없으면 주문 조회 페이지로
    if (!user?.id && !storeOrder) {
      router.push("/order/guest-lookup");
    }
  }, [user?.id, storeOrder, router]);

  if (authLoading || (user?.id && (profileLoading || isLoading))) {
    return (
      <PageLoader
        title="주문 완료"
        subtitle="주문 정보를 불러오는 중입니다..."
      />
    );
  }

  if (user?.id && !profile) {
    return null;
  }

  if (error || !currentOrder) {
    return (
      <PageError message="주문 정보를 찾을 수 없습니다. 잠시 후 다시 시도해주세요." />
    );
  }

  const displayName = user?.id
    ? profile?.user_name || user.email.split("@")[0]
    : currentOrder.customer.name;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            주문이 완료되었습니다
          </h1>
          <p className="text-neutral-600">
            {displayName}님, 주문해주셔서 감사합니다. 빠르게 배송해드리겠습니다.
          </p>
        </div>

        {/* 주문 정보 카드 */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">
              주문 정보
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              주문완료
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600">주문번호</span>
              <span className="font-medium text-neutral-900">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">주문일시</span>
              <span className="font-medium text-neutral-900">
                {new Date(currentOrder.createdAt).toLocaleString("ko-KR")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">결제금액</span>
              <span className="text-xl font-bold text-primary-600">
                {formatKoreanPrice(currentOrder.summary.finalPrice)}
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
            {currentOrder.items.map((item) => (
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
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            배송 정보
          </h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="text-neutral-600 min-w-20">수령인</span>
              <span className="font-medium text-neutral-900">
                {currentOrder.shippingAddress.recipientName}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600 min-w-20">연락처</span>
              <span className="font-medium text-neutral-900">
                {currentOrder.shippingAddress.phone}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-600 min-w-20">주소</span>
              <span className="font-medium text-neutral-900">
                ({currentOrder.shippingAddress.zipCode}){" "}
                {currentOrder.shippingAddress.address}{" "}
                {currentOrder.shippingAddress.detailAddress}
              </span>
            </div>
            {currentOrder.shippingAddress.deliveryRequest && (
              <div className="flex gap-2">
                <span className="text-neutral-600 min-w-20">배송 요청</span>
                <span className="text-neutral-900">
                  {currentOrder.shippingAddress.deliveryRequest}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 px-6 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
          >
            쇼핑 계속하기
          </button>
          <button
            onClick={() =>
              router.push(user?.id ? "/mypage" : "/order/guest-lookup")
            }
            className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            주문 내역 보기
          </button>
        </div>
      </div>
    </div>
  );
}
