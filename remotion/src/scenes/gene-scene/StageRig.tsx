import React, { useMemo } from "react";
import { PerspectiveCamera } from "three";
import { useThree } from "@react-three/fiber";
import { CAM, PALETTE } from "./rig";

const FOV = 46;

type StageKey = "stage0" | "stage1" | "stage2";

const CameraSet: React.FC<{
  pos: readonly [number, number, number];
  look: readonly [number, number, number];
}> = ({ pos, look }) => {
  const camera = useThree((s) => s.camera);
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(look[0], look[1], look[2]);
  if (camera instanceof PerspectiveCamera && camera.fov !== FOV) {
    camera.fov = FOV;
    camera.updateProjectionMatrix();
  }
  return null;
};

// Background star field — spec section 5.10. Deterministic LCG so every frame
// renders the identical point cloud.
const Particles: React.FC = () => {
  const positions = useMemo(() => {
    const count = 1800;
    const arr = new Float32Array(count * 3);
    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 44;
      arr[i * 3 + 1] = (rand() - 0.5) * 30;
      arr[i * 3 + 2] = (rand() - 0.5) * 30;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={PALETTE.particles}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * Common 3D scaffolding for every gene sub-scene: fog, fixed camera, lighting,
 * and the background star field. Wrap your stage geometry in this.
 */
export const StageRig: React.FC<{
  camera: StageKey;
  time: number;
  children: React.ReactNode;
}> = ({ camera, time, children }) => {
  const cam = CAM[camera];
  // Accent point light orbits the stage (spec section 5.8).
  const accentAngle = time * 0.5;
  return (
    <>
      <fogExp2 attach="fog" args={[PALETTE.bg, 0.038]} />
      <CameraSet pos={cam.pos} look={cam.look} />

      {/* Calm, mostly-neutral lighting tuned for the committee's muted palette. */}
      <ambientLight color="#26344a" intensity={2.3} />
      <directionalLight color="#9fb2c8" intensity={1.7} position={[3, 4, 5]} />
      <pointLight
        color="#42597e"
        intensity={1.1}
        distance={22}
        position={[-4, 2, 3]}
      />
      <pointLight
        color={PALETTE.accent}
        intensity={1.6}
        distance={8}
        position={[Math.cos(accentAngle) * 3, 2, Math.sin(accentAngle) * 3]}
      />
      <directionalLight
        color="#1a2b45"
        intensity={0.7}
        position={[-2, -2, -3]}
      />

      <Particles />
      {children}
    </>
  );
};
