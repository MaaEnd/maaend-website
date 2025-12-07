"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Book, Github, Languages } from "lucide-react";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-[#E2E2E2] bg-[#F9F9F9]/80 px-6 py-4 backdrop-blur-md dark:border-white/5 dark:bg-[#030305]/50"
    >
      <div className="flex items-center gap-4">
        <span className="font-heading text-xl font-bold tracking-tight text-black dark:text-white">
          MaaEnd
        </span>
      </div>

      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="https://github.com/MaaEnd/MaaEnd"
          className="flex items-center gap-2 font-mono text-sm text-black/80 transition-colors hover:text-[#c49102] dark:text-white/80 dark:hover:text-[#FFE600]"
        >
          <Github size={16} /> {t("header.github")}
        </Link>
        <Link
          href="#"
          className="mr-4 flex items-center gap-2 font-mono text-sm text-black/80 transition-colors hover:text-[#c49102] dark:text-white/80 dark:hover:text-[#FFE600]"
        >
          <Book size={16} /> {t("header.docs")}
        </Link>

        <div className="flex items-center gap-2 border-l border-[#E2E2E2] pl-6 dark:border-white/10">
          <Button
            variant="outline"
            className="h-9 w-9 rounded-full border-[#E2E2E2] p-0 hover:border-[#c49102] hover:text-[#c49102] dark:border-white/10 dark:hover:border-[#ffd000] dark:hover:text-[#ffd000]"
            onClick={toggleLanguage}
            title={i18n.language === "zh" ? "Switch to English" : "切换到中文"}
          >
            <Languages size={16} />
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
