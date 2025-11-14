import { CategorySection, IntroBanner } from "@/feature/main/components";
import { CATEGORIES } from "@/shared/constants/categories";
import { getSettings } from "@/shared/api/server-api";

export default async function Home() {
  const settings = await getSettings();
  const bannerImageUrl = settings?.main_image_url || null;

  return (
    <div className="min-h-screen">
      <IntroBanner bannerImageUrl={bannerImageUrl} />
      <CategorySection
        title={CATEGORIES.PLANTS.slug.toUpperCase()}
        category={CATEGORIES.PLANTS.id.toString()}
      />
      <CategorySection
        title={CATEGORIES.POTS.slug.toUpperCase()}
        category={CATEGORIES.POTS.id.toString()}
      />
    </div>
  );
}
