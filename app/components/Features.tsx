"use client";

import { Card } from "./ui/Card";
import { motion } from "framer-motion";
import {
  Calendar,
  Crosshair,
  Map as MapIcon,
  MonitorSmartphone,
  Puzzle,
  Ship,
  ShoppingCart,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const FEATURE_ITEMS: { key: string; Icon: LucideIcon; col: string }[] = [
  { key: "realTimeTask", Icon: Crosshair, col: "md:col-span-2" },
  { key: "combat", Icon: Swords, col: "md:col-span-1" },
  { key: "puzzleSolver", Icon: Puzzle, col: "md:col-span-1" },
  { key: "openWorld", Icon: MapIcon, col: "md:col-span-2" },
  { key: "blueprints", Icon: ShoppingCart, col: "md:col-span-2" },
  { key: "essenceFilter", Icon: Sparkles, col: "md:col-span-1" },
  { key: "dijiang", Icon: Ship, col: "md:col-span-1" },
  { key: "dailyRewards", Icon: Calendar, col: "md:col-span-2" },
  { key: "crossPlatform", Icon: MonitorSmartphone, col: "md:col-span-3" },
];

export default function Features() {
  const { t } = useTranslation();

  const features = FEATURE_ITEMS.map(({ key, Icon, col }) => ({
    title: t(`features.items.${key}.title`),
    desc: t(`features.items.${key}.desc`),
    detail: t(`features.items.${key}.detail`),
    icon: <Icon className="text-[#c49102] dark:text-[#FFE600]" size={32} />,
    col,
  }));
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading mb-4 text-4xl font-bold md:text-6xl">
            {t("features.title")}
          </h2>
          <div className="h-1 w-20 rounded-full bg-[#c49102] dark:bg-[#FFE600]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={f.col}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="group flex h-full min-h-[240px] flex-col justify-between">
                <div className="mb-6 w-fit rounded-lg border border-black/5 bg-black/5 p-3 backdrop-blur-md transition-colors group-hover:border-[#c49102]/50 dark:border-white/5 dark:bg-white/5 dark:group-hover:border-[#FFE600]/50">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-heading mb-1 text-2xl font-bold text-black transition-colors group-hover:text-[#c49102] dark:text-white dark:group-hover:text-[#FFE600]">
                    {f.title}
                  </h3>
                  <p className="mb-3 font-mono text-xs tracking-wider text-[#c49102] uppercase dark:text-[#FFE600]">
                    {f.desc}
                  </p>
                  <p className="text-sm leading-relaxed text-black/70 dark:text-white/60">
                    {f.detail}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
