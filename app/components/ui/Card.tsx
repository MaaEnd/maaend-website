"use client";

import React from "react";
import { clsx } from "clsx";

// 性能优化版本：移除 3D 鼠标跟踪效果，使用简单的 CSS hover 效果
export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("relative w-full", className)}>
      <div className="glass-panel relative h-full overflow-hidden rounded-xl border border-black/5 p-6 shadow-sm transition-all duration-300 hover:border-[#c49102]/50 hover:shadow-lg dark:border-white/10 dark:shadow-2xl dark:hover:border-[#FFE600]/50 dark:hover:shadow-[0_4px_20px_rgba(255,230,0,0.15)]">
        {children}
      </div>
    </div>
  );
};
