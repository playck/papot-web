"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryMenu } from "@/shared/api/client-api";
import { CategoryWithChildren } from "@/shared/types/category";

export const useCategories = () => {
  const {
    data: allCategories = [],
    isLoading,
    error,
  } = useQuery<CategoryWithChildren[]>({
    queryKey: ["categories"],
    queryFn: getCategoryMenu,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const topLevelCategories = allCategories?.filter(
    (cat) => cat.parentId === null
  );

  return {
    categories: topLevelCategories,
    isLoading,
    error,
  };
};
