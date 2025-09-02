import { CategorySection, IntroBanner } from "@/feature/main/components";

export default function Home() {
  return (
    <div className="min-h-screen">
      <IntroBanner />
      <CategorySection title="인기 식물" />
      <CategorySection title="계절 꽃" />
      <CategorySection title="화분 & 플랜터" />
    </div>
  );
}
