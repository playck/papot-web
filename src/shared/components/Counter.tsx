"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CounterProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
}

export default function Counter({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange,
  className = "",
}: CounterProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = parseInt(e.target.value) || minQuantity;
    const clampedQuantity = Math.max(
      minQuantity,
      Math.min(maxQuantity, inputQuantity)
    );
    setQuantity(clampedQuantity);
    onQuantityChange?.(clampedQuantity);
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* 마이너스 버튼 */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= minQuantity}
        className="flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-l-lg hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        aria-label="수량 감소"
      >
        <Minus className="w-4 h-4 text-neutral-600" />
      </button>

      {/* 수량 입력 */}
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={minQuantity}
        max={maxQuantity}
        className="w-16 h-10 text-center text-lg font-medium border-t border-b border-neutral-300 focus:outline-none focus:border-primary-500 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="수량"
      />

      {/* 플러스 버튼 */}
      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="flex items-center justify-center w-10 h-10 border border-primary-600 bg-primary-600 rounded-r-lg hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary-600 transition-colors cursor-pointer"
        aria-label="수량 증가"
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
