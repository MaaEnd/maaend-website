"use client";

import { DM_Sans, JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./globals.css";
import "../i18n";
import { ThemeProvider } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t, i18n } = useTranslation();

  // 依赖 i18n.language 确保语言切换时更新标题和描述
  useEffect(() => {
    document.title = t("metadata.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("metadata.description"));
    }
  }, [i18n.language, t]);

  return (
    <html
      lang={i18n.language === "zh" ? "zh-CN" : "en"}
      suppressHydrationWarning
    >
      <head>
        {/* 静态默认 metadata，避免 SSR 时标题/描述为空 */}
        <title>MaaEnd - Intelligent Automation</title>
        <meta
          name="description"
          content="Advanced AI automation assistant for Arknights: Endfield. Intelligent, Efficient, Cross-platform."
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} bg-background text-foreground overflow-x-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
