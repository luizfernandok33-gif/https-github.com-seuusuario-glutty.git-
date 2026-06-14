"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const PRIMARY = "#1F3D34";
const PRIMARY_TINT = "#C6F59D";
const LEAF = "#A8D86E";
const ACCENT = "#FC6904";
const CREAM = "#F5F2DF";

function Seal({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetScale = active ? 1 : 0.74;
    const current = group.current.scale.x;
    const next = current + (targetScale - current) * Math.min(delta * 3, 1);
    group.current.scale.setScalar(next);

    group.current.rotation.y += delta * (active ? 0.5 : 0.12);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;

    if (ring.current) {
      const ringMat = ring.current.material as THREE.MeshStandardMaterial;
      const targetEmissive = active ? 0.9 : 0.15;
      ringMat.emissiveIntensity += (targetEmissive - ringMat.emissiveIntensity) * Math.min(delta * 3, 1);
    }

    if (glow.current) {
      const targetIntensity = active ? 2.4 : 0.3;
      glow.current.intensity += (targetIntensity - glow.current.intensity) * Math.min(delta * 3, 1);
    }
  });

  return (
    <group ref={group} scale={0.74}>
      <pointLight ref={glow} position={[0, 0, 1.6]} color={PRIMARY_TINT} intensity={0.3} distance={6} />

      {/* medal ribbon */}
      <mesh position={[-0.35, -1.3, -0.3]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.45, 1.4, 0.1]} />
        <meshStandardMaterial color={ACCENT} roughness={0.5} />
      </mesh>
      <mesh position={[0.35, -1.3, -0.3]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.45, 1.4, 0.1]} />
        <meshStandardMaterial color={PRIMARY} roughness={0.5} />
      </mesh>

      {/* outer ring */}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.1, 32, 64]} />
        <meshStandardMaterial
          color={PRIMARY_TINT}
          emissive={PRIMARY_TINT}
          emissiveIntensity={0.15}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.22, 64]} />
        <meshStandardMaterial color={PRIMARY} roughness={0.35} metalness={0.2} />
      </mesh>

      {/* inner emblem — leaf */}
      <mesh position={[0, 0.13, 0]} rotation={[0, Math.PI / 4, 0]} scale={[0.85, 0.4, 0.55]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={LEAF} roughness={0.4} />
      </mesh>

      {/* checkmark */}
      <group position={[0, 0.24, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[-0.12, -0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.34, 0.09, 0.08]} />
          <meshStandardMaterial color={CREAM} roughness={0.3} />
        </mesh>
        <mesh position={[0.08, 0.06, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.09, 0.08]} />
          <meshStandardMaterial color={CREAM} roughness={0.3} />
        </mesh>
      </group>

      {active && <Sparkles count={50} scale={4} size={2} speed={0.4} color={PRIMARY_TINT} opacity={0.8} />}
    </group>
  );
}

export default function SeloScene({ active }: { active: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.6, 4.2], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color={PRIMARY_TINT} />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <Seal active={active} />
      </Float>
    </Canvas>
  );
}
