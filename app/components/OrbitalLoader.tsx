"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  MeshTransmissionMaterial,
  Html,
  Float,
  Sphere,
  Line,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/* ---------------------------------------------------
   SMALL ORBITING PARTICLES
--------------------------------------------------- */
const OrbitParticles = () => {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              emissive="#00eaff"
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/* ---------------------------------------------------
   ENERGY WAVE PULSE
--------------------------------------------------- */
const EnergyPulse = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() % 1.5;
    const scale = THREE.MathUtils.mapLinear(t, 0, 1.5, 1, 4);

    ref.current.scale.set(scale, scale, scale);
    ref.current.material.opacity = 1 - t / 1.5;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[1, 1.2, 64]} />
      <meshBasicMaterial
        color="#00eaff"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ---------------------------------------------------
   RING COMPONENT
--------------------------------------------------- */
const Ring = ({ color, speed, radius }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={ref} rotation-x={Math.PI / 2}>
      <torusGeometry args={[radius, 0.06, 32, 200]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        metalness={0.6}
        roughness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
};

/* ---------------------------------------------------
   MAIN SCENE
--------------------------------------------------- */
const LoaderScene = () => {
  const group = useRef<THREE.Group>(null!);
  const cameraTilt = useRef(0);

  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();

    // Floating camera motion
    camera.position.x = Math.sin(t * 0.3) * 0.4;
    camera.position.y = Math.cos(t * 0.4) * 0.3;
    camera.lookAt(0, 0, 0);

    // Group float/rotation
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight intensity={2} position={[0, 0, 4]} color="#00eaff" />

      {/* Starfield */}
      <Stars radius={180} depth={70} count={10000} fade factor={4} />

      <group ref={group}>
        {/* CORE */}
        <Float floatIntensity={0.7} speed={2}>
          <Sphere args={[0.7, 64, 64]}>
            <MeshTransmissionMaterial
              thickness={1}
              roughness={0}
              transmission={1}
              emissive="#00eaff"
              emissiveIntensity={3}
              iridescence={0.6}
              chromaticAberration={0.01}
            />
          </Sphere>
        </Float>

        {/* Orbiting nano particles */}
        <OrbitParticles />

        {/* Energy pulse wave */}
        <EnergyPulse />

        {/* Rings */}
        <Ring color="#00eaff" speed={0.4} radius={2.3} />
        <Ring color="#ff00f7" speed={-0.25} radius={3} />
        <Ring color="#0077ff" speed={0.15} radius={3.6} />
      </group>

      {/* Post FX */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.2} />
        <Noise opacity={0.06} />
        <Vignette darkness={0.8} offset={0.1} />
      </EffectComposer>
    </>
  );
};

/* ---------------------------------------------------
   UI LAYER
--------------------------------------------------- */
export default function OrbitalLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#03040a]">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <React.Suspense fallback={null}>
          <LoaderScene />
        </React.Suspense>
      </Canvas>

      <p className="absolute bottom-[15%] text-cyan-300/60 tracking-[0.4em] text-sm md:text-xl animate-pulse">
        LOADING PORTFOLIO...
      </p>
    </div>
  );
}
