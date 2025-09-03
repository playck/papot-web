import Link from "next/link";
import { getProducts } from "@/shared/api/server-api";
import ProductCard from "@/feature/main/components/ProductCard";

interface CategorySectionProps {
  title: string;
  category?: string;
}

const CategorySection = async ({ title, category }: CategorySectionProps) => {
  const data = await getProducts({
    category,
    limit: 12,
  });

  const products = data?.products || [];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* 카테고리 제목 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/detail/${product.id}`}
              className="block transition-transform hover:scale-105"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">상품이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
