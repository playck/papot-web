"use client";

import { useAuth } from "@/shared/hooks/useAuth";
import { OrderList } from "@/feature/mypage/components";
import PageLoader from "@/shared/components/PageLoader";
import { redirect } from "next/navigation";

export default function MyPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLoader title="마이페이지" subtitle="사용자 정보를 확인하는 중..." />
    );
  }

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            마이페이지
          </h1>
          <p className="text-neutral-600">
            안녕하세요, {user.email.slice(0, user.email.indexOf("@"))}님
          </p>
        </div>

        {/* 주문 내역 섹션 */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <OrderList />
        </div>
      </div>
    </div>
  );
}
