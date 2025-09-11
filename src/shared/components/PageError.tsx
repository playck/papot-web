import Link from "next/link";

interface PageErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
}

const PageError = ({
  title = "오류가 발생했습니다",
  message = "요청을 처리하는 중 문제가 발생했습니다.",
  showHomeButton = true,
  showRefreshButton = true,
}: PageErrorProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 에러 일러스트 */}
          <div className="mb-8">
            <div className="relative inline-block text-8xl">⚠️</div>
          </div>

          {/* 에러 메시지 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 mb-2">{message}</p>
            <p className="text-sm text-gray-500">
              잠시 후 다시 시도해주시거나, 홈페이지로 돌아가 주세요.
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {showRefreshButton && (
              <button
                onClick={handleRefresh}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                다시 시도
              </button>
            )}

            {showHomeButton && (
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
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
                홈으로 돌아가기
              </Link>
            )}
          </div>

          {/* 추가 정보 */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              문제가 계속 발생한다면:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 인터넷 연결을 확인해보세요</li>
              <li>• 페이지를 새로고침해보세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageError;
