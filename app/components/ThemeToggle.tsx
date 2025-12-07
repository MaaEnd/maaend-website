"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="h-9 w-9 rounded-full border-[#E2E2E2] p-0 hover:border-[#ffd000] hover:text-[#ffd000] dark:border-white/10"
      >
        <Moon size={16} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="h-9 w-9 rounded-full border-[#E2E2E2] p-0 hover:border-[#ffd000] hover:text-[#ffd000] dark:border-white/10 dark:text-white"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
    >
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
