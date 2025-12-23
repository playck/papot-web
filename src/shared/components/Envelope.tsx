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
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1920px)");

  const envelopeSize = isDesktop
    ? { width: 619, height: 426, marginTop: 0 }
    : isLaptop
    ? { width: 507, height: 349, marginTop: "5vh" }
    : { width: 358, height: 246, marginTop: 0 };

  const letterSize = isDesktop
    ? { inset: 31, height: 387, padding: 44 }
    : isLaptop
    ? { inset: 22, height: 317, padding: 35 }
    : { inset: 20, height: 224, padding: 24 };

  const flapHeight = isDesktop ? 280 : isLaptop ? 230 : 160;
  const letterY = isDesktop ? -290 : isLaptop ? -238 : -170;
  const lidRadius = 10;
  const w = envelopeSize.width;
  const h = flapHeight;

  const lidClipPath = `path('M 0 ${lidRadius} Q 0 0 ${lidRadius} 0 L ${
    w - lidRadius
  } 0 Q ${w} 0 ${w} ${lidRadius} L ${w / 2} ${h} Z')`;

  const fontSize = isDesktop ? "1.125rem" : "0.875rem";
  const marginBottom = isDesktop ? 24 : 12;

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
      className={`relative cursor-pointer group ${className}`}
      onClick={() => (!isOpen ? setIsOpen(!isOpen) : null)}
      style={{
        width: envelopeSize.width,
        height: envelopeSize.height,
        marginTop: envelopeSize.marginTop,
        perspective: "2000px",
      }}
    >
      {/* 봉투 뒷면 - 안쪽 면 역할을 함 */}
      <div className="absolute inset-0 bg-[#6d5a45] rounded-lg shadow-xl overflow-hidden">
        <TextureOverlay />
        <InnerLiningPattern />
        {/* 안쪽 깊숙한 곳의 그림자 */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 편지 */}
      <motion.div
        className="absolute shadow-sm flex flex-col items-center justify-center overflow-hidden"
        initial={{ y: 0 }}
        animate={{
          y: isOpen ? letterY : 0,
        }}
        transition={{
          y: {
            delay: isOpen ? 0.77 : 0,
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
        style={{
          left: letterSize.inset,
          right: letterSize.inset,
          top: letterSize.inset,
          height: letterSize.height,
          padding: letterSize.padding,
          zIndex: letterOnTop ? 8 : 1,
        }}
      >
        {/* 오래된 편지지 베이스 - 빛바랜 노란색 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#fcf8e8" }}
        />

        {/* 편지지 텍스처 */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* 편지지 얼룩/물자국 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(139, 69, 19, 0.08) 0%, transparent 25%), radial-gradient(circle at 95% 80%, rgba(139, 69, 19, 0.08) 0%, transparent 30%)",
          }}
        />

        {/* 편지지 구겨짐 자국 */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.4) 50%, transparent 60%)",
          }}
        />

        {/* 편지지 줄무늬 (낡아서 흐릿함) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(160, 130, 100, 0.15) 96%)",
            backgroundSize: "100% 2rem",
            backgroundPosition: "0 1.5rem",
          }}
        />

        {/* 편지지 가장자리 변색 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 35px rgba(139, 69, 19, 0.12), inset 0 0 10px rgba(139, 69, 19, 0.15)",
          }}
        />

        {/* 내용 */}
        <div className="relative z-10 w-full">
          {children || (
            <div
              className="text-center leading-loose"
              style={{
                fontFamily: "'Times New Roman', 'Batang', serif",
                color: "#4a3b32",
                textShadow: "0 0 1px rgba(74, 59, 50, 0.2)",
              }}
            >
              <p style={{ fontSize, marginBottom }}>파팟(papot)은</p>
              <p style={{ fontSize, marginBottom }}>
                작은 불빛이 켜지는 순간처럼,
              </p>
              <p style={{ fontSize, marginBottom }}>
                일상의 행복에 파팟이 곁에 있었으면 하는
              </p>
              <p
                style={{ fontSize, marginBottom: isDesktop ? "20px" : "16px" }}
              >
                마음을 담았습니다.
              </p>
              <p style={{ fontSize, marginBottom }}>
                파팟은 식물과 사물이 주는
              </p>
              <p style={{ fontSize }}>잔잔한 취향과 경험을 공유합니다.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 봉투 앞면 주머니 */}
      <div className="absolute inset-0 z-10 rounded-lg overflow-hidden drop-shadow-sm pointer-events-none">
        <div
          className="w-full h-full bg-[#e0d6c6]"
          style={{
            clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-50"></div>
          <TextureOverlay />
        </div>
      </div>

      {/* 봉투 뚜껑 */}
      <motion.div
        className="absolute left-0 right-0 origin-top overflow-hidden"
        initial={{ rotateX: 0 }}
        animate={{
          rotateX: isOpen ? 180 : 0,
        }}
        transition={{
          rotateX: { duration: 0.6, ease: "easeInOut" },
        }}
        style={{
          top: 0,
          height: flapHeight,
          clipPath: lidClipPath,
          zIndex: letterOnTop ? 5 : 20,
        }}
      >
        {/* 베이스 그라데이션 - 낡은 종이의 얼룩덜룩함 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #dcd3c5 0%, #d1c5b4 40%, #c4b6a2 100%)",
          }}
        />
        {/* 상단 하이라이트 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)",
          }}
        />

        {/* 텍스처 오버레이 */}
        <TextureOverlay />

        {/* 뚜껑 가장자리 그림자 */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 -2px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
      </motion.div>
    </div>
  );
}

// 낡은 종이 질감 오버레이
const TextureOverlay = () => (
  <>
    {/* 1. 거친 종이 노이즈 */}
    <div
      className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }}
    />

    {/* 2. 불규칙한 얼룩과 변색 */}
    <div
      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(139,69,19,0.12) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(101,67,33,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(160,82,45,0.08) 0%, transparent 40%)",
      }}
    />

    {/* 3. 미세한 스크래치/구김 효과 */}
    <div
      className="absolute inset-0 pointer-events-none opacity-10 mix-blend-color-burn"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px), repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)`,
      }}
    />

    {/* 4. 낡은 가장자리 - 진한 그을림 */}
    <div
      className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
      style={{
        boxShadow:
          "inset 0 0 50px rgba(60, 40, 20, 0.25), inset 0 0 15px rgba(50, 30, 10, 0.3)",
      }}
    />
  </>
);

// 안쪽 면 패턴
const InnerLiningPattern = () => (
  <div
    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0M10 20L20 10M0 10L10 0' stroke='%233e2b15' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
      backgroundSize: "16px 16px",
    }}
  />
);
