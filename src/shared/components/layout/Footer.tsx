"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container max-w-10xl mx-auto px-4 py-12">
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* 회사 소개 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">파팟</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              파팟은 다양한 식물 화분과 도자기를 판매합니다.
            </p>
          </div>
        </div>

        {/* 약관 및 정책 링크 */}
        <div className="py-2 md:py-3">
          <div className="flex flex-wrap md:justify-start gap-3 md:gap-6 text-sm">
            <Link
              href="/terms?tab=service"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              이용약관
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link
              href="/terms?tab=privacy"
              className="text-gray-900 hover:text-black font-bold transition-colors"
            >
              개인정보처리방침
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link
              href="/terms?tab=finance"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              전자금융거래 이용약관
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link
              href="/terms?tab=refund"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              환불/취소 정책
            </Link>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="pt-4 md:pt-6">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0">
              <span>
                <strong className="text-gray-700">상호:</strong> 파팟
              </span>
              <span className="hidden md:inline">|</span>
              <span>
                <strong className="text-gray-700">대표:</strong> 이수경
              </span>
              <span className="hidden md:inline">|</span>
              <span>
                <strong className="text-gray-700">사업자등록번호:</strong>{" "}
                234-20-02803
              </span>
            </div>
            <div>
              <strong className="text-gray-700">주소:</strong> 인천광역시 남동구
              문화서로4번길 5-15, 1층(구월동)
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0">
              <span>
                <strong className="text-gray-700">통신판매업신고번호:</strong>{" "}
                제 2025-인천남동구-2080호
              </span>
              <span className="hidden md:inline">|</span>
              <span>
                <strong className="text-gray-700">이메일:</strong>{" "}
                sklee8631@gmail.com
              </span>
            </div>
            <div>
              <strong className="text-gray-700">고객센터:</strong> 010 - 5205 -
              8631 (평일 12:00 - 20:00, 목요일 휴무)
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Papot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
