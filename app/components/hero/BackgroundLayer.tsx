"use client";

import { useTranslation } from "react-i18next";

// 静态背景装饰层 - 已移除视差动画以提升性能
export default function BackgroundLayer() {
  const { t } = useTranslation();

  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      {/* Hazard Stripes Top/Bottom - 静态版本 */}
      <div className="absolute top-0 right-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#d4a017,#d4a017_10px,#E2E2E2_10px,#E2E2E2_20px)] opacity-20 dark:bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)]" />
      <div className="absolute right-0 bottom-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#d4a017,#d4a017_10px,#E2E2E2_10px,#E2E2E2_20px)] opacity-20 dark:bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)]" />

      {/* Vertical Guide Lines - 静态版本 */}
      <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#E2E2E2] dark:bg-[#00F0FF]/10" />
      <div className="absolute top-0 right-[10%] bottom-0 w-[1px] bg-[#E2E2E2] dark:bg-[#00F0FF]/10" />

      {/* Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:6rem_6rem] dark:bg-[linear-gradient(to_right,#00F0FF05_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF05_1px,transparent_1px)]" />

      {/* Light Mode: Geometric Shapes - 静态版本，保留核心装饰 */}
      <div className="absolute inset-0 opacity-100 dark:opacity-0">
        {/* Geometric Shapes - Top Left */}
        <div className="absolute top-32 left-[5%] h-32 w-32 rotate-45 border-2 border-[#d4a017]/20" />
        <div className="absolute top-40 left-[6%] h-24 w-24 rotate-45 border-2 border-[#008fa6]/15" />

        {/* Geometric Shapes - Top Right */}
        <div className="absolute top-40 right-[8%] h-40 w-40 rounded-full border-2 border-[#d4a017]/15" />
        <div className="absolute top-48 right-[10%] h-28 w-28 rounded-full border-2 border-[#008fa6]/20" />

        {/* Diagonal Lines - Left Side */}
        <div className="absolute top-[20%] left-0 h-[1px] w-[30%] rotate-45 bg-gradient-to-r from-[#d4a017]/20 to-transparent" />
        <div className="absolute top-[35%] left-0 h-[1px] w-[25%] rotate-45 bg-gradient-to-r from-[#008fa6]/15 to-transparent" />
        <div className="absolute top-[50%] left-0 h-[1px] w-[28%] rotate-45 bg-gradient-to-r from-[#d4a017]/15 to-transparent" />

        {/* Diagonal Lines - Right Side */}
        <div className="absolute top-[25%] right-0 h-[1px] w-[35%] -rotate-45 bg-gradient-to-l from-[#d4a017]/20 to-transparent" />
        <div className="absolute top-[45%] right-0 h-[1px] w-[30%] -rotate-45 bg-gradient-to-l from-[#008fa6]/15 to-transparent" />
        <div className="absolute top-[65%] right-0 h-[1px] w-[32%] -rotate-45 bg-gradient-to-l from-[#d4a017]/15 to-transparent" />

        {/* Corner Brackets - Bottom Left */}
        <div className="absolute bottom-32 left-8">
          <div className="h-16 w-16 border-b-2 border-l-2 border-[#d4a017]/30" />
        </div>
        <div className="absolute bottom-40 left-16">
          <div className="h-12 w-12 border-b-2 border-l-2 border-[#008fa6]/25" />
        </div>

        {/* Corner Brackets - Bottom Right */}
        <div className="absolute right-8 bottom-32">
          <div className="h-16 w-16 border-r-2 border-b-2 border-[#d4a017]/30" />
        </div>
        <div className="absolute right-16 bottom-40">
          <div className="h-12 w-12 border-r-2 border-b-2 border-[#008fa6]/25" />
        </div>

        {/* Technical Pattern - Center Background */}
        <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle,#d4a017_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        </div>
      </div>

      {/* HUD Elements - 静态版本 */}
      <div className="absolute top-24 left-8 flex items-center gap-2 font-mono text-[10px] text-[#008fa6]/80 dark:text-[#00F0FF]/60">
        <div className="h-2 w-2 animate-pulse bg-[#008fa6] dark:bg-[#00F0FF]" />
        <span>{t("hero.systemReady")}</span>
      </div>
      <div className="absolute top-24 right-8 font-mono text-[10px] text-black/40 dark:text-white/30">
        ID: MaaEnd-V1-RELEASE
      </div>

      {/* Large Watermark - 静态版本 */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black whitespace-nowrap text-black/[0.02] dark:text-white/[0.02]">
        MaaEnd
      </div>
    </div>
  );
}
