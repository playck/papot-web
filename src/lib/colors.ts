/**
 * 색상 시스템 - 간단한 버전
 *
 * 🌿 Primary (세이지 그린): #5a7a5a
 * 🌾 Secondary (어스톤): #826b4a
 * ⚪ Neutral (그레이): 다양한 그레이 톤
 *
 * 사용법:
 * className="bg-primary-600 text-white"
 * className="bg-secondary-100 text-secondary-700"
 * className="hover:bg-primary-700"
 */

// 색상 팔레트 참조용 (직접 클래스명 사용을 권장)
export const colors = {
  primary: {
    50: "primary-50", // #f7f9f7 - 매우 연한 세이지
    100: "primary-100", // #eef2ee - 연한 세이지
    200: "primary-200", // #dce5dc
    300: "primary-300", // #bdd0bd
    400: "primary-400", // #96b396
    500: "primary-500", // #739673 - 중간 세이지
    600: "primary-600", // #5a7a5a - 진한 세이지 (주요 색상)
    700: "primary-700", // #486248 - 더 진한 세이지
    800: "primary-800", // #3a4f3a
    900: "primary-900", // #2f412f
    950: "primary-950", // #1e2a1e
  },
  secondary: {
    50: "secondary-50", // #faf9f7 - 매우 연한 베이지
    100: "secondary-100", // #f2f0ec - 연한 베이지
    200: "secondary-200", // #e4dfd6
    300: "secondary-300", // #d1c7b5
    400: "secondary-400", // #b8a688
    500: "secondary-500", // #9f8660 - 중간 어스톤
    600: "secondary-600", // #826b4a - 진한 어스톤
    700: "secondary-700", // #6b563c - 더 진한 브라운
    800: "secondary-800", // #564632
    900: "secondary-900", // #463a2a
    950: "secondary-950", // #2d2419
  },
  neutral: {
    50: "neutral-50", // 매우 연한 그레이
    100: "neutral-100", // 연한 그레이
    200: "neutral-200", //
    300: "neutral-300", //
    400: "neutral-400", //
    500: "neutral-500", // 중간 그레이
    600: "neutral-600", // 진한 그레이
    700: "neutral-700", //
    800: "neutral-800", //
    900: "neutral-900", // 매우 진한 그레이
    950: "neutral-950", //
  },
} as const;

// 조건부 클래스가 필요할 때만 사용하는 헬퍼 (선택사항)
export const combineColorClasses = (
  ...classes: (string | undefined | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
