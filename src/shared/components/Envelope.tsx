"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

interface EnvelopeProps {
  children?: ReactNode;
  className?: string;
}

export function Envelope({ children, className = "" }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [letterOnTop, setLetterOnTop] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLetterOnTop(true);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setLetterOnTop(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`relative w-[448px] h-[308px] lg:w-[640px] lg:h-[440px] cursor-pointer group ${className}`}
      onClick={() => (!isOpen ? setIsOpen(!isOpen) : null)}
      style={{ perspective: "2000px" }}
    >
      {/* 봉투 뒷면 (Envelope Back) */}
      <div className="absolute inset-0 bg-[#d8d4c8] rounded-lg shadow-xl" />

      {/* 편지 (Letter) */}
      <motion.div
        className="absolute left-6 right-6 top-6 h-[280px] lg:left-8 lg:right-8 lg:top-8 lg:h-[400px] shadow-sm flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden"
        initial={{ y: 0 }}
        animate={{
          y: isOpen ? (isLargeScreen ? -240 : -168) : 0,
        }}
        transition={{
          y: {
            delay: isOpen ? 0.77 : 0,
            duration: 0.42,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        style={{ zIndex: letterOnTop ? 8 : 1 }}
      >
        {/* 연한 민트색 배경 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#f0f7f4" }}
        />
        {/* 종이 질감 - 노이즈 텍스처 */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* 미세한 그라데이션 - 입체감 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.02) 100%)",
          }}
        />
        {/* 편지지 가장자리 효과 */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        />
        {/* 내용 */}
        <div className="relative z-10">
          {children || (
            <div
              className="text-center leading-relaxed"
              style={{ fontFamily: "SBAggroM, sans-serif", color: "#49543B" }}
            >
              <p className="text-sm mb-4 lg:text-lg lg:mb-6">파팟(papot)은</p>
              <p className="text-sm mb-4 lg:text-lg lg:mb-6">
                작은 불빛이 켜지는 순간처럼,
              </p>
              <p className="text-sm mb-4 lg:text-lg lg:mb-6">
                일상의 행복에 파팟이 곁에 있었으면 하는
              </p>
              <p className="text-sm mb-6 lg:text-lg lg:mb-10">
                마음을 담았습니다.
              </p>
              <p className="text-sm mb-4 lg:text-lg lg:mb-6">
                파팟은 식물과 사물이 주는
              </p>
              <p className="text-sm lg:text-lg">
                잔잔한 취향과 경험을 공유합니다.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 봉투 앞면 주머니 (Pocket) */}
      <div
        className="absolute inset-0 z-10 bg-[#e6e2d6] rounded-lg drop-shadow-sm pointer-events-none"
        style={{
          clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50"></div>
      </div>

      {/* 봉투 뚜껑 */}
      <motion.div
        className="absolute top-[1px] left-0 right-0 h-[168px] lg:h-[240px] origin-top overflow-hidden"
        initial={{ rotateX: 0 }}
        animate={{
          rotateX: isOpen ? 180 : 0,
        }}
        transition={{
          rotateX: { duration: 0.6, ease: "easeInOut" },
        }}
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          zIndex: letterOnTop ? 5 : 20,
        }}
      >
        {/* 베이스 그라데이션 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #d4c4a8 0%, #c9bfae 40%, #beb3a0 100%)",
          }}
        />
        {/* 상단 하이라이트 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)",
          }}
        />
        {/* 노이즈 텍스처 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* 가장자리 그림자 */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 -2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
      </motion.div>
    </div>
  );
}
