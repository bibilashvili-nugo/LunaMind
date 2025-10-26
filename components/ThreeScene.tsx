"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import * as THREE from "three";

interface ScrollBoxProps {
  image: string;
}

function ScrollBox({ image }: ScrollBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // TS-safe ref OrbitControls-ისთვის
  const controlsRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const texture = useMemo(() => new THREE.TextureLoader().load(image), [image]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isUserInteracting) setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUserInteracting]);

  const handleStart = useCallback(() => setIsUserInteracting(true), []);
  const handleEnd = useCallback(() => {
    setIsUserInteracting(false);
    if (meshRef.current) setScrollY(meshRef.current.rotation.y * 500);
  }, []);

  useFrame(() => {
    if (meshRef.current && !isUserInteracting) {
      meshRef.current.rotation.y = scrollY / 500;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, -1, 0]}>
        <boxGeometry args={[12, 12, 12]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </>
  );
}

interface ThreeSceneProps {
  image: string;
}

export const ThreeScene = ({ image }: ThreeSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ScrollBox image={image} />
    </Canvas>
  );
};
