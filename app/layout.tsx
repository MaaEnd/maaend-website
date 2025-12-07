"use client";

import { DM_Sans, JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import { useEffect } from "react";
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
  useEffect(() => {
    document.title = "MaaEnd - Intelligent Automation";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Advanced AI automation assistant for Arknights: Endfield. Intelligent, Efficient, Cross-platform."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Advanced AI automation assistant for Arknights: Endfield. Intelligent, Efficient, Cross-platform.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <html lang="zh-CN" suppressHydrationWarning>
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
