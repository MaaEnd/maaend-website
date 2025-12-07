"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  Mesh,
  NormalBlending,
  Points,
  ShaderMaterial,
} from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useTheme } from "next-themes";

const FragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    
    // Creating a flow effect
    float noise = snoise(uv * 3.0 + uTime * 0.2);
    
    // Mouse interaction ripple
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 2.0) * exp(-dist * 3.0);
    
    // Combine noise and ripple
    float pattern = noise + ripple * 0.5;
    
    // Mix colors based on pattern
    vec3 finalColor = mix(uColor1, uColor2, pattern * 0.5 + 0.5);
    
    // Add a vignette-like fade
    float alpha = 1.0 - smoothstep(0.0, 1.5, distance(uv, vec2(0.5)));
    
    gl_FragColor = vec4(finalColor, alpha * 0.15); // Subtle background opacity
}
`;

const VertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const WaveMesh = () => {
  const mesh = useRef<Mesh<never, ShaderMaterial>>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: [0.5, 0.5] },
      uColor1: { value: new Color("#FFD000") }, // Industrial Yellow
      uColor2: { value: new Color("#00F0FF") }, // Tech Cyan
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current && mesh.current.material) {
      const material = mesh.current.material;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Update colors based on theme
      const targetColor1 = isDark ? new Color("#FFD000") : new Color("#FFD000"); // Keep yellow
      const targetColor2 = isDark ? new Color("#00F0FF") : new Color("#008fa6"); // Darker cyan for light mode

      material.uniforms.uColor1.value.lerp(targetColor1, 0.05);
      material.uniforms.uColor2.value.lerp(targetColor2, 0.05);

      // Smooth mouse movement
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;

      material.uniforms.uMouse.value[0] +=
        (targetX - material.uniforms.uMouse.value[0]) * 0.1;
      material.uniforms.uMouse.value[1] +=
        (targetY - material.uniforms.uMouse.value[1]) * 0.1;
    }
  });

  if (!mounted) return null;

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        fragmentShader={FragmentShader}
        vertexShader={VertexShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const Particles = () => {
  const count = 100;
  const mesh = useRef<Points>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix: Use useEffect properly to avoid cascading renders
  useEffect(() => {
    // Schedule the state update for the next render cycle
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const particles = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    // Math.random() is safe here as it's memoized and only runs once on mount
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      const speed = Math.random() * 0.02 + 0.005;
      const size = Math.random() * 0.05 + 0.01;
      temp.push({ x, y, z, speed, size, originalY: y });
    }
    return temp;
    /* eslint-enable react-hooks/purity */
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [particles]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position.array;

    particles.forEach((p, i) => {
      // Float upwards
      p.y += p.speed;

      // Reset if too high
      if (p.y > 5) {
        p.y = -5;
        p.x = (Math.random() - 0.5) * 10;
      }

      // Subtle horizontal drift
      p.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!mounted) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? "#00F0FF" : "#008fa6"}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={isDark ? AdditiveBlending : NormalBlending}
      />
    </points>
  );
};

export default function ShaderBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <WaveMesh />
        <Particles />
      </Canvas>
    </div>
  );
}
