import { CategorySection, IntroBanner } from "@/feature/main/components";
import { CATEGORIES } from "@/shared/constants/categories";

export default function Home() {
  return (
    <div className="min-h-screen">
      <IntroBanner />
      <CategorySection
        title={CATEGORIES.POTS.name}
        category={CATEGORIES.POTS.id.toString()}
      />
      <CategorySection
        title={CATEGORIES.CERAMIC.name}
        category={CATEGORIES.CERAMIC.id.toString()}
      />
    </div>
  );
}
