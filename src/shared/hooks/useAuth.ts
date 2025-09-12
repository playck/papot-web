"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, onAuthStateChange } from "@/app/(auth)/services/api";
import { User } from "@/app/(auth)/services/type";
import {
  getUserProfile,
  updateUserProfile,
  UpdateProfileData,
} from "../api/client-api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("사용자 정보 로드 실패:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // 인증 상태 변화 감지
    const {
      data: { subscription },
    } = onAuthStateChange((userData) => {
      setUser(userData);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

// 유저 정보 관리 훅
export function useUserProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

// 사용자 프로필 업데이트 훅
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateProfileData;
    }) => updateUserProfile(userId, data),

    onSuccess: (updatedProfile, { userId }) => {
      queryClient.setQueryData(["user-profile", userId], updatedProfile);
      queryClient.invalidateQueries({
        queryKey: ["user-profile", userId],
      });
    },
    onError: (error) => {
      console.error("프로필 업데이트 실패:", error);
    },
  });
}
