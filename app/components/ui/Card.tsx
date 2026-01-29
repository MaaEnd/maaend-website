import React from "react";
import { clsx } from "clsx";

// 简化的 Card 组件，使用全局 card-interactive 样式类
export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("relative w-full", className)}>
      <div className="glass-panel card-interactive relative h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};
