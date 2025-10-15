"use client";

import { useSetting } from "@/shared/hooks/useSetting";

const IntroBanner = () => {
  const { bannerImageUrl, isLoading } = useSetting();
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const imageUrl = bannerImageUrl || defaultImageUrl;

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}
    </section>
  );
};

export default IntroBanner;
