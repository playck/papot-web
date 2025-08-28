"use client";

const IntroBanner = () => {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* 배경 이미지 (페이크 이미지 - 아름다운 식물 정원) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      {/* 미묘한 오버레이 (이미지가 더 잘 보이도록) */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
};

export default IntroBanner;
