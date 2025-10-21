"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryMenu } from "@/shared/api/client-api";
import { Category } from "@/types/supabase";

export const useCategories = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategoryMenu,
    staleTime: 1000 * 60 * 10, // 10분간 캐시
    gcTime: 1000 * 60 * 30, // 30분간 유지
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    categories,
    isLoading,
    error,
  };
};
