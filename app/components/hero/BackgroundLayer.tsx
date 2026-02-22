"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function BackgroundLayer() {
  const { t } = useTranslation();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Ambient Aurora Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-[#00F0FF]/10 blur-[120px] dark:bg-[#00F0FF]/15" />
      <div className="absolute top-[20%] right-[-10%] h-[60vh] w-[40vw] rounded-full bg-[#008fa6]/10 blur-[150px] dark:bg-[#00F0FF]/10" />
      <div className="absolute bottom-[-10%] left-[20%] h-[40vh] w-[60vw] rounded-full bg-[#FFD000]/5 blur-[120px] dark:bg-[#FFD000]/10" />

      {/* Subtle Technical Grid Overlay - very soft */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-size-[4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" />

      {/* Modern Sci-Fi HUD Accents */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 sm:top-24 sm:left-8">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#008fa6]/80 dark:text-[#00F0FF]/60">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 bg-[#008fa6] dark:bg-[#00F0FF]"
          />
          <span className="uppercase">{t("hero.systemReady")}</span>
        </div>
        <div className="flex gap-1 opacity-50">
          <div className="h-px w-4 bg-[#008fa6] dark:bg-[#00F0FF]" />
          <div className="h-px w-8 bg-[#008fa6] dark:bg-[#00F0FF]" />
          <div className="h-px w-2 bg-[#008fa6] dark:bg-[#00F0FF]" />
        </div>
      </div>

      <div className="absolute top-12 right-12 flex flex-col items-end gap-1 sm:top-24 sm:right-8">
        <div className="font-mono text-[10px] tracking-widest text-black/40 dark:text-white/30">
          ID: MaaEnd-V1-RELEASE
        </div>
        <div className="flex justify-end gap-1 opacity-50">
          <div className="h-px w-2 bg-black/40 dark:bg-white/40" />
          <div className="h-px w-6 bg-black/40 dark:bg-white/40" />
          <div className="h-px w-3 bg-black/40 dark:bg-white/40" />
        </div>
      </div>

      {/* Elegant Large Watermark - subtle integration */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[8vw] font-black tracking-tighter text-black/1.5 dark:text-white/1.5">
        MaaEnd
      </div>

      {/* Floating Particles/Stars */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen dark:opacity-50">
        <div className="absolute top-[30%] left-[20%] h-0.5 w-0.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
        <div className="absolute top-[60%] left-[80%] h-0.5 w-0.5 rounded-full bg-[#FFD000] shadow-[0_0_10px_#FFD000]" />
        <div className="absolute top-[70%] left-[30%] h-[3px] w-[3px] rounded-full bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />
        <div className="absolute top-[20%] left-[70%] h-px w-px rounded-full bg-white shadow-[0_0_8px_white]" />
      </div>
    </div>
  );
}
