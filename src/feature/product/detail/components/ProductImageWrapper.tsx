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
  const noImages = !imageUrls || imageUrls.length === 0;

  if (noImages) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">이미지가 없습니다</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* 메인 이미지 */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={imageUrls[selectedImageIndex]}
          alt={`${productName} 이미지 ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* 이미지 리스트 */}
      {imageUrls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={() => setSelectedImageIndex(index)}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={imageUrl}
                alt={`${productName} 썸네일 ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
