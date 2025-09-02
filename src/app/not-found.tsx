"use client";

import Link from "next/link";
import { Home, ArrowLeft, Leaf, Flower } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 일러스트 영역 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-primary-200 select-none">
            404
          </div>

          <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 animate-bounce">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute top-8 right-1/4 transform translate-x-1/2 animate-bounce delay-300">
            <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
              <Flower className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce delay-500">
            <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white transform rotate-45" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-muted-foreground mb-2">
            찾으시는 페이지가 존재하지 않습니다
          </p>
          <p className="text-muted-foreground">
            하지만 걱정하지 마세요! 아름다운 식물들이 기다리고 있어요 🌱
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-secondary-200 text-secondary-700 rounded-lg font-medium hover:bg-secondary-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            이전 페이지로
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            어떤 카테고리를 찾으시나요?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/plants"
              className="group flex flex-col items-center p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors"
            >
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-primary-700">식물</span>
            </Link>

            <Link
              href="/flowers"
              className="group flex flex-col items-center p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Flower className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-secondary-700">꽃</span>
            </Link>

            <Link
              href="/pots"
              className="group flex flex-col items-center p-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <div className="w-12 h-12 bg-neutral-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 bg-neutral-200 rounded-sm"></div>
              </div>
              <span className="text-sm font-medium text-neutral-700">화분</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
