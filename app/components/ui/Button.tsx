"use client";

import { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "relative px-8 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 group overflow-hidden flex items-center justify-center";

  const variants = {
    primary:
      "bg-[#d4a017] text-black shadow-[0_0_20px_rgba(212,160,23,0.4)] hover:shadow-[0_0_30px_rgba(212,160,23,0.6)] border border-[#d4a017] hover:bg-[#c49102] dark:bg-[#FFE600] dark:text-black dark:shadow-[0_0_20px_rgba(255,230,0,0.4)] dark:hover:shadow-[0_0_30px_rgba(255,230,0,0.6)] dark:border-[#FFE600] dark:hover:bg-[#FFD700]",
    secondary:
      "bg-[#F4F4F4] text-black border border-black/10 hover:border-[#c49102] hover:text-[#c49102] dark:bg-[#27272A] dark:text-white dark:border-white/10 dark:hover:border-[#FFE600] dark:hover:text-[#FFE600]",
    outline:
      "bg-transparent text-black border border-black/20 hover:border-[#c49102] hover:text-[#c49102] hover:shadow-[0_0_15px_rgba(196,145,2,0.2)] dark:text-white dark:border-white/20 dark:hover:border-[#FFE600] dark:hover:text-[#FFE600] dark:hover:shadow-[0_0_15px_rgba(255,230,0,0.2)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 translate-y-full bg-black/5 transition-transform duration-300 ease-out group-hover:translate-y-0 dark:bg-white/20" />
    </motion.button>
  );
};
