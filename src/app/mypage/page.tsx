"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { useAuth, useUserProfile } from "@/shared/hooks/useAuth";
import {
  OrderList,
  TabMenu,
  UserInfoManage,
} from "@/feature/mypage/components";
import PageLoader from "@/shared/components/PageLoader";

export default function MyPage() {
  const { user, loading } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const [activeTab, setActiveTab] = useState<TabMenu>("orders");

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            마이페이지
          </h1>
          <p className="text-neutral-600">
            안녕하세요,{" "}
            {profile?.user_name || user.email.slice(0, user.email.indexOf("@"))}
            님
          </p>
        </div>

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg border border-neutral-200 px-6 py-4">
            <OrderList />
          </div>
        )}

        {activeTab === "profile" && <UserInfoManage />}
      </div>
    </div>
  );
}
