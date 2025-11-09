"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Represents a single rotating ring segment.
 */
const Ring = ({
  color,
  rotationSpeed,
  initialRotation = 0,
}: {
  color: string;
  rotationSpeed: number;
  initialRotation?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  // This hook runs on every frame
  useFrame((state, delta) => {
    if (ref.current) {
      // Animate the rotation
      ref.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation-x={Math.PI / 2} // Rotate to be flat like a ring
      rotation-y={initialRotation}
    >
      {/* TorusGeometry args: 
        1. radius: Radius of the torus
        2. tube: Radius of the tube
        3. radialSegments: Segments around the ring
        4. tubularSegments: Segments of the tube
        5. arc: The length of the arc (Math.PI * 1.5 is a 3/4 circle)
      */}
      <torusGeometry args={[2.5, 0.07, 16, 100, Math.PI * 1.5]} />
      <meshStandardMaterial
        color={color}
        emissive={color} // Make it glow
        emissiveIntensity={2}
        toneMapped={false} // Ensure glow is visible
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * The main scene for the orbital loader.
 */
const LoaderScene = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Animate the entire group to give it a "presentation" spin
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <>
      {/* Simple lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Star field background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />

      <group ref={groupRef} dispose={null}>
        {/* === Central Glowing Core === */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#f0f" // Fuchsia color
            emissive="#f0f"
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>

        {/* === Orbital Ring 1 (Cyan) === */}
        <Ring color="#0ff" rotationSpeed={0.5} initialRotation={Math.PI / 4} />

        {/* === Orbital Ring 2 (Fuchsia) === */}
        <Ring
          color="#f0f"
          rotationSpeed={-0.3}
          initialRotation={-Math.PI / 3}
        />

        {/* === Outer Static Ring (Subtle) === */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[3.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
    </>
  );
};

/**
 * The main Loader component that wraps the R3F Canvas.
 * This is what you will import into your page.
 */
const OrbitalLoader: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e]">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        {/* Use React Suspense to show a fallback while the 3D models load.
          For this simple scene, it will be instant, but it's good practice.
        */}
        <React.Suspense fallback={null}>
          <LoaderScene />
        </React.Suspense>
      </Canvas>
      {/* You can add a "Loading Portfolio..." text here if you want */}
      <p className="absolute bottom-1/4 text-lg tracking-widest text-cyan-400/50 animate-pulse">
        LOADING...
      </p>
    </div>
  );
};

export default OrbitalLoader;
