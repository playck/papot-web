"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageWrapperProps {
  imageUrls: string[];
  productName: string;
}

export default function ProductImageWrapper({
  imageUrls,
  productName,
}: ProductImageWrapperProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const noImages = !imageUrls || imageUrls.length === 0;

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set([...prev, index]));
  };

  if (noImages) {
    return (
      <div className="w-full aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
        <span className="text-neutral-400">이미지가 없습니다</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 메인 이미지 */}
      <div className="relative w-full aspect-square bg-neutral-50 rounded-lg overflow-hidden">
        {imageErrors.has(selectedImageIndex) ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="text-center text-neutral-500">
              <div className="text-3xl mb-2">📷</div>
              <div className="text-sm">이미지를 불러올 수 없습니다</div>
            </div>
          </div>
        ) : (
          <Image
            src={imageUrls[selectedImageIndex]}
            alt={`${productName} 이미지 ${selectedImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={() => handleImageError(selectedImageIndex)}
          />
        )}
      </div>

      {/* 이미지 리스트 */}
      {imageUrls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
              onMouseEnter={() => setSelectedImageIndex(index)}
              onClick={() => setSelectedImageIndex(index)}
            >
              {imageErrors.has(index) ? (
                <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                  <span className="text-xs text-neutral-400">📷</span>
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt={`${productName} 썸네일 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
