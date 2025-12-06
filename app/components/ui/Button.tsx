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
      "bg-[#FFE600] text-black shadow-[0_0_20px_rgba(255,230,0,0.4)] hover:shadow-[0_0_30px_rgba(255,230,0,0.6)] border border-[#FFE600] hover:bg-[#FFD700]",
    secondary:
      "bg-[#27272A] text-white border border-white/10 hover:border-[#FFE600] hover:text-[#FFE600]",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] hover:shadow-[0_0_15px_rgba(255,230,0,0.2)]",
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
      <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
    </motion.button>
  );
};
