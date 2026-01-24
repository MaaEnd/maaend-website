"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = 0;
    let lastTime = Date.now();

    const updateScrollSpeed = () => {
      const currentTime = Date.now();
      const currentScrollY = scrollY.get();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        const speed = deltaY / deltaTime;
        setScrollSpeed(speed);
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    const unsubscribe = scrollY.on("change", updateScrollSpeed);
    return () => unsubscribe();
  }, [scrollY]);

  // 基础速度更慢，根据滚动速度调整
  const baseDuration = 40; // 基础持续时间更长（更慢）
  const speedMultiplier = Math.max(0.5, Math.min(2, 1 + scrollSpeed * 10));
  const dynamicDuration = baseDuration / speedMultiplier;

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[#F4F4F4] py-20 dark:border-white/5 dark:bg-[#030305]">
      {/* Marquee */}
      <div className="group relative mb-16 flex overflow-x-hidden select-none">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: dynamicDuration,
            ease: "linear"
          }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="font-syne stroke-text cyber-gradient-text text-[8vw] font-bold text-transparent opacity-30 transition-opacity duration-300 hover:opacity-100"
            >
              {t("footer.marquee")}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div className="col-span-2">
          <h3 className="font-heading mb-4 text-2xl text-black dark:text-white">
            MaaEnd
          </h3>
          <p className="max-w-sm text-black/60 dark:text-white/50">
            {t("footer.description")}
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[#c49102] dark:text-[#FFE600]">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-2 text-sm text-black/80 dark:text-white/70">
            <li>{t("footer.userGroup")}</li>
            <li>{t("footer.devGroup")}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-black dark:text-white">
            {t("footer.project")}
          </h4>
          <ul className="space-y-2 text-sm text-black/80 dark:text-white/70">
            <li>
              <a
                href="https://github.com/MaaEnd/MaaEnd"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.github")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MaaEnd/MaaEnd/releases"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.releases")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MaaEnd/MaaEnd/issues"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.issues")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 text-center font-mono text-xs text-black/30 dark:text-white/20">
        <div>
          © {new Date().getFullYear()} {t("footer.copyright")}
        </div>
        <div className="mt-2 text-[10px] text-black/40 dark:text-white/30">
          {t("footer.designGoalNote")}
        </div>
      </div>
    </footer>
  );
}
