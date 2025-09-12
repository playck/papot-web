"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Save, X } from "lucide-react";
import {
  useAuth,
  useUserProfile,
  useUpdateUserProfile,
} from "@/shared/hooks/useAuth";

export function BasicInfo() {
  const { user } = useAuth();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useUserProfile(user?.id);
  const updateProfileMutation = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      const userData = {
        name: profile?.user_name || user.email.split("@")[0] || "",
        email: user.email || "",
        phone: profile?.phone || "",
      };
      setEditData(userData);
    }
  }, [profile, user, profileLoading]);

  if (!user) {
    return null;
  }

  if (profileLoading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-5">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-5">
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">프로필 정보를 불러올 수 없습니다.</p>
          <p className="text-sm text-neutral-600">
            에러: {profileError.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const handleUserInfoEdit = () => {
    setEditData({
      name: profile?.user_name || user.email.split("@")[0],
      email: user.email,
      phone: profile?.phone || "",
    });
    setIsEditing(true);
  };

  const handleUserInfoCancel = () => {
    setIsEditing(false);
    setEditData({
      name: profile?.user_name || user.email.split("@")[0],
      email: user.email,
      phone: profile?.phone || "",
    });
  };

  const handleUserInfoSave = async () => {
    if (!user?.id) return;

    try {
      await updateProfileMutation.mutateAsync({
        userId: user.id,
        data: {
          user_name: editData.name,
          phone: editData.phone,
        },
      });

      setIsEditing(false);
      alert("정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      alert("정보 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUserInfoInputChange = (
    field: keyof typeof editData,
    value: string
  ) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">기본 정보</h3>
        {!isEditing ? (
          <button
            onClick={handleUserInfoEdit}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium cursor-pointer"
          >
            정보 수정
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleUserInfoCancel}
              className="px-3 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <X size={16} />
              취소
            </button>
            <button
              onClick={handleUserInfoSave}
              disabled={updateProfileMutation.isPending}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <Save size={16} />
              {updateProfileMutation.isPending ? "저장 중..." : "저장"}
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-baseline gap-3">
          <User size={18} className="text-neutral-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-lg font-medium text-neutral-600 mb-1">이름</p>
            {!isEditing ? (
              <p className="font-medium text-neutral-900">{editData.name}</p>
            ) : (
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  handleUserInfoInputChange("name", e.target.value)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="이름을 입력하세요"
              />
            )}
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <Mail size={18} className="text-neutral-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-lg font-medium text-neutral-600 mb-1">이메일</p>
            <p className="font-medium text-neutral-900">{editData.email}</p>
            {isEditing && (
              <p className="text-xs text-neutral-500 mt-1">
                이메일은 변경할 수 없습니다
              </p>
            )}
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <Phone size={18} className="text-neutral-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-lg font-medium text-neutral-600 mb-1">휴대폰</p>
            {!isEditing ? (
              <p className="font-medium text-neutral-900">{editData.phone}</p>
            ) : (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) =>
                  handleUserInfoInputChange("phone", e.target.value)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="휴대폰 번호를 입력하세요"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
