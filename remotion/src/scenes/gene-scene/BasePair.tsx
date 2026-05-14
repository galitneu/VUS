import React from "react";
import { PALETTE } from "./rig";

// Dimmed context boxes flanking the variant — spec section 5.7.
const CONTEXT_X = [-1.8, -1.2, -0.6, 0.6, 1.2, 1.8];

/**
 * Stage 2 — base-pair close-up (spec section 5.7). The original base sits in a
 * violet box, the variant base in a gold box, with an arrow between them.
 */
export const BasePair: React.FC<{
  visible: boolean;
  scale: number;
  time: number;
}> = ({ visible, scale, time }) => {
  const pulse = (Math.sin(time * 3) + 1) / 2;

  return (
    <group visible={visible} scale={scale}>
      {CONTEXT_X.map((x, i) => (
        <mesh key={i} position={[x, 0.36, 0]}>
          <boxGeometry args={[0.44, 0.44, 0.12]} />
          <meshStandardMaterial
            color={PALETTE.dim}
            roughness={0.75}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
      {/* original base box */}
      <mesh position={[-0.35, 0.36, 0.02]}>
        <boxGeometry args={[0.58, 0.58, 0.16]} />
        <meshPhysicalMaterial
          color={PALETTE.pathogenic}
          emissive={PALETTE.pathogenic}
          emissiveIntensity={0.85}
          roughness={0.35}
          clearcoat={0.4}
        />
      </mesh>
      {/* variant base box */}
      <mesh position={[0.35, 0.36, 0.02]}>
        <boxGeometry args={[0.58, 0.58, 0.16]} />
        <meshPhysicalMaterial
          color={PALETTE.accent}
          emissive={PALETTE.accent}
          emissiveIntensity={0.8 + pulse * 0.5}
          roughness={0.35}
          clearcoat={0.4}
        />
      </mesh>
      {/* arrow shaft */}
      <mesh position={[0, 0.36, 0.04]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, 0.32, 8]} />
        <meshStandardMaterial
          color={PALETTE.text}
          emissive={PALETTE.text}
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* arrow head */}
      <mesh position={[0.18, 0.36, 0.04]} rotation-z={-Math.PI / 2}>
        <coneGeometry args={[0.05, 0.1, 12]} />
        <meshStandardMaterial
          color={PALETTE.text}
          emissive={PALETTE.text}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
};
