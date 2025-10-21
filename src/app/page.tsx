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
