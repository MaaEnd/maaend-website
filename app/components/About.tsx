"use client";

import { motion } from "framer-motion";
import { Activity, GitBranch, Layers } from "lucide-react";

export default function About() {
  const stats = [
    {
      label: "GitHub Stars",
      value: "30k+",
      icon: <GitBranch className="h-5 w-5" />,
    },
    {
      label: "Daily Users",
      value: "100k+",
      icon: <Activity className="h-5 w-5" />,
    },
    { label: "Modules", value: "50+", icon: <Layers className="h-5 w-5" /> },
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
            <span className="mb-4 block font-mono text-sm tracking-widest text-[#FFE600] uppercase">
              Architecture
            </span>
            <h2 className="font-heading mb-8 text-5xl leading-tight font-bold md:text-6xl">
              AI-FIRST <br />
              <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                AUTOMATION SYSTEM
              </span>
            </h2>

            <div className="space-y-8 text-lg font-light text-white/70">
              <p>
                MAE
                不仅仅是一个脚本，它是基于下一代图像识别技术的智能自动化平台。
                通过深度学习模型与即时决策算法，它能够像人类玩家一样思考，但拥有机器般的精确与稳定。
              </p>
              <p>
                开源、安全、透明。MAE
                由社区驱动，为全球数百万管理员提供最可靠的后勤保障。 无论是在
                Windows 上的高性能模拟器，还是 Android 原生环境，MAE
                都能提供一致的极致体验。
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="mb-2 flex items-center gap-2 text-[#FFE600]">
                    {stat.icon}
                    <span className="font-mono text-xs font-bold">
                      {stat.label}
                    </span>
                  </div>
                  <div className="font-syne text-3xl font-bold">
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
            <div className="absolute inset-0 aspect-square animate-pulse rounded-full bg-gradient-to-tr from-[#FFE600]/10 to-white/5 blur-3xl" />
            <div className="glass-panel relative z-10 rounded-2xl border border-white/10 p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <span className="font-mono text-xs text-white/50">
                  SYSTEM_LOGS
                </span>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/20" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#FFE600]">
                <p>&gt; Initializing Neural Engine...</p>
                <p className="text-white/50">
                  &gt; Loading modules: OCR, Pathfinding, Strategy
                </p>
                <p>&gt; Optimizing infrastructure routing...</p>
                <p className="text-white">&gt; DETECTED: Sanity Full</p>
                <p>&gt; Executing: Auto_Clear_Stage_1-7</p>
                <p className="text-white/50">&gt; Efficiency gain: +300%</p>
                <p>&gt; Status: OPERATIONAL</p>
                <div className="mt-2 h-4 w-2 animate-pulse bg-[#FFE600]" />
              </div>
            </div>

            {/* Decoration Lines */}
            <div className="absolute top-1/2 -right-10 h-[1px] w-40 bg-gradient-to-r from-[#FFE600] to-transparent" />
            <div className="absolute -bottom-10 left-1/2 h-40 w-[1px] bg-gradient-to-b from-[#FFE600] to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
