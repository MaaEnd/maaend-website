"use client";

import { motion } from "framer-motion";
import { Activity, GitBranch, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    {
      label: t("about.stats.githubStars"),
      value: "30k+",
      icon: <GitBranch className="h-5 w-5" />,
    },
    {
      label: t("about.stats.dailyUsers"),
      value: "100k+",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      label: t("about.stats.modules"),
      value: "50+",
      icon: <Layers className="h-5 w-5" />,
    },
  ];

  return (
    <section className="relative z-10 overflow-hidden px-6 py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 block font-mono text-sm tracking-widest text-[#c49102] uppercase dark:text-[#FFE600]">
              {t("about.architectureLabel")}
            </span>
            <h2 className="font-heading mb-8 text-5xl leading-tight font-bold text-black md:text-6xl dark:text-white">
              {t("about.title1")} <br />
              <span className="bg-gradient-to-r from-black to-black/40 bg-clip-text text-transparent dark:from-white dark:to-white/40">
                {t("about.title2")}
              </span>
            </h2>

            <div className="space-y-8 text-lg font-light text-black/80 dark:text-white/70">
              <p>{t("about.paragraph1")}</p>
              <p>{t("about.paragraph2")}</p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-black/10 pt-8 dark:border-white/10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="mb-2 flex items-center gap-2 text-[#c49102] dark:text-[#FFE600]">
                    {stat.icon}
                    <span className="font-mono text-xs font-bold">
                      {stat.label}
                    </span>
                  </div>
                  <div className="font-syne text-3xl font-bold text-black dark:text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 aspect-square animate-pulse rounded-full bg-gradient-to-tr from-[#c49102]/10 to-white/5 blur-3xl dark:from-[#FFE600]/10" />
            <div className="glass-panel relative z-10 rounded-2xl border border-black/10 p-8 dark:border-white/10">
              <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/5">
                <span className="font-mono text-xs text-black/60 dark:text-white/50">
                  {t("about.systemLogs")}
                </span>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/20" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#c49102] dark:text-[#FFE600]">
                <p>{t("about.log1")}</p>
                <p className="text-black/60 dark:text-white/50">
                  {t("about.log2")}
                </p>
                <p>{t("about.log3")}</p>
                <p className="text-black dark:text-white">{t("about.log4")}</p>
                <p>{t("about.log5")}</p>
                <p className="text-black/60 dark:text-white/50">
                  {t("about.log6")}
                </p>
                <p>{t("about.log7")}</p>
                <div className="mt-2 h-4 w-2 animate-pulse bg-[#c49102] dark:bg-[#FFE600]" />
              </div>
            </div>

            {/* Decoration Lines */}
            <div className="absolute top-1/2 -right-10 h-[1px] w-40 bg-gradient-to-r from-[#c49102] to-transparent dark:from-[#FFE600]" />
            <div className="absolute -bottom-10 left-1/2 h-40 w-[1px] bg-gradient-to-b from-[#c49102] to-transparent dark:from-[#FFE600]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
