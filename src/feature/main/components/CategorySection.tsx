"use client";

import { useProductList } from "@/shared/hooks/useProductList";
import ProductCard from "@/feature/main/components/ProductCard";

interface CategorySectionProps {
  title: string;
  category?: string;
}

const CategorySection = ({ title, category }: CategorySectionProps) => {
  const { data, isLoading, error } = useProductList({
    category,
    limit: 12,
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-square bg-neutral-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

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
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                // TODO: 상품 상세 페이지로 이동
                console.log(`상품 클릭: ${product.name}`);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
