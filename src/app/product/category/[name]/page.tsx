"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductList } from "@/shared/hooks/useProductList";
import { PageLoader, PageError, ProductEmpty } from "@/shared/components";
import ProductCard from "@/feature/main/components/ProductCard";
import {
  CATEGORY_ITEMS,
  CATEGORY_NAMES,
} from "@/feature/product/category/constants";

export default function ProductCategoryPage() {
  const params = useParams();
  const categoryKey = decodeURIComponent(params.name as string);
  const categoryName =
    CATEGORY_NAMES[categoryKey as keyof typeof CATEGORY_NAMES] || categoryKey;

  const { data, isLoading, error } = useProductList({
    category: CATEGORY_ITEMS[categoryKey as keyof typeof CATEGORY_ITEMS],
  });

  if (isLoading) {
    return <PageLoader title={categoryName} />;
  }

  if (error) {
    return <PageError message="상품을 불러오는 중 문제가 발생했습니다." />;
  }

  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* 카테고리 헤더 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {categoryName}
          </h1>
          <div className="w-32 h-1 bg-primary-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">
            총 {data?.total || 0}개의 상품이 있습니다
          </p>
        </div>

        {/* 상품 목록 */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        )}

        {/* 빈 상태 */}
        {products.length === 0 && (
          <ProductEmpty title={`${categoryName} 상품이 없습니다`} />
        )}

        {/* 더보기 버튼 */}
        {data?.hasMore && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
              더 많은 상품 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
