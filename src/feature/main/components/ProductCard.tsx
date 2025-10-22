"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/shared/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const discountedPrice = product.discountRate
    ? product.price * (1 - product.discountRate / 100)
    : product.price;
  const badges = [...(product.badges || [])];
  const isImgOk =
    product.imageUrls && product.imageUrls.length > 0 && !imageError;

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* 상품 이미지 */}
      <div className="aspect-square overflow-hidden bg-neutral-100 relative">
        {isImgOk ? (
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 text-neutral-600">
            <div className="text-center">
              <div className="text-2xl mb-2">🌸</div>
              <div className="text-sm font-medium">{product.name}</div>
            </div>
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div className="p-4">
        {/* 뱃지 영역 */}
        <div className="h-6 mb-3 flex flex-wrap gap-1">
          {badges.slice(0, 5).map((badge, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium ${
                index % 2 === 0
                  ? "bg-primary-100 text-primary-600"
                  : "bg-secondary-100 text-secondary-700"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* 상품명 */}
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* 가격 정보 */}
        <div className="space-y-1">
          {product.discountRate ? (
            <>
              {/* 원가 + 할인율 */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  ₩{product.price.toLocaleString()}
                </span>
                <span className="text-sm bg-secondary-100 text-secondary-600 px-2 py-[2px] rounded font-medium">
                  -{product.discountRate}%
                </span>
              </div>
              {/* 할인된 가격 */}
              <p className="text-xl font-bold text-primary-600">
                ₩{Math.floor(discountedPrice).toLocaleString()}
              </p>
            </>
          ) : (
            /* 할인 없는 경우 */
            <p className="text-xl font-bold text-primary-600">
              ₩{product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
