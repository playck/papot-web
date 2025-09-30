import { CategorySection, IntroBanner } from "@/feature/main/components";

export default function Home() {
  return (
    <div className="min-h-screen">
      <IntroBanner />
      <CategorySection title="화분" />
      <CategorySection title="도자기 / 그릇" />
    </div>
  );
}
