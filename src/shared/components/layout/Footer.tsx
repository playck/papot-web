"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div
        className={`container ${
          isMainPage ? "max-w-10xl" : "max-w-7xl"
        } mx-auto px-4 py-12`}
      >
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 회사 소개 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">파팟</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              파팟은 다양한 식물 화분과 도자기를 판매합니다.
            </p>
          </div>

          {/* 고객센터 */}
          {/* <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              고객센터
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/help/faq"
                  className="hover:text-gray-900 transition-colors"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="/help/contact"
                  className="hover:text-gray-900 transition-colors"
                >
                  1:1 문의
                </Link>
              </li>
              <li>
                <Link
                  href="/help/shipping"
                  className="hover:text-gray-900 transition-colors"
                >
                  배송 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/help/return"
                  className="hover:text-gray-900 transition-colors"
                >
                  반품/교환
                </Link>
              </li>
            </ul>
          </div> */}

          {/* 이용안내 */}
          {/* <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              이용안내
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-900 transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-gray-900 transition-colors"
                >
                  이용가이드
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* 사업자 정보 */}
        <div className="border-t border-gray-200 pt-8">
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
                제 2025-인천남동-0000호
              </span>
              <span className="hidden md:inline">|</span>
              <span>
                <strong className="text-gray-700">이메일:</strong>{" "}
                playck@naver.com
              </span>
            </div>
            <div>
              <strong className="text-gray-700">고객센터:</strong> 010 - 5205 -
              8631 (평일 12:00 - 20:00, 목요일 휴무)
            </div>
          </div>

          {/* 저작권 */}
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
