import React, { useMemo } from "react";
import { CatmullRomCurve3, Quaternion, Vector3 } from "three";
import { HELIX_PAIRS, PALETTE, VARIANT_IDX } from "./rig";

// Spec section 5.6: 3.5 turns over 5.5 units, radius 0.55.
const TURNS = 3.5;
const HEIGHT = 5.5;
const RADIUS = 0.55;
const Y_AXIS = new Vector3(0, 1, 0);

const helixPoint = (u: number, phase: number): Vector3 => {
  const theta = u * Math.PI * 2 * TURNS + phase;
  return new Vector3(
    Math.sin(theta) * RADIUS,
    u * HEIGHT - HEIGHT / 2,
    Math.cos(theta) * RADIUS,
  );
};

/**
 * Stage 1 — a slowly rotating DNA double helix (spec section 5.6). 32 base
 * pairs; the variant pair (index 16) is enlarged and lit gold.
 */
export const Helix: React.FC<{
  visible: boolean;
  scale: number;
  time: number;
}> = ({ visible, scale, time }) => {
  const { curveA, curveB, pairs } = useMemo(() => {
    const samples = 120;
    const ptsA: Vector3[] = [];
    const ptsB: Vector3[] = [];
    for (let i = 0; i <= samples; i++) {
      ptsA.push(helixPoint(i / samples, 0));
      ptsB.push(helixPoint(i / samples, Math.PI));
    }
    const pairs = [];
    for (let i = 0; i < HELIX_PAIRS; i++) {
      const u = i / (HELIX_PAIRS - 1);
      const a = helixPoint(u, 0);
      const b = helixPoint(u, Math.PI);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dir = b.clone().sub(a).normalize();
      const quat = new Quaternion().setFromUnitVectors(Y_AXIS, dir);
      pairs.push({
        a,
        b,
        mid,
        quat,
        len: a.distanceTo(b),
        isVariant: i === VARIANT_IDX,
      });
    }
    return {
      curveA: new CatmullRomCurve3(ptsA),
      curveB: new CatmullRomCurve3(ptsB),
      pairs,
    };
  }, []);

  const variantPulse = (Math.sin(time * 3) + 1) / 2;

  return (
    <group visible={visible} scale={scale} rotation-y={time * 0.32}>
      {/* backbones */}
      <mesh>
        <tubeGeometry args={[curveA, 200, 0.032, 8, false]} />
        <meshStandardMaterial
          color={PALETTE.structure}
          emissive={PALETTE.structure}
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curveB, 200, 0.032, 8, false]} />
        <meshStandardMaterial
          color={PALETTE.benign}
          emissive={PALETTE.benign}
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* nucleotide pairs + rungs */}
      {pairs.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[p.isVariant ? 0.1 : 0.07, 20, 20]} />
            <meshStandardMaterial
              color={p.isVariant ? PALETTE.accent : PALETTE.structure}
              emissive={p.isVariant ? PALETTE.accent : PALETTE.structure}
              emissiveIntensity={
                p.isVariant ? 1.0 + variantPulse * 0.8 : 0.22
              }
              roughness={0.35}
            />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[p.isVariant ? 0.1 : 0.07, 20, 20]} />
            <meshStandardMaterial
              color={p.isVariant ? PALETTE.accent : PALETTE.benign}
              emissive={p.isVariant ? PALETTE.accent : PALETTE.benign}
              emissiveIntensity={
                p.isVariant ? 1.0 + variantPulse * 0.8 : 0.22
              }
              roughness={0.35}
            />
          </mesh>
          <mesh position={p.mid} quaternion={p.quat}>
            <cylinderGeometry args={[0.017, 0.017, p.len, 8]} />
            <meshStandardMaterial
              color={p.isVariant ? PALETTE.accent : PALETTE.dim}
              emissive={p.isVariant ? PALETTE.accent : "#000000"}
              emissiveIntensity={p.isVariant ? 0.7 : 0}
              roughness={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
