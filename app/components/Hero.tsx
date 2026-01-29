"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "./ui/Button";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Loader2,
  Monitor,
  Shield,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import InteractiveModelOptimized from "./hero/InteractiveModelOptimized";
import BackgroundLayer from "./hero/BackgroundLayer";

// 定义平台和架构类型
type Platform = "win" | "macos" | "linux" | "unknown";
type Arch = "x86_64" | "aarch64" | "unknown";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface ReleaseInfo {
  tag_name: string;
  assets: ReleaseAsset[];
  html_url: string;
}

interface DownloadOption {
  platform: Platform;
  arch: Arch;
  url: string;
  filename: string;
  size: number;
}

// 检测当前系统平台
function detectPlatform(): Platform {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "win";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

// 检测当前系统架构
function detectArch(): Arch {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  // Apple Silicon Mac 检测
  if (
    ua.includes("mac") &&
    (navigator as unknown as { userAgentData?: { platform?: string } })
      ?.userAgentData?.platform === "macOS"
  ) {
    // 使用 userAgentData 检测（现代浏览器）
    return "aarch64";
  }
  // 简单的架构检测逻辑
  if (ua.includes("arm64") || ua.includes("aarch64")) return "aarch64";
  // 默认假设为 x86_64
  return "x86_64";
}

// 获取平台显示名称
function getPlatformDisplayName(platform: Platform): string {
  switch (platform) {
    case "win":
      return "Windows";
    case "macos":
      return "macOS";
    case "linux":
      return "Linux";
    default:
      return "Unknown";
  }
}

// 获取架构显示名称
function getArchDisplayName(arch: Arch): string {
  switch (arch) {
    case "x86_64":
      return "x64";
    case "aarch64":
      return "ARM64";
    default:
      return "Unknown";
  }
}

// 格式化文件大小
function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

// 获取平台图标
function PlatformIcon({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  const size = className?.includes("w-5") ? 20 : 16;

  switch (platform) {
    case "win":
      return <Monitor className={className} />;
    case "macos":
      return (
        <Image
          src="/apple.svg"
          alt="macOS"
          width={size}
          height={size}
          className={`dark:invert ${className}`}
        />
      );
    case "linux":
      return (
        <Image
          src="/linux.svg"
          alt="Linux"
          width={size}
          height={size}
          className={`dark:invert ${className}`}
        />
      );
    default:
      return <Download className={className} />;
  }
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const mirrorLocale = i18n.language?.startsWith("zh") ? "zh" : "en";
  const mirrorDownloadUrl = `https://mirrorchyan.com/${mirrorLocale}/projects?rid=MaaEnd&source=maaend.com`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([]);
  const [currentPlatform, setCurrentPlatform] = useState<Platform>("unknown");
  const [currentArch, setCurrentArch] = useState<Arch>("unknown");
  const [loading, setLoading] = useState(true);

  // 性能优化：移除鼠标视差效果相关逻辑，保持API兼容
  const mousePosition = { x: 0, y: 0 };
  const isDesktop = false;
  // 获取最新 release 信息
  const fetchReleaseInfo = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/MaaEnd/MaaEnd/releases/latest"
      );
      if (!response.ok) throw new Error("Failed to fetch release info");
      const data: ReleaseInfo = await response.json();
      setReleaseInfo(data);

      // 解析 assets 为下载选项
      const options: DownloadOption[] = data.assets
        .filter((asset) => asset.name.endsWith(".zip"))
        .map((asset) => {
          // 解析文件名: MaaEnd-{os}-{arch}-{version}.zip
          const match = asset.name.match(/MaaEnd-(\w+)-(\w+)-v[\d.]+\.zip/);
          if (!match) return null;
          return {
            platform: match[1] as Platform,
            arch: match[2] as Arch,
            url: asset.browser_download_url,
            filename: asset.name,
            size: asset.size,
          };
        })
        .filter((opt): opt is DownloadOption => opt !== null);

      // 排序：Windows > macOS > Linux，每个平台内 x64 在左 ARM64 在右
      const platformOrder: Platform[] = ["win", "macos", "linux"];
      const archOrder: Arch[] = ["x86_64", "aarch64"];
      options.sort((a, b) => {
        const platformDiff =
          platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform);
        if (platformDiff !== 0) return platformDiff;
        return archOrder.indexOf(a.arch) - archOrder.indexOf(b.arch);
      });

      setDownloadOptions(options);
    } catch (error) {
      console.error("Failed to fetch release info:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPlatform(detectPlatform());
    setCurrentArch(detectArch());
    fetchReleaseInfo();
  }, [fetchReleaseInfo]);

  // 使用 useMemo 优化 currentDownload 计算
  const currentDownload = useMemo(() => {
    return (
      downloadOptions.find(
        (opt) => opt.platform === currentPlatform && opt.arch === currentArch
      ) ||
      downloadOptions.find(
        // 如果找不到完全匹配，尝试只匹配平台，默认 x86_64
        (opt) => opt.platform === currentPlatform && opt.arch === "x86_64"
      ) ||
      downloadOptions[0]
    );
  }, [downloadOptions, currentPlatform, currentArch]);

  // 其他下载选项(不包括当前系统) - 暂未使用
  // const otherDownloads = downloadOptions.filter(
  //   (opt) => opt !== currentDownload
  // );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-24 transition-colors duration-300 md:px-16 md:pt-20"
    >
      {/* Industrial Background Layer - 合并所有背景元素 */}
      <BackgroundLayer isDesktop={isDesktop} mousePosition={mousePosition} />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left: Industrial Typography */}
        <div className="col-span-1 flex flex-col pl-0 text-left md:items-start lg:col-span-7 lg:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex w-fit items-center gap-3 border border-[#008fa6]/30 bg-[#008fa6]/5 px-3 py-1 dark:border-[#00F0FF]/30 dark:bg-[#00F0FF]/5"
          >
            <TerminalIcon
              size={12}
              className="text-[#008fa6] dark:text-[#00F0FF]"
            />
            <span className="font-mono text-xs font-bold tracking-widest text-[#008fa6] select-none dark:text-[#00F0FF]">
              {t("hero.neuralOnline")}
            </span>
          </motion.div>

          <motion.h1
            style={{ y: textY }}
            className="font-syne relative mb-6 font-bold text-black dark:text-white"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 lg:gap-10">
              {/* Logo Icon */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="shrink-0"
              >
                <Image
                  src="/MaaEnd-Tiny-512.png"
                  alt="MaaEnd Logo"
                  width={512}
                  height={512}
                  className="h-28 w-28 object-contain sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-56 lg:w-56"
                  priority
                />
              </motion.div>

              <div className="text-center text-[2rem] leading-[0.9] tracking-tighter select-none sm:text-[2.5rem] md:text-left md:text-[3rem] lg:text-[5rem]">
                <span className="block bg-gradient-to-r from-[#d4a017] via-[#c49102] to-black bg-clip-text text-transparent dark:from-[#FFD000] dark:via-[#FFD000] dark:to-white">
                  {t("hero.title")}
                </span>
                <span className="block text-black dark:text-white">
                  {t("hero.subtitle")}
                </span>
                <span className="mt-2 block font-mono text-[1.8rem] tracking-normal text-[#008fa6] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[4.5rem] dark:text-[#00F0FF]">
                  {t("hero.description")}
                </span>
              </div>
            </div>

            {/* Decorative lines attached to text */}
            <div className="absolute top-4 bottom-4 -left-8 w-1 bg-[#d4a017] dark:bg-[#FFD000]" />
            <div className="absolute top-0 -left-8 h-1 w-4 bg-[#d4a017] dark:bg-[#FFD000]" />
            <div className="absolute bottom-0 -left-8 h-1 w-4 bg-[#d4a017] dark:bg-[#FFD000]" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 flex max-w-xl items-start justify-center gap-4 md:justify-start"
          >
            <div className="mt-1.5 text-[#d4a017] dark:text-[#FFD000]">
              <Shield size={20} />
            </div>
            <p className="text-lg leading-relaxed font-light text-black/80 dark:text-white/70">
              {t("hero.tagline")}
              <span className="mt-2 block font-mono text-xs text-[#008fa6] dark:text-[#00F0FF]/60">
                {t("hero.status")}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-20"
          >
            <AnimatePresence mode="popLayout">
              {!showDownloadOptions ? (
                <motion.div
                  key="primary-actions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
                >
                  {/* 主下载按钮 - 自动检测系统 */}
                  <Button
                    variant="primary"
                    className="group relative h-16 overflow-hidden border-none bg-[#fef901] pr-10 pl-8 text-xl font-bold tracking-wide text-black hover:bg-[#fef901] dark:bg-[#FFD000] dark:hover:bg-[#E6CF00]"
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                    onClick={() => {
                      if (currentDownload) {
                        window.open(currentDownload.url, "_blank");
                      }
                    }}
                    disabled={loading || !currentDownload}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          {t("hero.loading")}
                        </>
                      ) : currentDownload ? (
                        <>
                          <PlatformIcon
                            platform={currentDownload.platform}
                            className="h-5 w-5"
                          />
                          {t("hero.downloadFor")}{" "}
                          {getPlatformDisplayName(currentDownload.platform)}{" "}
                          {getArchDisplayName(currentDownload.arch)}
                          <ArrowRight size={20} strokeWidth={3} />
                        </>
                      ) : (
                        <>
                          {t("hero.initCore")}
                          <ArrowRight size={20} strokeWidth={3} />
                        </>
                      )}
                    </span>
                    {/* Warning Stripes on Hover */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000010_10px,#00000010_20px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Button>

                  {/* 更多下载选项按钮 */}
                  <Button
                    variant="outline"
                    className="group relative h-16 w-16 overflow-hidden border-2 border-[#d4a017] bg-transparent p-0 hover:bg-[#d4a017]/10 dark:border-[#FFD000] dark:hover:bg-[#FFD000]/10"
                    style={{
                      clipPath:
                        "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                    }}
                    onClick={() => setShowDownloadOptions(true)}
                    disabled={loading}
                  >
                    <ChevronDown
                      size={24}
                      className="text-[#d4a017] dark:text-[#FFD000]"
                    />
                  </Button>

                  <Button
                    variant="outline"
                    className="group relative h-16 max-w-[320px] overflow-hidden border-2 border-[#008fa6]/60 bg-transparent px-5 text-left text-sm leading-tight font-semibold tracking-normal text-[#008fa6] normal-case hover:border-[#008fa6] hover:bg-[#008fa6]/10 dark:border-[#00F0FF]/60 dark:text-[#00F0FF] dark:hover:border-[#00F0FF] dark:hover:bg-[#00F0FF]/10"
                    style={{
                      clipPath:
                        "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                    }}
                    onClick={() => window.open(mirrorDownloadUrl, "_blank")}
                  >
                    <span className="flex w-full flex-col items-start gap-1">
                      <span>{t("hero.mirrorDownloadLine1")}</span>
                      <span className="flex items-center gap-2">
                        {t("hero.mirrorDownloadLine2")}
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </span>
                    </span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="download-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full max-w-xl border border-[#E2E2E2] bg-[#F4F4F4] p-1 dark:border-white/10 dark:bg-[#09090B]"
                >
                  <div className="border border-black/5 bg-black/5 p-4 dark:border-white/5 dark:bg-white/5">
                    <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-[#d4a017] dark:bg-[#FFD000]" />
                        <span className="font-mono text-xs text-[#d4a017] dark:text-[#FFD000]">
                          {t("hero.selectPlatform")} - {releaseInfo?.tag_name}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowDownloadOptions(false)}
                        className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {downloadOptions.map((opt) => (
                        <Button
                          key={`${opt.platform}-${opt.arch}`}
                          variant="outline"
                          className={`group h-14 justify-between border-black/10 px-4 hover:bg-[#d4a017] hover:text-black dark:hover:bg-[#FFD000] dark:hover:text-black ${
                            opt === currentDownload
                              ? "border-[#d4a017] bg-[#d4a017]/10 dark:border-[#FFD000] dark:bg-[#FFD000]/10"
                              : ""
                          }`}
                          onClick={() => window.open(opt.url, "_blank")}
                        >
                          <span className="flex items-center gap-2">
                            <PlatformIcon
                              platform={opt.platform}
                              className="h-4 w-4 group-hover:stroke-2"
                            />
                            <span className="font-medium">
                              {getPlatformDisplayName(opt.platform)}
                            </span>
                            <span className="text-xs opacity-60">
                              {getArchDisplayName(opt.arch)}
                            </span>
                          </span>
                          <span className="text-xs opacity-60 group-hover:opacity-80">
                            {formatSize(opt.size)}
                          </span>
                        </Button>
                      ))}
                    </div>
                    {/* 查看所有 releases 链接 */}
                    <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
                      <a
                        href="https://github.com/MaaEnd/MaaEnd/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-xs text-black/50 transition-colors hover:text-[#d4a017] dark:text-white/50 dark:hover:text-[#FFD000]"
                      >
                        {t("hero.viewAllReleases")}
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right: Interactive Particle Model */}
        <div className="pointer-events-auto relative col-span-1 hidden h-[500px] lg:col-span-5 lg:block lg:h-[700px]">
          <InteractiveModelOptimized />
        </div>
      </div>
    </section>
  );
}
