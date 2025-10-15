"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/shared/api/client-api";
import { Settings } from "@/shared/types/settings";

export const useSetting = () => {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<Settings | null>({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    settings,
    isLoading,
    error,
    bannerImageUrl: settings?.main_image_url,
  };
};
