import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">장바구니</h1>

        <div className="text-center py-20">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            장바구니가 비어있습니다
          </h2>
          <p className="text-lg text-gray-500 mb-10">
            원하는 상품을 장바구니에 담아보세요
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-8 py-4 text-lg rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
}
