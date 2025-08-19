"use client";

import { colors } from "@/lib/colors";
import { useState } from "react";

export default function Example() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen p-4 bg-neutral-50 text-neutral-900">
      {/* 헤더 */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary-600">
          Papot - 식물과 꽃의 색상 테마
        </h1>

        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg transition-colors bg-primary-600 text-neutral-50 hover:bg-primary-700 focus:ring-2 focus:ring-primary-400"
        >
          {darkMode ? "라이트 모드" : "다크 모드"}
        </button>
      </header>

      {/* Primary 색상 팔레트 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          Primary 색상 (은은한 세이지 그린 - 식물 테마)
        </h2>
        <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
          {Object.entries(colors.primary).map(([scale, colorClass]) => (
            <div key={scale} className="text-center">
              <div className={`w-full h-16 rounded-lg mb-2 bg-${colorClass}`} />
              <p className="text-xs text-neutral-600">{scale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary 색상 팔레트 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          Secondary 색상 (따뜻한 어스톤 - 자연 테마)
        </h2>
        <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
          {Object.entries(colors.secondary).map(([scale, colorClass]) => (
            <div key={scale} className="text-center">
              <div className={`w-full h-16 rounded-lg mb-2 bg-${colorClass}`} />
              <p className="text-xs text-neutral-600">{scale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Neutral 색상 팔레트 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          Neutral 색상 (그레이 계열)
        </h2>
        <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
          {Object.entries(colors.neutral).map(([scale, colorClass]) => (
            <div key={scale} className="text-center">
              <div
                className={`w-full h-16 rounded-lg mb-2 border border-neutral-200 bg-${colorClass}`}
              />
              <p className="text-xs text-neutral-600">{scale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 컴포넌트 예제 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          컴포넌트 예제
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 카드 예제 */}
          <div className="p-6 rounded-lg bg-white border border-neutral-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-neutral-900">
              카드 제목
            </h3>
            <p className="mb-4 text-neutral-600">
              화분과 꽃을 위한 은은하고 자연스러운 카드 디자인입니다.
            </p>
            <button className="px-4 py-2 rounded-lg transition-colors bg-primary-600 text-neutral-50 hover:bg-primary-700 focus:ring-2 focus:ring-primary-400">
              Primary 버튼
            </button>
          </div>

          {/* 입력 폼 예제 */}
          <div className="p-6 rounded-lg bg-white border border-neutral-200">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              입력 폼
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="식물 이름을 입력하세요"
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              />
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg transition-colors bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-2 focus:ring-secondary-400">
                  Secondary
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg transition-colors border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-primary-400">
                  Outline
                </button>
              </div>
            </div>
          </div>

          {/* 텍스트 스타일 예제 */}
          <div className="p-6 rounded-lg bg-white border border-neutral-200">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">
              텍스트 스타일
            </h3>
            <div className="space-y-2">
              <p className="text-neutral-900">Primary 텍스트</p>
              <p className="text-neutral-600">Secondary 텍스트</p>
              <p className="text-neutral-500">Muted 텍스트</p>
              <p className="text-primary-600">Accent 텍스트</p>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 사용 예제 - 상품 카드들 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          실제 적용 예제 - 식물 상품 카드
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 화분 상품 */}
          <div className="rounded-lg overflow-hidden bg-white border border-neutral-200 hover:shadow-lg transition-all duration-200">
            <div className="h-48 flex items-center justify-center text-6xl bg-primary-100">
              🪴
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-neutral-900">
                몬스테라 델리시오사
              </h3>
              <p className="text-sm mb-3 text-neutral-600">
                실내 공기정화에 좋은 대형 관엽식물
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-primary-600">
                  35,000원
                </span>
                <button className="px-3 py-1 text-sm rounded transition-colors bg-primary-600 text-neutral-50 hover:bg-primary-700">
                  담기
                </button>
              </div>
            </div>
          </div>

          {/* 꽃 상품 */}
          <div className="rounded-lg overflow-hidden bg-white border border-neutral-200 hover:shadow-lg transition-all duration-200">
            <div className="h-48 flex items-center justify-center text-6xl bg-secondary-100">
              🌸
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-neutral-900">벚꽃 부케</h3>
              <p className="text-sm mb-3 text-neutral-600">
                봄의 전령, 은은한 핑크빛 벚꽃
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-primary-600">
                  25,000원
                </span>
                <button className="px-3 py-1 text-sm rounded transition-colors bg-secondary-600 text-neutral-50 hover:bg-secondary-700">
                  담기
                </button>
              </div>
            </div>
          </div>

          {/* 다육식물 상품 */}
          <div className="rounded-lg overflow-hidden bg-white border border-neutral-200 hover:shadow-lg transition-all duration-200">
            <div className="h-48 flex items-center justify-center text-6xl bg-neutral-100">
              🌵
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-neutral-900">
                다육식물 세트
              </h3>
              <p className="text-sm mb-3 text-neutral-600">
                관리가 쉬운 미니 다육식물 3종 세트
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-primary-600">
                  18,000원
                </span>
                <button className="px-3 py-1 text-sm rounded transition-colors border border-primary-600 text-primary-600 hover:bg-primary-50">
                  담기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사용법 안내 */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">
          색상 시스템 사용법 - 간단한 방법!
        </h2>
        <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-200">
          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-neutral-900">
                Primary (세이지 그린):
              </strong>
              <span className="text-neutral-600">
                {" "}
                주요 버튼, 링크, 브랜드 색상
              </span>
            </div>
            <div>
              <strong className="text-neutral-900">Secondary (어스톤):</strong>
              <span className="text-neutral-600"> 보조 버튼, 강조 요소</span>
            </div>
            <div>
              <strong className="text-neutral-900">Neutral (그레이):</strong>
              <span className="text-neutral-600"> 텍스트, 배경, 테두리</span>
            </div>
          </div>
          <pre className="text-xs mt-4 p-3 rounded overflow-x-auto bg-neutral-50 text-neutral-600">
            {`// 🎉 이제 이렇게 간단하게 사용하세요!

// 기본 사용법 (권장)
<div className="bg-primary-600 text-white px-4 py-2 rounded-lg">
  Primary 버튼
</div>

<div className="bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
  Secondary 버튼
</div>

<div className="bg-primary-100 p-4 rounded-lg border border-primary-200">
  화분 카드
</div>

// 텍스트 색상
<p className="text-primary-600">세이지 그린 텍스트</p>
<p className="text-neutral-600">보조 텍스트</p>

// 호버 효과
<button className="bg-primary-600 hover:bg-primary-700">
  호버 버튼
</button>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
