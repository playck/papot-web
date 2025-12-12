"use client";

import { Envelope, WatercolorLeaves } from "@/shared/components";

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f5f0] p-4">
      <WatercolorLeaves />

      <div className="mb-6" />

      <Envelope />
    </div>
  );
}
