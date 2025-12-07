"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "./ui/Button";
import {
  Apple,
  ArrowRight,
  Monitor,
  Server,
  Shield,
  Smartphone,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import InteractiveModel from "./InteractiveModel";

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-20 transition-colors duration-300 md:px-10"
    >
      {/* Industrial Background Layer */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {/* Hazard Stripes Top/Bottom */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#d4a017,#d4a017_10px,#E2E2E2_10px,#E2E2E2_20px)] opacity-20 dark:bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)]" />
        <div className="absolute right-0 bottom-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#d4a017,#d4a017_10px,#E2E2E2_10px,#E2E2E2_20px)] opacity-20 dark:bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)]" />

        {/* Vertical Guide Lines */}
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#E2E2E2] dark:bg-[#00F0FF]/10" />
        <div className="absolute top-0 right-[10%] bottom-0 w-[1px] bg-[#E2E2E2] dark:bg-[#00F0FF]/10" />

        {/* Technical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:6rem_6rem] dark:bg-[linear-gradient(to_right,#00F0FF05_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF05_1px,transparent_1px)]" />

        {/* Light Mode: Additional Background Elements */}
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

          {/* Data Flow Lines */}
          <div className="absolute top-[30%] left-[15%] h-[1px] w-[20%] bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent">
            <div className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-[#d4a017]" />
          </div>
          <div className="absolute top-[60%] right-[15%] h-[1px] w-[25%] bg-gradient-to-l from-transparent via-[#008fa6]/25 to-transparent">
            <div className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-[#008fa6]" />
          </div>

          {/* Technical Pattern - Center Background */}
          <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle,#d4a017_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          </div>

          {/* Floating Hexagons */}
          <div className="absolute top-[25%] left-[20%] h-12 w-12 rotate-12 opacity-30">
            <div className="hexagon border-2 border-[#d4a017]" />
          </div>
          <div className="absolute top-[70%] right-[25%] h-16 w-16 -rotate-12 opacity-25">
            <div className="hexagon border-2 border-[#008fa6]" />
          </div>
        </div>

        {/* HUD Elements */}
        <div className="absolute top-24 left-8 flex items-center gap-2 font-mono text-[10px] text-[#008fa6]/80 dark:text-[#00F0FF]/60">
          <div className="h-2 w-2 animate-pulse bg-[#008fa6] dark:bg-[#00F0FF]" />
          <span>{t("hero.systemReady")}</span>
        </div>
        <div className="absolute top-24 right-8 font-mono text-[10px] text-black/40 dark:text-white/30">
          ID: MaaEnd-V5-RELEASE
        </div>

        {/* Large Watermark */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black whitespace-nowrap text-black/[0.02] dark:text-white/[0.02]">
          MaaEnd
        </div>
      </div>

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left: Industrial Typography */}
        <div className="col-span-1 flex flex-col justify-center pl-0 text-left lg:col-span-7 lg:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex w-fit items-center gap-3 border border-[#008fa6]/30 bg-[#008fa6]/5 px-3 py-1 dark:border-[#00F0FF]/30 dark:bg-[#00F0FF]/5"
          >
            <TerminalIcon
              size={12}
              className="text-[#008fa6] dark:text-[#00F0FF]"
            />
            <span className="font-mono text-xs font-bold tracking-widest text-[#008fa6] dark:text-[#00F0FF] select-none">
              {t("hero.neuralOnline")}
            </span>
          </motion.div>

          <motion.h1
            style={{ y: textY }}
            className="font-syne relative mb-6 font-bold text-black dark:text-white"
          >
            <div className="text-[3rem] leading-[0.9] tracking-tighter select-none md:text-[4rem] lg:text-[5rem]">
              <span className="block bg-gradient-to-r from-[#d4a017] via-[#c49102] to-black bg-clip-text text-transparent dark:from-[#FFD000] dark:via-[#FFD000] dark:to-white">
                {t("hero.title")}
              </span>
              <span className="block text-black dark:text-white">
                {t("hero.subtitle")}
              </span>
              <span className="mt-2 block font-mono text-[2.5rem] tracking-normal text-[#008fa6] md:text-[3.5rem] lg:text-[4.5rem] dark:text-[#00F0FF]">
                {t("hero.description")}
              </span>
            </div>

            {/* Decorative lines attached to text */}
            <div className="absolute top-4 bottom-4 -left-8 w-1 bg-[#d4a017] dark:bg-[#FFD000]" />
            <div className="absolute top-0 -left-8 h-1 w-4 bg-[#d4a017] dark:bg-[#FFD000]" />
            <div className="absolute bottom-0 -left-8 h-1 w-4 bg-[#d4a017] dark:bg-[#FFD000]" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 flex max-w-xl items-start gap-4"
          >
            <div className="mt-1.5 text-[#d4a017] dark:text-[#FFD000]">
              <Shield size={20} />
            </div>
            <p className="text-lg leading-relaxed font-light text-black/80 dark:text-white/70">
              {t("hero.tagline")}
              <span className="mt-2 block font-mono text-xs text-[#008fa6] dark:text-[#00F0FF]/60">
                {t("hero.status")}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-20"
          >
            <AnimatePresence mode="popLayout">
              {!showDownloadOptions ? (
                <motion.div
                  key="primary-actions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-6"
                >
                  {/* Industrial Button */}
                  <Button
                    variant="primary"
                    className="group relative h-16 overflow-hidden border-none bg-[#fef901] pr-10 pl-8 text-xl font-bold tracking-wide text-black hover:bg-[#fef901] dark:bg-[#FFD000] dark:hover:bg-[#E6CF00]"
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                    onClick={() => setShowDownloadOptions(true)}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {t("hero.initCore")}{" "}
                      <ArrowRight size={20} strokeWidth={3} />
                    </span>
                    {/* Warning Stripes on Hover */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000010_10px,#00000010_20px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Button>

                  <div className="hidden flex-col gap-1 font-mono text-[10px] text-black/50 md:flex dark:text-white/30">
                    <span>{t("hero.version")}: 5.0.0</span>
                    <span>{t("hero.build")}: 114514</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="download-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full max-w-xl border border-[#E2E2E2] bg-[#F4F4F4] p-1 dark:border-white/10 dark:bg-[#09090B]"
                >
                  <div className="border border-black/5 bg-black/5 p-4 dark:border-white/5 dark:bg-white/5">
                    <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-[#d4a017] dark:bg-[#FFD000]" />
                        <span className="font-mono text-xs text-[#d4a017] dark:text-[#FFD000]">
                          {t("hero.selectModule")}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowDownloadOptions(false)}
                        className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-black/10 hover:bg-[#d4a017] hover:text-black dark:border-white/10 dark:hover:bg-[#FFD000]"
                      >
                        <Monitor
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.windows")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-black/10 hover:bg-[#d4a017] hover:text-black dark:border-white/10 dark:hover:bg-[#FFD000]"
                      >
                        <Apple
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.macos")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-black/10 hover:bg-[#d4a017] hover:text-black dark:border-white/10 dark:hover:bg-[#FFD000]"
                      >
                        <Server
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.linux")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-black/10 hover:bg-[#d4a017] hover:text-black dark:border-white/10 dark:hover:bg-[#FFD000]"
                      >
                        <Smartphone
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.android")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right: Interactive Particle Model */}
        <div className="pointer-events-auto relative col-span-1 hidden h-[500px] lg:col-span-5 lg:block lg:h-[700px]">
          <InteractiveModel />
        </div>
      </div>
    </section>
  );
}
