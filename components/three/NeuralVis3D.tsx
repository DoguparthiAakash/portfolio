"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Instances, Instance, Line } from "@react-three/drei";
import * as THREE from "three";

function NodeLayer({ position, size, count, color }: { position: [number, number, number], size: number, count: [number, number], color: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const instances = useMemo(() => {
    const arr = [];
    const [rows, cols] = count;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        arr.push({
          x: (i - rows / 2) * size,
          y: (j - cols / 2) * size,
          z: 0
        });
      }
    }
    return arr;
  }, [count, size]);

  return (
    <group position={position}>
      <Instances ref={ref} range={instances.length} limit={instances.length}>
        <boxGeometry args={[size * 0.8, size * 0.8, size * 0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
        {instances.map((pos, i) => (
          <Instance key={i} position={[pos.x, pos.y, pos.z]} />
        ))}
      </Instances>
    </group>
  );
}

function Connections() {
  const points1 = useMemo(() => [new THREE.Vector3(0, 0, -4), new THREE.Vector3(0, 0, 0)], []);
  const points2 = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 4)], []);

  return (
    <group>
      <Line points={points1} color="#3B82F6" opacity={0.3} transparent lineWidth={1} />
      <Line points={points2} color="#10B981" opacity={0.3} transparent lineWidth={1} />
    </group>
  );
}

export default function NeuralVis3D() {
  return (
    <section className="relative w-full h-[600px] bg-black/20 border-y border-white/5 overflow-hidden">
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h2 className="text-2xl font-bold text-white mb-2">Interactive CNN Architecture</h2>
        <p className="text-gray-400 text-sm max-w-sm">
          A real-time 3D visualization of a Convolutional Neural Network forward pass. Orbit to explore the latent dimensional structures.
        </p>
      </div>
      
      <Canvas camera={{ position: [6, 4, 8], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        
        <group position={[0, 0, 0]}>
          {/* Input Layer */}
          <NodeLayer position={[0, 0, -4]} size={0.3} count={[8, 8]} color="#3B82F6" />
          
          {/* Hidden Layer (Convolution) */}
          <NodeLayer position={[0, 0, 0]} size={0.5} count={[4, 4]} color="#8B5CF6" />
          
          {/* Output Layer */}
          <NodeLayer position={[0, 0, 4]} size={0.8} count={[1, 2]} color="#10B981" />
          
          {/* Connecting Lines */}
          <Connections />
        </group>
        
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </section>
  );
}
