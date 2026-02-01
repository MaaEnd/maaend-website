"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// QQ 群号和链接常量
const USER_QQ_GROUP = "1082597011";
const DEV_QQ_GROUP = "1072587329";
const USER_QQ_GROUP_LINK = "https://qm.qq.com/q/9IMcuQ55ny";
const DEV_QQ_GROUP_LINK = "https://qm.qq.com/q/EyirQpBiW4";

export default function Footer() {
  const { t } = useTranslation();

  // 性能优化：使用固定速度，移除滚动速度检测
  const marqueeDuration = 200;

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[#F4F4F4] py-20 dark:border-white/5 dark:bg-[#030305]">
      {/* Marquee */}
      <div className="group relative mb-16 flex overflow-x-hidden select-none">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: marqueeDuration,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="font-syne stroke-text cyber-gradient-text text-[4rem] font-bold text-transparent opacity-30 md:text-[9rem]"
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
            <li>
              <a
                href={USER_QQ_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.userGroup")}: {USER_QQ_GROUP}
              </a>
            </li>
            <li>
              <a
                href={DEV_QQ_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.devGroup")}: {DEV_QQ_GROUP}
              </a>
            </li>
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
