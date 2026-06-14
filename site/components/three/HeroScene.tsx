"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PRIMARY = "#1F3D34";
const PRIMARY_TINT = "#C6F59D";
const LEAF = "#A8D86E";
const ACCENT = "#FC6904";
const CREAM = "#F5F2DF";

function ParallaxGroup() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.35;
    const targetX = -pointer.y * 0.2;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 2, 1);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2, 1);
  });

  return (
    <group ref={group}>
      {/* Big organic blob — represents the "comunidade" energy */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh position={[-1.6, 0.4, -1]} scale={1.9}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color={PRIMARY_TINT}
            distort={0.35}
            speed={1.4}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      </Float>

      {/* Plate — represents a safe meal */}
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[1.7, -0.6, 0.4]} rotation={[1.15, 0, 0.1]}>
          <mesh>
            <cylinderGeometry args={[1.35, 1.35, 0.14, 64]} />
            <meshStandardMaterial color={CREAM} roughness={0.5} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 64]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          {/* "food" — little leaf-colored mounds */}
          <mesh position={[0.2, 0.22, 0.1]}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial color={LEAF} roughness={0.6} />
          </mesh>
          <mesh position={[-0.35, 0.2, -0.15]}>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial color={ACCENT} roughness={0.55} />
          </mesh>
          <mesh position={[-0.1, 0.18, 0.35]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color={PRIMARY} roughness={0.6} />
          </mesh>
        </group>
      </Float>

      {/* Map pin — represents finding restaurants */}
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
        <group position={[0.5, 1.7, 1.2]} scale={0.55}>
          <mesh position={[0, 0.55, 0]}>
            <sphereGeometry args={[0.62, 32, 32]} />
            <meshStandardMaterial color={ACCENT} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.62, 0.95, 32]} />
            <meshStandardMaterial color={ACCENT} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.55, 0.25]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={CREAM} roughness={0.5} />
          </mesh>
        </group>
      </Float>

      {/* Verified seal card — represents trust/certification */}
      <Float speed={1.3} rotationIntensity={0.45} floatIntensity={1}>
        <group position={[-0.4, -1.7, 0.8]} rotation={[0.2, 0.4, -0.15]} scale={0.85}>
          <RoundedBox args={[1.6, 1.05, 0.12]} radius={0.16} smoothness={6}>
            <meshStandardMaterial color={PRIMARY} roughness={0.4} />
          </RoundedBox>
          <mesh position={[-0.5, 0.18, 0.1]}>
            <torusGeometry args={[0.2, 0.06, 16, 32]} />
            <meshStandardMaterial color={PRIMARY_TINT} roughness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* small floating leaves */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2.4, 1.3, -0.6]} scale={0.32}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={LEAF} roughness={0.5} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2.2}>
        <mesh position={[-2.6, -0.8, -0.4]} scale={0.24}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={ACCENT} roughness={0.5} />
        </mesh>
      </Float>

      <Sparkles count={40} scale={6} size={2.5} speed={0.3} color={PRIMARY_TINT} opacity={0.6} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, -4]} intensity={0.35} color={PRIMARY_TINT} />
      <ParallaxGroup />
    </Canvas>
  );
}
