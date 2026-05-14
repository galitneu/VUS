import React, { useMemo } from "react";
import { PerspectiveCamera } from "three";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  getCameraTarget,
  getStageState,
  getStageVisibility,
  PALETTE,
} from "./rig";
import { Chromosome } from "./Chromosome";
import { Helix } from "./Helix";
import { BasePair } from "./BasePair";

const FOV = 46;

const CameraRig: React.FC<{
  pos: [number, number, number];
  look: [number, number, number];
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

/** The r3f scene graph: camera, lights, particles, and the three stages. */
export const Scene3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const timeSec = frame / fps;
  const totalSec = durationInFrames / fps;

  const state = getStageState(timeSec, totalSec);
  const cam = getCameraTarget(state);
  const vis = getStageVisibility(state);

  // Accent light orbits the chromosome during stage 0 (spec section 5.8).
  const accentAngle = timeSec * 0.5;

  return (
    <>
      <fogExp2 attach="fog" args={[PALETTE.bg, 0.038]} />
      <CameraRig pos={cam.pos} look={cam.look} />

      {/* Calm, mostly-neutral lighting — the committee palette is muted, so
          the spec's saturated blue lights are toned down here. */}
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
      <Chromosome
        visible={vis.chromVisible}
        scale={vis.chromScale}
        time={timeSec}
      />
      <Helix
        visible={vis.helixVisible}
        scale={vis.helixScale}
        time={timeSec}
      />
      <BasePair
        visible={vis.bpVisible}
        scale={vis.bpScale}
        time={timeSec}
      />
    </>
  );
};
