"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

function DataGalaxy() {
  const ref = useRef<any>(null);
  
  // Generate random points in a sphere to represent a high-dimensional latent space
  const sphere = random.inSphere(new Float32Array(5000), { radius: 2 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f5ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for that glowing effect
        />
      </Points>
    </group>
  );
}

export default function LatentSpaceApp() {
  return (
    <div className="relative h-full w-full bg-black">
      {/* Info Overlay */}
      <div className="absolute top-4 left-4 z-10 rounded-lg border border-[var(--border)] bg-black/60 p-4 backdrop-blur-md">
        <h3 className="font-[var(--font-heading)] text-sm font-bold text-white mb-1">Vector Embeddings</h3>
        <p className="text-xs text-[var(--text-secondary)] mb-2">Simulated representation of model latent space.</p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[10px] text-[var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            DIMENSIONS: 768
          </div>
          <div className="flex items-center gap-1 text-[10px] text-purple-400">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            VECTORS: 1,666
          </div>
        </div>
        <p className="mt-3 text-[10px] text-[var(--text-muted)]">Left click to rotate. Scroll to zoom.</p>
      </div>

      <Canvas camera={{ position: [0, 0, 3] }}>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <DataGalaxy />
      </Canvas>
    </div>
  );
}
