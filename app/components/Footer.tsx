"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FRIEND_LINKS, GITHUB_URLS, QQ_GROUPS } from "../constants";

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

      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-6">
        <div className="col-span-1 md:col-span-2">
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
                href={QQ_GROUPS.USER_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.userGroup")}: {QQ_GROUPS.USER_GROUP}
              </a>
            </li>
            <li>
              <a
                href={QQ_GROUPS.DEV_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.devGroup")}: {QQ_GROUPS.DEV_GROUP}
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
                href={GITHUB_URLS.REPO}
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.github")}
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URLS.RELEASES}
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.releases")}
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URLS.ISSUES}
                className="transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
              >
                {t("footer.issues")}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="mb-4 font-mono text-black dark:text-white">
            {t("footer.friendLinks")}
          </h4>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-black/80 dark:text-white/70">
            {FRIEND_LINKS.map((friend) => (
              <li key={friend.id} className="w-40">
                <a
                  href={friend.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 transition-colors hover:text-[#c49102] dark:hover:text-[#FFE600]"
                >
                  <span className="rounded-sm border border-black/10 bg-white/90 p-0.5 dark:border-white/15 dark:bg-white/10">
                    <Image
                      src={friend.iconSrc}
                      alt={friend.iconAlt}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                  <span className="min-w-0 truncate">{friend.name}</span>
                </a>
              </li>
            ))}
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
