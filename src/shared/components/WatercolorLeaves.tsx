"use client";

export function WatercolorLeaves() {
  return (
    <>
      {/* 공통 SVG 정의 */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
          </filter>
          {/* 다양한 녹색 그라데이션 */}
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a7c59" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8fb996" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5c8a6b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a8d5b8" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="g3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#3d6b4a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7dad8c" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="g4" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b9b7a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b8d4c3" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="g5" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#98c9a3" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#4a7c59" stopOpacity="0.55" />
          </radialGradient>
          <linearGradient id="g6" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#5a8f6a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#98c9a3" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* 왼쪽 잎사귀들 */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-80 overflow-visible opacity-90 md:w-96 lg:w-[28rem]">
        <svg
          className="absolute -left-8 -top-8 h-56 w-56 rotate-[25deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-8 -top-6 h-44 w-44 rotate-[55deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-4 top-8 h-36 w-36 -rotate-[10deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-20 -top-2 h-32 w-32 rotate-[40deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        <svg
          className="absolute left-32 -top-4 h-48 w-48 rotate-[60deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-44 top-2 h-36 w-36 rotate-[30deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-56 top-8 h-32 w-32 rotate-[75deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-40 top-16 h-28 w-28 -rotate-[15deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* ===== 레이어 1 (바깥쪽) ===== */}
        {/* 상단 영역 */}
        <svg
          className="absolute -left-12 top-[2%] h-44 w-44 -rotate-12"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-6 top-[8%] h-32 w-32 rotate-[35deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-4 top-[5%] h-24 w-24 rotate-[70deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-4 top-[15%] h-36 w-24 rotate-[20deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단-중앙 영역 */}
        <svg
          className="absolute -left-14 top-[22%] h-40 w-40 -rotate-[25deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C150 45, 180 95, 165 145 C150 185, 100 195, 65 165 C35 135, 20 85, 40 45 C55 20, 80 15, 100 20"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-4 top-[28%] h-32 w-32 rotate-[50deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-6 top-[25%] h-20 w-20 -rotate-[40deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙 영역 */}
        <svg
          className="absolute -left-10 top-[38%] h-44 w-44 rotate-[15deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-2 top-[45%] h-36 w-36 -rotate-[30deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-8 top-[42%] h-24 w-24 rotate-[80deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙-하단 영역 */}
        <svg
          className="absolute -left-12 top-[55%] h-40 w-40 rotate-[40deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-4 top-[60%] h-32 w-24 rotate-[5deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-4 top-[58%] h-28 w-28 -rotate-[55deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단-중앙 영역 */}
        <svg
          className="absolute -left-14 top-[70%] h-44 w-44 -rotate-[20deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-6 top-[75%] h-36 w-36 rotate-[60deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-6 top-[72%] h-24 w-24 rotate-[30deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단 영역 */}
        <svg
          className="absolute -left-10 top-[85%] h-40 w-40 rotate-[35deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -left-4 top-[92%] h-32 w-32 -rotate-[15deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-2 top-[88%] h-28 w-20 rotate-[25deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-8 top-[95%] h-20 w-20 rotate-[65deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단 영역 */}
        <svg
          className="absolute left-12 top-[1%] h-40 w-40 rotate-[45deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-20 top-[6%] h-32 w-32 -rotate-[20deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-28 top-[12%] h-28 w-28 rotate-[85deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-16 top-[16%] h-36 w-24 rotate-[55deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단-중앙 영역 */}
        <svg
          className="absolute left-14 top-[20%] h-38 w-38 rotate-[30deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C150 45, 180 95, 165 145 C150 185, 100 195, 65 165 C35 135, 20 85, 40 45 C55 20, 80 15, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-24 top-[26%] h-28 w-28 -rotate-[35deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-32 top-[30%] h-24 w-24 rotate-[60deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙 영역 */}
        <svg
          className="absolute left-16 top-[36%] h-40 w-40 -rotate-[10deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-26 top-[43%] h-32 w-32 rotate-[75deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-20 top-[48%] h-28 w-28 -rotate-[45deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙-하단 영역 */}
        <svg
          className="absolute left-12 top-[52%] h-38 w-38 rotate-[20deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-22 top-[57%] h-30 w-22 -rotate-[25deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-28 top-[62%] h-26 w-26 rotate-[50deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단-중앙 영역 */}
        <svg
          className="absolute left-14 top-[68%] h-42 w-42 rotate-[35deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-24 top-[74%] h-32 w-32 -rotate-[50deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-18 top-[78%] h-24 w-24 rotate-[15deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단 영역 */}
        <svg
          className="absolute left-16 top-[83%] h-38 w-38 -rotate-[30deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-26 top-[89%] h-28 w-28 rotate-[70deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-20 top-[94%] h-24 w-20 rotate-[40deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-32 top-[96%] h-20 w-20 -rotate-[20deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        <svg
          className="absolute left-36 bottom-4 h-44 w-44 rotate-[50deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-48 bottom-12 h-36 w-36 rotate-[20deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-56 bottom-2 h-32 w-32 rotate-[80deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute left-44 bottom-20 h-28 w-28 -rotate-[10deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
      </div>

      {/* 오른쪽 잎사귀들 */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-80 overflow-visible opacity-90 md:w-96 lg:w-[28rem]">
        <svg
          className="absolute -right-8 -top-8 h-56 w-56 rotate-[155deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-8 -top-6 h-44 w-44 rotate-[125deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-4 top-8 h-36 w-36 rotate-[190deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-20 -top-2 h-32 w-32 rotate-[140deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        <svg
          className="absolute right-32 -top-4 h-48 w-48 rotate-[120deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-44 top-2 h-36 w-36 rotate-[150deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-56 top-8 h-32 w-32 rotate-[105deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-40 top-16 h-28 w-28 rotate-[195deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단 영역 */}
        <svg
          className="absolute -right-12 top-[2%] h-44 w-44 rotate-[170deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-6 top-[8%] h-32 w-32 rotate-[145deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-4 top-[5%] h-24 w-24 rotate-[110deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-4 top-[15%] h-36 w-24 rotate-[160deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단-중앙 영역 */}
        <svg
          className="absolute -right-14 top-[22%] h-40 w-40 rotate-[200deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C150 45, 180 95, 165 145 C150 185, 100 195, 65 165 C35 135, 20 85, 40 45 C55 20, 80 15, 100 20"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-4 top-[28%] h-32 w-32 rotate-[130deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-6 top-[25%] h-20 w-20 rotate-[220deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙 영역 */}
        <svg
          className="absolute -right-10 top-[38%] h-44 w-44 rotate-[165deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-2 top-[45%] h-36 w-36 rotate-[210deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-8 top-[42%] h-24 w-24 rotate-[100deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙-하단 영역 */}
        <svg
          className="absolute -right-12 top-[55%] h-40 w-40 rotate-[140deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-4 top-[60%] h-32 w-24 rotate-[175deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-4 top-[58%] h-28 w-28 rotate-[235deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단-중앙 영역 */}
        <svg
          className="absolute -right-14 top-[70%] h-44 w-44 rotate-[200deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-6 top-[75%] h-36 w-36 rotate-[120deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-6 top-[72%] h-24 w-24 rotate-[150deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단 영역 */}
        <svg
          className="absolute -right-10 top-[85%] h-40 w-40 rotate-[145deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute -right-4 top-[92%] h-32 w-32 rotate-[195deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-2 top-[88%] h-28 w-20 rotate-[155deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-8 top-[95%] h-20 w-20 rotate-[115deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단 영역 */}
        <svg
          className="absolute right-12 top-[1%] h-40 w-40 rotate-[135deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-20 top-[6%] h-32 w-32 rotate-[200deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-28 top-[12%] h-28 w-28 rotate-[95deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-16 top-[16%] h-36 w-24 rotate-[125deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 상단-중앙 영역 */}
        <svg
          className="absolute right-14 top-[20%] h-38 w-38 rotate-[150deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C150 45, 180 95, 165 145 C150 185, 100 195, 65 165 C35 135, 20 85, 40 45 C55 20, 80 15, 100 20"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-24 top-[26%] h-28 w-28 rotate-[215deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-32 top-[30%] h-24 w-24 rotate-[120deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙 영역 */}
        <svg
          className="absolute right-16 top-[36%] h-40 w-40 rotate-[190deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-26 top-[43%] h-32 w-32 rotate-[105deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-20 top-[48%] h-28 w-28 rotate-[225deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 중앙-하단 영역 */}
        <svg
          className="absolute right-12 top-[52%] h-38 w-38 rotate-[160deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-22 top-[57%] h-30 w-22 rotate-[205deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-28 top-[62%] h-26 w-26 rotate-[130deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단-중앙 영역 */}
        <svg
          className="absolute right-14 top-[68%] h-42 w-42 rotate-[145deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-24 top-[74%] h-32 w-32 rotate-[230deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-18 top-[78%] h-24 w-24 rotate-[165deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        {/* 하단 영역 */}
        <svg
          className="absolute right-16 top-[83%] h-38 w-38 rotate-[210deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 15 C145 35, 175 85, 165 135 C155 175, 105 195, 70 170 C40 145, 25 100, 35 60 C45 30, 75 15, 100 15"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-26 top-[89%] h-28 w-28 rotate-[110deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g4)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-20 top-[94%] h-24 w-20 rotate-[140deg]"
          viewBox="0 0 100 180"
        >
          <path
            d="M50 5 C75 25, 85 65, 80 105 C75 145, 55 175, 40 165 C25 155, 15 115, 20 75 C25 35, 35 10, 50 5"
            fill="url(#g3)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-32 top-[96%] h-20 w-20 rotate-[200deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>

        <svg
          className="absolute right-36 bottom-4 h-44 w-44 rotate-[130deg]"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20 C140 40, 170 80, 160 130 C150 170, 110 190, 80 170 C50 150, 30 110, 40 70 C50 40, 70 20, 100 20"
            fill="url(#g2)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-48 bottom-12 h-36 w-36 rotate-[160deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g6)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-56 bottom-2 h-32 w-32 rotate-[100deg]"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="42"
            fill="url(#g5)"
            filter="url(#watercolor)"
          />
        </svg>
        <svg
          className="absolute right-44 bottom-20 h-28 w-28 rotate-[190deg]"
          viewBox="0 0 150 150"
        >
          <path
            d="M75 10 C110 30, 130 70, 120 110 C110 140, 75 145, 50 120 C25 95, 20 50, 40 25 C55 10, 75 10, 75 10"
            fill="url(#g1)"
            filter="url(#watercolor)"
          />
        </svg>
      </div>
    </>
  );
}
