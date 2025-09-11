import Link from "next/link";

interface PageEmptyProps {
  title?: string;
  message?: string;
  icon?: string;
  showHomeButton?: boolean;
  homeButtonText?: string;
  customAction?: React.ReactNode;
}

const ProductEmpty = ({
  title = "상품이 없습니다",
  message = "이 카테고리에는 아직 상품이 등록되지 않았습니다.",
  icon = "🛍️",
  showHomeButton = true,
  homeButtonText = "홈으로 돌아가기",
  customAction,
}: PageEmptyProps) => {
  return (
    <div className="text-center py-16">
      {/* 빈 상태 아이콘 */}
      <div className="mb-6">
        <div className="text-6xl mb-4 opacity-60 animate-pulse">{icon}</div>
      </div>

      {/* 빈 상태 메시지 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
        <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 mb-2">{message}</p>
        <p className="text-sm text-gray-500">
          다른 카테고리를 둘러보시거나 홈페이지로 돌아가 주세요.
        </p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {customAction && customAction}

        {showHomeButton && (
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {homeButtonText}
          </Link>
        )}
      </div>

      {/* 추천 액션 */}
      <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="text-sm font-semibold text-primary-700 mb-3">
          다른 카테고리도 둘러보세요:
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            href="/product/category/plants"
            className="px-3 py-1 text-xs bg-white text-primary-600 rounded-full border border-primary-300 hover:bg-primary-100 transition-colors"
          >
            🌱 식물
          </Link>
          <Link
            href="/product/category/flowers"
            className="px-3 py-1 text-xs bg-white text-primary-600 rounded-full border border-primary-300 hover:bg-primary-100 transition-colors"
          >
            🌸 꽃
          </Link>
          <Link
            href="/product/category/pots"
            className="px-3 py-1 text-xs bg-white text-primary-600 rounded-full border border-primary-300 hover:bg-primary-100 transition-colors"
          >
            🪴 화분
          </Link>
          <Link
            href="/product/category/gardening"
            className="px-3 py-1 text-xs bg-white text-primary-600 rounded-full border border-primary-300 hover:bg-primary-100 transition-colors"
          >
            🌿 가드닝
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductEmpty;
