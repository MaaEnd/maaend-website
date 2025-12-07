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
  Shield,
  Smartphone,
  Server,
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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#09090B] px-4 pt-20 md:px-10"
    >
      {/* Industrial Background Layer */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {/* Hazard Stripes Top/Bottom */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)] opacity-20" />
        <div className="absolute right-0 bottom-0 left-0 h-2 bg-[repeating-linear-gradient(45deg,#FFD000,#FFD000_10px,#000_10px,#000_20px)] opacity-20" />

        {/* Vertical Guide Lines */}
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#00F0FF]/10" />
        <div className="absolute top-0 right-[10%] bottom-0 w-[1px] bg-[#00F0FF]/10" />

        {/* Technical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F0FF05_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF05_1px,transparent_1px)] bg-[size:6rem_6rem]" />

        {/* HUD Elements */}
        <div className="absolute top-24 left-8 flex items-center gap-2 font-mono text-[10px] text-[#00F0FF]/60">
          <div className="h-2 w-2 animate-pulse bg-[#00F0FF]" />
          <span>{t("hero.systemReady")}</span>
        </div>
        <div className="absolute top-24 right-8 font-mono text-[10px] text-white/30">
          ID: MaaEnd-V5-RELEASE
        </div>

        {/* Large Watermark */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black whitespace-nowrap text-white/[0.02]">
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
            className="mb-4 inline-flex w-fit items-center gap-3 border border-[#00F0FF]/30 bg-[#00F0FF]/5 px-3 py-1"
          >
            <TerminalIcon size={12} className="text-[#00F0FF]" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#00F0FF] select-none">
              {t("hero.neuralOnline")}
            </span>
          </motion.div>

          <motion.h1
            style={{ y: textY }}
            className="font-syne relative mb-6 font-bold text-white"
          >
            <div className="text-[3rem] leading-[0.9] tracking-tighter select-none md:text-[4rem] lg:text-[5rem]">
              <span className="block bg-gradient-to-r from-[#FFD000] to-white bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
              <span className="block text-white">{t("hero.subtitle")}</span>
              <span className="mt-2 block font-mono text-[2.5rem] tracking-normal text-[#00F0FF] md:text-[3.5rem] lg:text-[4.5rem]">
                {t("hero.description")}
              </span>
            </div>

            {/* Decorative lines attached to text */}
            <div className="absolute top-4 bottom-4 -left-8 w-1 bg-[#FFD000]" />
            <div className="absolute top-0 -left-8 h-1 w-4 bg-[#FFD000]" />
            <div className="absolute bottom-0 -left-8 h-1 w-4 bg-[#FFD000]" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 flex max-w-xl items-start gap-4"
          >
            <div className="mt-1.5 text-[#FFD000]">
              <Shield size={20} />
            </div>
            <p className="text-lg leading-relaxed font-light text-white/70">
              {t("hero.tagline")}
              <span className="mt-2 block font-mono text-xs text-[#00F0FF]/60">
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
                    className="group relative h-16 overflow-hidden border-none bg-[#FFD000] pr-10 pl-8 text-xl font-bold tracking-wide text-black hover:bg-[#E6CF00]"
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

                  <div className="hidden flex-col gap-1 font-mono text-[10px] text-white/30 md:flex">
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
                  className="w-full max-w-xl border border-white/10 bg-[#09090B] p-1"
                >
                  <div className="border border-white/5 bg-white/5 p-4">
                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-[#FFD000]" />
                        <span className="font-mono text-xs text-[#FFD000]">
                          {t("hero.selectModule")}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowDownloadOptions(false)}
                        className="text-white/50 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-white/10 hover:bg-[#FFD000] hover:text-black"
                      >
                        <Monitor
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.windows")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-white/10 hover:bg-[#FFD000] hover:text-black"
                      >
                        <Apple
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.macos")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-white/10 hover:bg-[#FFD000] hover:text-black"
                      >
                        <Server
                          size={16}
                          className="mr-2 group-hover:stroke-2"
                        />{" "}
                        {t("hero.linux")}
                      </Button>
                      <Button
                        variant="outline"
                        className="group h-12 justify-start border-white/10 hover:bg-[#FFD000] hover:text-black"
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
