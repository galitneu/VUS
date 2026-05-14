import React, { useMemo } from "react";
import { BackSide, DoubleSide } from "three";
import { GENE_Y, PALETTE } from "./rig";

// Banding rings — 3 on the p-arm, 3 on the q-arm (spec section 5.5).
const BANDS = [1.18, 0.74, 0.34, -0.55, -1.05, -1.6];

/**
 * Stage 0 — a slowly rotating 3D chromosome (spec section 5.5). A gold torus
 * marks the gene position; two back-faced halo rings give it a soft glow.
 */
export const Chromosome: React.FC<{
  visible: boolean;
  scale: number;
  time: number;
}> = ({ visible, scale, time }) => {
  const pulse = (Math.sin(time * 2.2) + 1) / 2;
  const ringEmissive = 1.25 + pulse * 0.55;
  const haloOpacity = 0.16 + pulse * 0.14;

  const bands = useMemo(() => BANDS, []);

  return (
    <group visible={visible} scale={scale} rotation-y={time * 0.18}>
      {/* p-arm */}
      <mesh position={[0, 0.84, 0]}>
        <capsuleGeometry args={[0.22, 1.2, 8, 24]} />
        <meshStandardMaterial
          color={PALETTE.structure}
          roughness={0.72}
          metalness={0}
        />
      </mesh>
      {/* q-arm */}
      <mesh position={[0, -1.12, 0]}>
        <capsuleGeometry args={[0.22, 1.8, 8, 24]} />
        <meshStandardMaterial
          color={PALETTE.structure}
          roughness={0.72}
          metalness={0}
        />
      </mesh>
      {/* centromere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.135, 24, 24]} />
        <meshStandardMaterial color={PALETTE.dim} roughness={0.6} />
      </mesh>
      {/* banding */}
      {bands.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.065, 24, 1, true]} />
          <meshStandardMaterial
            color={PALETTE.dim}
            roughness={0.75}
            side={DoubleSide}
          />
        </mesh>
      ))}
      {/* gene ring */}
      <mesh position={[0, GENE_Y, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.3, 0.042, 18, 64]} />
        <meshStandardMaterial
          color={PALETTE.accent}
          emissive={PALETTE.accent}
          emissiveIntensity={ringEmissive}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {/* halo rings */}
      {[0.38, 0.55].map((r, i) => (
        <mesh
          key={i}
          position={[0, GENE_Y, 0]}
          rotation-x={Math.PI / 2}
        >
          <torusGeometry args={[r, 0.055, 12, 48]} />
          <meshBasicMaterial
            color={PALETTE.accent}
            transparent
            opacity={haloOpacity * (i === 0 ? 1 : 0.55)}
            side={BackSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};
