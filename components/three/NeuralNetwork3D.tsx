"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function NeuralNode({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.15;
    }
    if (glowRef.current) {
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * speed * 0.8 + offset) * 0.4;
      glowRef.current.scale.setScalar(pulse * scale * 2.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.15;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Core sphere */}
        <Sphere ref={meshRef} args={[0.06 * scale, 16, 16]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </Sphere>
        {/* Glow */}
        <Sphere ref={glowRef} args={[0.15 * scale, 16, 16]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function NeuralConnections({
  nodes,
  connections,
}: {
  nodes: [number, number, number][];
  connections: [number, number][];
}) {
  const linesRef = useRef<(THREE.Line | null)[]>([]);

  useFrame((state) => {
    linesRef.current.forEach((line, i) => {
      if (line) {
        const mat = line.material as THREE.LineBasicMaterial;
        const pulse =
          0.05 + Math.sin(state.clock.elapsedTime * 0.8 + i * 0.5) * 0.05;
        mat.opacity = pulse;
      }
    });
  });

  return (
    <>
      {connections.map(([from, to], i) => (
        <Line
          key={i}
          ref={(ref) => {
            if (linesRef.current) linesRef.current[i] = ref as unknown as THREE.Line;
          }}
          points={[nodes[from], nodes[to]]}
          color="#00F5FF"
          lineWidth={0.5}
          transparent
          opacity={0.08}
        />
      ))}
    </>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      lightRef.current.position.set(x, y, 3);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#00F5FF"
      intensity={2}
      distance={8}
      decay={2}
    />
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate neural network nodes
  const { nodes, connections, colors } = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const conns: [number, number][] = [];
    const nodeColors: string[] = [];
    const palette = ["#00F5FF", "#7C4DFF", "#00FF99", "#00F5FF", "#7C4DFF"];

    // Create layers of nodes
    const layers = [
      { count: 5, x: -2.5 },
      { count: 7, x: -1.2 },
      { count: 8, x: 0 },
      { count: 7, x: 1.2 },
      { count: 5, x: 2.5 },
    ];

    let nodeIndex = 0;
    const layerStartIndices: number[] = [];

    layers.forEach((layer) => {
      layerStartIndices.push(nodeIndex);
      for (let i = 0; i < layer.count; i++) {
        const spread = layer.count * 0.35;
        const y = (i - (layer.count - 1) / 2) * 0.5;
        const z = (Math.random() - 0.5) * 1.5;
        nodePositions.push([
          layer.x + (Math.random() - 0.5) * 0.3,
          y + (Math.random() - 0.5) * 0.15,
          z,
        ]);
        nodeColors.push(palette[Math.floor(Math.random() * palette.length)]);
        nodeIndex++;
      }
    });

    // Connect adjacent layers
    for (let l = 0; l < layers.length - 1; l++) {
      const start1 = layerStartIndices[l];
      const start2 = layerStartIndices[l + 1];
      const count1 = layers[l].count;
      const count2 = layers[l + 1].count;

      for (let i = 0; i < count1; i++) {
        // Connect to 2-3 random nodes in the next layer
        const numConnections = 2 + Math.floor(Math.random() * 2);
        const targetIndices = new Set<number>();
        while (targetIndices.size < numConnections) {
          targetIndices.add(start2 + Math.floor(Math.random() * count2));
        }
        targetIndices.forEach((target) => {
          conns.push([start1 + i, target]);
        });
      }
    }

    return { nodes: nodePositions, connections: conns, colors: nodeColors };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <NeuralConnections nodes={nodes} connections={connections} />
      {nodes.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos}
          color={colors[i]}
          scale={0.8 + Math.random() * 0.5}
        />
      ))}
    </group>
  );
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#7C4DFF" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#00F5FF" />
        <MouseLight />
        <Scene />
      </Canvas>
    </div>
  );
}
