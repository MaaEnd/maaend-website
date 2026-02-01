"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useTheme } from "next-themes";

// MaaEnd 主题色常量
const THEME_COLORS = {
  cyan: "#00F0FF",
  cyanDark: "#0891b2",
  yellow: "#FFD000",
  orangeDark: "#ea580c",
} as const;

function RelayModel(): React.JSX.Element {
  const { scene } = useGLTF("/model/Relay.glb", true);
  const modelRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;

      child.material = child.material.clone();
      const material = child.material as THREE.MeshStandardMaterial;

      if (material.transparent) {
        material.depthWrite = true;
        material.alphaTest = 0.1;
      }

      material.side = THREE.DoubleSide;

      const hasEmissive =
        material.emissive &&
        (material.emissive.r > 0 ||
          material.emissive.g > 0 ||
          material.emissive.b > 0);

      if (hasEmissive) {
        material.emissive = new THREE.Color(THEME_COLORS.yellow);
        material.emissiveIntensity = 3;
      }
    });
    return cloned;
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={0.33}
      position={[0, -4, 0]}
    />
  );
}

useGLTF.preload("/model/Relay.glb", true);

function OptimizedHoloField({
  isDark,
}: {
  isDark: boolean;
}): React.JSX.Element {
  const ref = useRef<THREE.Group>(null);

  // 几何体只需创建一次
  const geometries = useMemo(
    () => ({
      outer: new THREE.CylinderGeometry(1.5, 3.5, 10, 6, 1, true),
      inner: new THREE.CylinderGeometry(0.8, 0.8, 3, 8, 1, true),
    }),
    []
  );

  // 材质随主题变化
  const materials = useMemo(
    () => ({
      outer: new THREE.MeshBasicMaterial({
        color: isDark ? THEME_COLORS.cyan : THEME_COLORS.cyanDark,
        wireframe: true,
        opacity: isDark ? 0.04 : 0.15,
        transparent: true,
        side: THREE.DoubleSide,
      }),
      inner: new THREE.MeshBasicMaterial({
        color: isDark ? THEME_COLORS.yellow : THEME_COLORS.orangeDark,
        wireframe: true,
        opacity: isDark ? 0.03 : 0.12,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    }),
    [isDark]
  );

  // 材质清理
  useEffect(() => {
    return () => {
      materials.outer.dispose();
      materials.inner.dispose();
    };
  }, [materials]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.5;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  // 组件卸载时清理几何体
  useEffect(() => {
    return () => {
      geometries.outer.dispose();
      geometries.inner.dispose();
    };
  }, [geometries]);

  return (
    <group ref={ref}>
      <mesh
        position={[0, 0.5, 0]}
        geometry={geometries.outer}
        material={materials.outer}
      />
      <mesh
        position={[0, 2, 0]}
        geometry={geometries.inner}
        material={materials.inner}
      />
    </group>
  );
}

function SceneLighting({ isDark }: { isDark: boolean }): React.JSX.Element {
  const { gl } = useThree();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    gl.toneMappingExposure = isDark ? 1.5 : 1.0;
  }, [isDark, gl]);

  return (
    <>
      <Environment preset="city" />
      <ambientLight
        intensity={isDark ? 0.8 : 1.2}
        color={isDark ? "#ccfbfd" : "#ffffff"}
      />

      {isDark ? (
        <>
          <spotLight
            position={[-5, 5, -5]}
            angle={0.5}
            penumbra={1}
            intensity={20}
            color={THEME_COLORS.cyan}
            distance={20}
          />
          <pointLight
            position={[5, 0, 2]}
            intensity={5}
            color={THEME_COLORS.yellow}
            distance={10}
            decay={2}
          />
          <directionalLight
            position={[0, 10, 0]}
            intensity={1}
            color="#ffffff"
          />
        </>
      ) : (
        <>
          <directionalLight
            position={[5, 10, 7]}
            intensity={2}
            color="#fff"
            castShadow
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={1}
            color="#dbeafe"
          />
        </>
      )}
    </>
  );
}

export default function InteractiveModelOptimized(): React.JSX.Element | null {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  if (!mounted) {
    return <div ref={containerRef} className="h-full w-full" />;
  }

  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="text-sm text-gray-500">Loading 3D Model...</div>
      </div>
    );
  }

  const chromaticOffset = isDark ? 0.002 : 0.0005;

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full cursor-crosshair"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        frameloop="demand"
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[6, 0, 8]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <RelayModel />
          <OptimizedHoloField isDark={isDark} />
        </Float>

        <EffectComposer>
          <Bloom
            luminanceThreshold={1.2}
            mipmapBlur
            intensity={1.2}
            radius={0.7}
          />
          <Noise opacity={isDark ? 0.05 : 0.02} premultiply />
          <ChromaticAberration
            offset={[chromaticOffset, chromaticOffset]}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.0} />
        </EffectComposer>

        <SceneLighting isDark={isDark} />
      </Canvas>

      <HudOverlay />
    </div>
  );
}

function HudOverlay(): React.JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-[#FFD000]/50" />
      <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-[#FFD000]/50" />
      <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#FFD000]/50" />
      <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#FFD000]/50" />
      <div
        className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-[#00aecb]/10 dark:border-[#00F0FF]/10"
        style={{ animationDuration: "60s" }}
      />
    </div>
  );
}
