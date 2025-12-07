"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const ArchitectureModel = ({ isDark }: { isDark: boolean }) => {
  const count = 5000;
  const mesh = useRef<THREE.Points>(null);
  // Using useMemo to cache random values - only computed once on mount
  const _particles = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    // Math.random() is safe here as it's memoized and only runs once on mount
    const temp = [];

    // 塔的总高度
    const towerHeight = 8;
    const baseY = -4; // 底部位置（往下移动让顶部完整显示）

    // 1. 主塔身 - 底部宽大向上逐渐收窄的锥形结构 (四面体框架)
    for (let i = 0; i < count * 0.25; i++) {
      const t = Math.random(); // 0 = 底部, 1 = 顶部
      const y = baseY + t * towerHeight * 0.7;

      // 半径随高度减小 (底部2.0, 顶部0.3)
      const radius = 2.0 - t * 1.7;

      // 四边形框架的边缘
      const edge = Math.floor(Math.random() * 4);
      const baseAngle = (edge / 4) * Math.PI * 2 + Math.PI / 4;
      const nextAngle = ((edge + 1) / 4) * Math.PI * 2 + Math.PI / 4;
      const lerp = Math.random();

      const angle = baseAngle + lerp * (nextAngle - baseAngle);
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.05;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.05;

      temp.push(x, y, z);
    }

    // 2. 垂直支撑柱 (四根主柱从底部延伸到顶部)
    for (let pillar = 0; pillar < 4; pillar++) {
      const angle = (pillar / 4) * Math.PI * 2 + Math.PI / 4;
      for (let i = 0; i < count * 0.04; i++) {
        const t = Math.random();
        const y = baseY + t * towerHeight * 0.7;
        const radius = 2.0 - t * 1.7;

        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.08;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.08;

        temp.push(x, y, z);
      }
    }

    // 3. 水平横梁结构 (多层平台)
    const platforms = [0.0, 0.25, 0.5, 0.7];
    for (const pLevel of platforms) {
      const y = baseY + pLevel * towerHeight * 0.7;
      const radius = 2.0 - pLevel * 1.7;

      for (let i = 0; i < count * 0.03; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = radius * (0.3 + Math.random() * 0.7);

        const x = Math.cos(angle) * r + (Math.random() - 0.5) * 0.05;
        const z = Math.sin(angle) * r + (Math.random() - 0.5) * 0.05;

        temp.push(x, y + (Math.random() - 0.5) * 0.1, z);
      }
    }

    // 4. 能量环 (围绕塔身的悬浮光环)
    const energyRings = [
      { y: baseY + towerHeight * 0.3, radius: 2.8, particles: 0.06 },
      { y: baseY + towerHeight * 0.55, radius: 2.0, particles: 0.05 },
      { y: baseY + towerHeight * 0.75, radius: 1.2, particles: 0.04 },
    ];

    for (const ring of energyRings) {
      for (let i = 0; i < count * ring.particles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = ring.radius + (Math.random() - 0.5) * 0.15;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = ring.y + (Math.random() - 0.5) * 0.08;

        temp.push(x, y, z);
      }
    }

    // 5. 顶部天线结构 (细长的能量发射器)
    const antennaBase = baseY + towerHeight * 0.7;
    const antennaHeight = towerHeight * 0.35;

    // 主天线柱
    for (let i = 0; i < count * 0.08; i++) {
      const t = Math.random();
      const y = antennaBase + t * antennaHeight;

      // 天线越往上越细
      const radius = 0.15 - t * 0.12;
      const angle = Math.random() * Math.PI * 2;

      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.03;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.03;

      temp.push(x, y, z);
    }

    // 6. 天线顶部能量球
    const topY = antennaBase + antennaHeight;
    for (let i = 0; i < count * 0.04; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 0.25 + Math.random() * 0.1;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = topY + r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      temp.push(x, y, z);
    }

    // 7. 斜向支撑结构 (X形交叉支撑)
    for (let level = 0; level < 3; level++) {
      const t1 = level * 0.25;
      const t2 = (level + 1) * 0.25;

      for (let cross = 0; cross < 4; cross++) {
        const angle1 = (cross / 4) * Math.PI * 2 + Math.PI / 4;
        const angle2 = ((cross + 1) / 4) * Math.PI * 2 + Math.PI / 4;

        for (let i = 0; i < count * 0.01; i++) {
          const lerp = Math.random();
          const t = t1 + lerp * (t2 - t1);
          const y = baseY + t * towerHeight * 0.7;

          const radius = 2.0 - t * 1.7;
          const angle = angle1 + lerp * (angle2 - angle1);

          const x = Math.cos(angle) * radius * 0.95;
          const z = Math.sin(angle) * radius * 0.95;

          temp.push(x, y, z);
        }
      }
    }

    // 8. 悬浮能量粒子 (围绕塔身的浮动粒子)
    for (let i = 0; i < count * 0.1; i++) {
      const y = baseY + Math.random() * towerHeight;
      const distance = 2.5 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;

      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;

      temp.push(x, y, z);
    }

    // 9. 底座结构 (宽大的六边形底座)
    for (let i = 0; i < count * 0.06; i++) {
      const angle = (Math.floor(Math.random() * 6) / 6) * Math.PI * 2;
      const nextAngle = ((Math.floor(Math.random() * 6) + 1) / 6) * Math.PI * 2;
      const lerp = Math.random();
      const finalAngle = angle + lerp * (nextAngle - angle);

      const radius = 2.2 + Math.random() * 0.3;
      const x = Math.cos(finalAngle) * radius;
      const z = Math.sin(finalAngle) * radius;
      const y = baseY + (Math.random() - 0.5) * 0.2;

      temp.push(x, y, z);
    }

    return new Float32Array(temp);
    /* eslint-enable react-hooks/purity */
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    // Technical rotation
    mesh.current.rotation.y -= 0.002;
  });

  return (
    <points
      ref={mesh}
      geometry={new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(_particles, 3)
      )}
    >
      <pointsMaterial
        size={0.04}
        color={isDark ? "#FFD000" : "#111111"} // Yellow in dark, #111 in light
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
};

const HoloField = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ref}>
      {/* 外层扫描场 - 锥形配合电塔形状 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.5, 3.5, 10, 6, 1, true]} />
        <meshBasicMaterial
          color={isDark ? "#00F0FF" : "#008fa6"}
          wireframe
          opacity={0.04}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* 内层能量场 */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 3, 8, 1, true]} />
        <meshBasicMaterial
          color="#FFD000"
          wireframe
          opacity={0.03}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default function InteractiveModel() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix: Use useEffect properly to avoid cascading renders
  useEffect(() => {
    // Schedule the state update for the next render cycle
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Calculate effective theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return <div className="h-full w-full" />;

  return (
    <div className="group relative h-full w-full cursor-crosshair">
      <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
        <PerspectiveCamera makeDefault position={[6, -2.5, 8]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
          autoRotate
          autoRotateSpeed={1.2}
        />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ArchitectureModel isDark={isDark} />
          <HoloField isDark={isDark} />
        </Float>

        {/* Dramatic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1}
          color={isDark ? "#00F0FF" : "#00aecb"}
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FFD000" />
      </Canvas>

      {/* HUD Overlays (HTML Layer) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-[#FFD000]/50" />
        <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-[#FFD000]/50" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#FFD000]/50" />
        <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#FFD000]/50" />

        {/* Center Focus Ring */}
        <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] rounded-full border border-[#00aecb]/10 dark:border-[#00F0FF]/10" />
      </div>
    </div>
  );
}
