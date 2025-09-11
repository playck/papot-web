interface PageLoaderProps {
  title: string;
  subtitle?: string;
}

const PageLoader = ({ title, subtitle }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* 페이지 헤더 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <div className="w-32 h-1 bg-primary-600 mx-auto rounded-full"></div>
          {subtitle && <p className="text-gray-600 mt-4">{subtitle}</p>}
        </div>

        {/* 로딩 상태 */}
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">상품을 불러오는 중 입니다..</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
